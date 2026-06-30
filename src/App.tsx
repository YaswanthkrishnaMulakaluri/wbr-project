import React, { useState, useEffect, useRef, useTransition } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import * as XLSX from 'xlsx';
import { Lock } from 'lucide-react';

import { AppConfig, AuthUser, UploadedDataState, SubNotes, UploadedFileInfo } from './types';
import { getDefaultConfig } from './defaultConfig';
import {
  WKS,
  normKey,
  normalizePeriod,
  detectMonthly,
  getWeekDateRange,
  getISOWeek,
  ACCENT_PALETTES,
  COLUMN_ALIASES,
} from './utils';

// Screen imports
import LoginScreen from './components/LoginScreen';
import NavBar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import WBRScreen from './components/WBRScreen';
import AdminScreen from './components/AdminScreen';
import DocsScreen from './components/DocsScreen';

const BACKEND_URL = 'http://localhost:4000';

export default function App() {
  // Authentication session state
  const [user, setUser] = useState<AuthUser | null>(null);

  // Configuration parameter state
  const [config, setConfig] = useState<AppConfig>(() => getDefaultConfig());

  // Unique browser-specific selected/viewing week state (prevents other device tabs from conflicting)
  const [viewingWeek, setViewingWeekState] = useState<number>(() => {
    const saved = sessionStorage.getItem('wbi_viewing_week');
    if (saved) {
      const num = parseInt(saved, 10);
      if (!isNaN(num) && num >= 1 && num <= 52) {
        return num;
      }
    }
    return 22; // Hard default fallback
  });

  const handleSetViewingWeek = (wk: number) => {
    setViewingWeekState(wk);
    sessionStorage.setItem('wbi_viewing_week', String(wk));
  };

  // User uploaded metrics performance matrix data state
  const [userData, setUserData] = useState<UploadedDataState>({});

  // Inferences and Initiatives notes state
  const [notes, setNotes] = useState<SubNotes>({});

  // Loading state while the first DB fetch completes
  const [isInitializing, setIsInitializing] = useState(true);

  // Upload loading overlay
  const [isUploading, setIsUploading] = useState(false);

  // Tab-switch transition (keeps current tab visible while heavy component renders)
  const [isTabSwitching, startTabTransition] = useTransition();

  // Latest uploaded file records per department (from DB)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'home' | 'wbr' | 'admin'>('home');
  const [activeDeptId, setActiveDeptId] = useState<string>('sales');

  // Gated config state
  const [isConfigUnlocked, setIsConfigUnlocked] = useState(false);
  const [pinPopupOpen, setPinPopupOpen] = useState(false);
  const adminPinRef = useRef<HTMLInputElement>(null);
  const [pinError, setPinError] = useState('');
  const [pendingTab, setPendingTab] = useState<'admin' | null>(null);

  // Inactivity timeout locks
  const lastActivityRef = useRef<number>(Date.now());

  // Master initial loaded ref to prevent old client caches from overwriting server files
  const initLoadedRef = useRef<boolean>(false);

  // Time tracking to prevent polling from overwriting active client edits before server sync finishes
  const lastConfigChangeRef = useRef<number>(0);
  const lastUserDataChangeRef = useRef<number>(0);
  const lastNotesChangeRef = useRef<number>(0);
  const syncNotesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Retrieve the stored WBI JWT token for authenticated API calls
  const getWbiToken = (): string | null => sessionStorage.getItem('wbi_jwt');

  // Helper functions to send mutations to the full-stack server
  const syncConfig = async (newCfg: AppConfig) => {
    if (!initLoadedRef.current) {
      console.log("Postponing syncConfig: server load is still in progress.");
      return;
    }
    try {
      const token = getWbiToken();
      await fetch(`${BACKEND_URL}/api/wbi/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newCfg),
      });
    } catch (err) {
      console.error('Failed to sync config to server:', err);
    }
  };

  const syncUserData = async (newUdata: UploadedDataState) => {
    if (!initLoadedRef.current) {
      console.log("Postponing syncUserData: server load is still in progress.");
      return;
    }
    try {
      const token = getWbiToken();
      await fetch(`${BACKEND_URL}/api/wbi/userdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newUdata),
      });
    } catch (err) {
      console.error('Failed to sync userdata to server:', err);
    }
  };

  const syncNotes = (newNotes: SubNotes) => {
    if (!initLoadedRef.current) {
      console.log("Postponing syncNotes: server load is still in progress.");
      return;
    }
    if (syncNotesTimerRef.current) clearTimeout(syncNotesTimerRef.current);
    syncNotesTimerRef.current = setTimeout(async () => {
      try {
        const token = getWbiToken();
        await fetch(`${BACKEND_URL}/api/wbi/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(newNotes),
        });
      } catch (err) {
        console.error('Failed to sync notes to server:', err);
      }
    }, 800);
  };

  const fetchUploadedFiles = async () => {
    try {
      const token = getWbiToken();
      const res = await fetch(`${BACKEND_URL}/api/wbi/uploaded-files`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to fetch uploaded files:', err);
    }
  };

  // Load & Synchronize shared server-side state on boot with real-time polling updates
  useEffect(() => {
    let active = true;
    const initSync = async (isPoll = false) => {
      const token = getWbiToken();
      try {
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${BACKEND_URL}/api/wbi/data`, { headers });
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          if (data.hasData) {
            // Generic self-healing auto-migration for missing departments (e.g. support, hr)
            if (data.config && data.config.departments) {
              const freshDefault = getDefaultConfig();
              let configNeedsUpdate = false;

              freshDefault.departments.forEach((dept: any) => {
                const hasDept = data.config.departments.some((d: any) => d.id === dept.id);
                if (!hasDept) {
                  console.log(`Stale config loaded from server. Initiating self-healing auto-migration for '${dept.id}' department...`);
                  data.config.departments.push(dept);
                  configNeedsUpdate = true;

                  // Add Categories for this dept
                  if (!data.config.categories) data.config.categories = [];
                  freshDefault.categories.forEach(cat => {
                    if (cat.deptId === dept.id && !data.config.categories.some((c: any) => c.id === cat.id)) {
                      data.config.categories.push(cat);
                    }
                  });

                  // Add Subcategories for this dept
                  if (!data.config.subcategories) data.config.subcategories = [];
                  const deptCatIds = freshDefault.categories.filter(c => c.deptId === dept.id).map(c => c.id);
                  freshDefault.subcategories.forEach(sub => {
                    if (deptCatIds.includes(sub.catId) && !data.config.subcategories.some((s: any) => s.id === sub.id)) {
                      data.config.subcategories.push(sub);
                    }
                  });

                  // Add Metrics for this dept
                  if (!data.config.metrics) data.config.metrics = [];
                  const deptSubIds = freshDefault.subcategories.filter(sub => deptCatIds.includes(sub.catId)).map(s => s.id);
                  freshDefault.metrics.forEach(met => {
                    if (deptSubIds.includes(met.subId) && !data.config.metrics.some((m: any) => m.id === met.id)) {
                      data.config.metrics.push(met);
                    }
                  });

                  // Add Leadership notes for this dept
                  if (!data.config.leadershipNotes) data.config.leadershipNotes = {};
                  if (!data.config.leadershipNotes[dept.id] && freshDefault.leadershipNotes[dept.id]) {
                    data.config.leadershipNotes[dept.id] = freshDefault.leadershipNotes[dept.id];
                  }
                }
              });

              if (configNeedsUpdate) {
                // Save migrated config to server
                fetch(`${BACKEND_URL}/api/wbi/config`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(data.config),
                }).catch(e => console.error("Auto-syncing migrated configuration failed:", e));
              }
            }

            // Guard against config polling race conditions if client has a very recent local save
            if (data.config && (Date.now() - lastConfigChangeRef.current > 8000)) {
              const serverConfigStr = JSON.stringify(data.config);
              if (serverConfigStr !== JSON.stringify(config)) {
                setConfig(data.config);
              }
            }
            // Guard against userdata polling race conditions
            if (data.userData && (Date.now() - lastUserDataChangeRef.current > 8000)) {
              const serverUdataStr = JSON.stringify(data.userData);
              if (serverUdataStr !== JSON.stringify(userData)) {
                setUserData(data.userData);
              }
            }
            // Guard against notes polling race conditions
            if (data.notes && (Date.now() - lastNotesChangeRef.current > 8000)) {
              const serverNotesStr = JSON.stringify(data.notes);
              if (serverNotesStr !== JSON.stringify(notes)) {
                setNotes(data.notes);
              }
            }
            // Mark loaded success state so client updates are now permitted to propagate
            initLoadedRef.current = true;
          } else if (!isPoll) {
            console.log('Server has no state. Postponing bootstrap.');
            initLoadedRef.current = true;
          }
        }
      } catch (err) {
        console.error('Error synchronizing with full-stack storage:', err);
      } finally {
        if (!isPoll) {
          setIsInitializing(false);
        }
      }
    };

    initSync(false);
    fetchUploadedFiles();

    // Background sync every 20 seconds to pick up changes from other users.
    // Explicit syncs (syncConfig, syncUserData, syncNotes) handle local mutations immediately.
    const interval = setInterval(() => {
      initSync(true);
    }, 20000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [user]);

  // Restore session on render, handle Microsoft SSO callback, and Week Auto-Update
  useEffect(() => {
    const auth = sessionStorage.getItem('wbi_auth');
    const email = sessionStorage.getItem('wbi_email');
    const role = sessionStorage.getItem('wbi_role');
    const existingJwt = sessionStorage.getItem('wbi_jwt');

    if (auth === '1' && email) {
      setUser({ email, role: role || 'Member' });

      // If user is already logged in (page refresh) but JWT is missing, refresh it
      // This ensures backend API calls work even after a page reload
      if (!existingJwt) {
        fetch(`${BACKEND_URL}/api/wbi/auth/session-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
          .then((r) => r.ok ? r.json() : null)
          .then((data) => {
            if (data && data.token) {
              sessionStorage.setItem('wbi_jwt', data.token);
              console.log('[WBI Auth] Refreshed session JWT for existing login.');
            }
          })
          .catch((e) => console.warn('[WBI Auth] JWT refresh failed:', e));
      }
    }

    // Handle Microsoft SSO callback — check URL params for ?token= (JWT)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const msError = urlParams.get('ms_error');

    if (tokenFromUrl) {
      // Clean the URL params without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
      try {
        // Decode JWT payload (base64url) to extract email and name
        const payloadB64 = tokenFromUrl.split('.')[1];
        const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(payloadJson);
        const msEmail = payload.email || '';

        if (msEmail) {
          // Store the Microsoft SSO JWT FIRST, then login
          // Pass skipTokenFetch=true so handleLoginSuccess doesn't overwrite it
          sessionStorage.setItem('wbi_jwt', tokenFromUrl);
          handleLoginSuccess(msEmail, true);
        } else {
          console.error('[WBI Auth] Token payload missing email field');
        }
      } catch (err) {
        console.error('[WBI Auth] Failed to decode JWT from URL:', err);
      }
    } else if (msError) {
      window.history.replaceState({}, document.title, window.location.pathname);
      alert('Microsoft login failed: ' + msError);
    }

    // Auto-update reporting week unless manually overridden
    if (initLoadedRef.current && !config._weekOverride) {
      const computedISO = getISOWeek(new Date());
      if (computedISO !== config.currentWeek) {
        const copy = { ...config, currentWeek: computedISO };
        setConfig(copy);
        syncConfig(copy);
      }
    }
  }, [config.currentWeek]);

  // Sync local viewingWeek with config.currentWeek if the user has NOT manually set an override for this browser tab session.
  useEffect(() => {
    const hasManualWk = sessionStorage.getItem('wbi_viewing_week');
    if (!hasManualWk) {
      setViewingWeekState(config.currentWeek);
    }
  }, [config.currentWeek]);

  // Migrating / Merging missing bootstrap department structures (e.g. Retention, Marketing)
  useEffect(() => {
    if (!initLoadedRef.current) return;

    let preCheckChanged = false;
    let preCleanedConfig = { ...config };

    if (preCleanedConfig.categories) {
      const seenCats = new Set<string>();
      const uniqCats = preCleanedConfig.categories.filter(c => {
        if (seenCats.has(c.id)) {
          preCheckChanged = true;
          return false;
        }
        seenCats.add(c.id);
        return true;
      });
      if (uniqCats.length !== preCleanedConfig.categories.length) {
        preCleanedConfig.categories = uniqCats;
      }
    }

    if (preCleanedConfig.subcategories) {
      const seenSubs = new Set<string>();
      const uniqSubs = preCleanedConfig.subcategories.filter(s => {
        if (s.id === 's-nurt-bounce' || s.id === 's-roi-funnel') {
          preCheckChanged = true;
          return false;
        }
        if (seenSubs.has(s.id)) {
          preCheckChanged = true;
          return false;
        }
        seenSubs.add(s.id);
        return true;
      });
      if (uniqSubs.length !== preCleanedConfig.subcategories.length) {
        preCleanedConfig.subcategories = uniqSubs;
      }
    }

    if (preCleanedConfig.metrics) {
      const seenMetrics = new Set<string>();
      const uniqMetrics = preCleanedConfig.metrics.filter(m => {
        if (m.id === 'm-nurt-bounce' || m.id === 'm-roi-funnel') {
          preCheckChanged = true;
          return false;
        }
        if (seenMetrics.has(m.id)) {
          preCheckChanged = true;
          return false;
        }
        seenMetrics.add(m.id);
        return true;
      });
      if (uniqMetrics.length !== preCleanedConfig.metrics.length) {
        preCleanedConfig.metrics = uniqMetrics;
      }
    }

    if (preCheckChanged) {
      setConfig(preCleanedConfig);
      syncConfig(preCleanedConfig);
      return;
    }

    if (config.isLockedLayout) {
      console.log('Category and subcategory layout is hard locked. Default migration skipped.');
      return;
    }

    const freshDefault = getDefaultConfig();
    let mergedConfig = { ...config };
    let isConfigChanged = false;

    // Ensure subcategories are in sync with their latest structure (name/order)
    const updatedSubcategories = mergedConfig.subcategories.map(existingSub => {
      const freshSub = freshDefault.subcategories.find(s => s.id === existingSub.id);
      if (freshSub) {
        if (existingSub.name !== freshSub.name || existingSub.order !== freshSub.order) {
          isConfigChanged = true;
          return {
            ...existingSub,
            name: freshSub.name,
            order: freshSub.order,
          };
        }
      }
      return existingSub;
    });

    if (isConfigChanged) {
      mergedConfig.subcategories = updatedSubcategories;
    }

    // Ensure metrics are in sync with their latest structure (like charts array, subId, name, order)
    const updatedMetrics = mergedConfig.metrics.map(existingMetric => {
      const freshMetric = freshDefault.metrics.find(m => m.id === existingMetric.id);
      if (freshMetric) {
        // Compare charts length or IDs, subId, name, order
        const existingChartIds = (existingMetric.charts || []).map(c => c.id).join(',');
        const freshChartIds = (freshMetric.charts || []).map(c => c.id).join(',');
        if (
          existingChartIds !== freshChartIds ||
          existingMetric.subId !== freshMetric.subId ||
          existingMetric.name !== freshMetric.name ||
          existingMetric.order !== freshMetric.order
        ) {
          isConfigChanged = true;
          return {
            ...existingMetric,
            charts: freshMetric.charts,
            subId: freshMetric.subId,
            name: freshMetric.name,
            order: freshMetric.order,
          };
        }
      }
      return existingMetric;
    });

    if (isConfigChanged) {
      mergedConfig.metrics = updatedMetrics;
    }

    const missingDepts = freshDefault.departments.filter(
      (d) => !mergedConfig.departments.some((cur) => cur.id === d.id)
    );
    const missingCats = freshDefault.categories.filter(
      (c) => !mergedConfig.categories.some((cur) => cur.id === c.id)
    );
    const missingSubs = freshDefault.subcategories.filter(
      (s) => !mergedConfig.subcategories.some((cur) => cur.id === s.id)
    );
    const missingMetrics = freshDefault.metrics.filter(
      (m) => !mergedConfig.metrics.some((cur) => cur.id === m.id)
    );

    if (isConfigChanged || missingDepts.length > 0 || missingCats.length > 0 || missingSubs.length > 0 || missingMetrics.length > 0) {
      // Append departments if not present
      freshDefault.departments.forEach((d) => {
        if (!mergedConfig.departments.some((cur) => cur.id === d.id)) {
          mergedConfig.departments.push(d);
        }
      });

      // Append categories
      freshDefault.categories.forEach((c) => {
        if (!mergedConfig.categories.some((cur) => cur.id === c.id)) {
          mergedConfig.categories.push(c);
        }
      });

      // Append subcategories
      freshDefault.subcategories.forEach((s) => {
        if (!mergedConfig.subcategories.some((cur) => cur.id === s.id)) {
          mergedConfig.subcategories.push(s);
        }
      });

      // Append metrics
      freshDefault.metrics.forEach((m) => {
        if (!mergedConfig.metrics.some((cur) => cur.id === m.id)) {
          mergedConfig.metrics.push(m);
        }
      });

      // Merge leadershipNotes
      if (!mergedConfig.leadershipNotes) mergedConfig.leadershipNotes = {};
      Object.keys(freshDefault.leadershipNotes).forEach((key) => {
        if (!mergedConfig.leadershipNotes[key]) {
          mergedConfig.leadershipNotes[key] = freshDefault.leadershipNotes[key];
        }
      });

      setConfig(mergedConfig);
      syncConfig(mergedConfig);
    }
  }, [config]);

  // Brand config live synchronization hooks
  useEffect(() => {
    const brand = config.brand || { name: 'WBI', accentIdx: 0, logoData: '' };
    const palette = ACCENT_PALETTES[brand.accentIdx] || ACCENT_PALETTES[0];

    document.title = `${brand.name || 'WBI'} — WBR Platform`;

    // Apply color swatches dynamically to the document root element
    document.documentElement.style.setProperty('--ac', palette.val);
    document.documentElement.style.setProperty('--ac-light', palette.light);
    document.documentElement.style.setProperty('--ac-mid', palette.mid);
  }, [config.brand]);

  // Inactivity timeout of 15 minutes + Activity Updates logs loop checks
  useEffect(() => {
    if (!user) return;

    const handleUserInteraction = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('click', handleUserInteraction);

    const idleChecker = setInterval(() => {
      // 15 minutes = 15 * 60 * 1000
      if (Date.now() - lastActivityRef.current > 15 * 60 * 1000) {
        setIsConfigUnlocked(false);
        setPinPopupOpen(false);
        setActiveTab('home');
        alert('Config access has been locked due to 15 minutes of user inactivity.');
      }
    }, 10 * 1000); // Check every 10 seconds

    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      clearInterval(idleChecker);
    };
  }, [user]);

  // Session Logging triggers
  const handleLoginSuccess = async (email: string, skipTokenFetch = false) => {
    const role = 'Member'; // PIN unlock based security model
    sessionStorage.setItem('wbi_auth', '1');
    sessionStorage.setItem('wbi_email', email);
    sessionStorage.setItem('wbi_role', role);

    const logId = 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    sessionStorage.setItem('wbi_cur_log_id', logId);

    // Request a session JWT from the backend so all API calls (data sync, uploads, etc.) work
    // Without this token, initSync() exits early and no backend data is ever loaded
    // skipTokenFetch=true when Microsoft SSO already provided the token via URL param
    if (!skipTokenFetch) {
      try {
        const tokenRes = await fetch(`${BACKEND_URL}/api/wbi/auth/session-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.token) {
            sessionStorage.setItem('wbi_jwt', tokenData.token);
          }
        }
      } catch (err) {
        console.warn('[WBI Auth] Could not fetch session token from backend:', err);
      }
    }

    setUser({ email, role });
    setActiveTab('home');
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    setIsConfigUnlocked(false);
    setUser(null);
    setActiveTab('home');
  };

  // Nav Gating trigger with PINPopupGater
  const handleTabChange = (tab: 'home' | 'wbr' | 'admin') => {
    if (tab === 'admin') {
      if (isConfigUnlocked) {
        startTabTransition(() => setActiveTab('admin'));
      } else {
        setPendingTab('admin');
        setPinPopupOpen(true);
      }
    } else {
      startTabTransition(() => setActiveTab(tab));
    }
  };

  const handlePinUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    try {
      const token = getWbiToken();
      const resp = await fetch(`${BACKEND_URL}/api/wbi/auth/verify-admin-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ password: adminPinRef.current?.value || '' }),
      });

      if (resp.ok) {
        setIsConfigUnlocked(true);
        setPinPopupOpen(false);
        if (adminPinRef.current) adminPinRef.current.value = '';
        setPinError('');

        if (pendingTab) {
          startTabTransition(() => setActiveTab(pendingTab));
          setPendingTab(null);
        }
      } else {
        const data = await resp.json().catch(() => ({}));
        setPinError(data.error || 'Incorrect admin password.');
      }
    } catch (err) {
      setPinError('Server error. Please try again.');
    }
  };

  // Upload Router utilizing custom SheetJS parsing algorithms
  const handleUploadExcel = (deptId: string, file: File) => {
    lastUserDataChangeRef.current = Date.now();
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rawBytes = e.target?.result;
        const workbook = XLSX.read(rawBytes, { type: 'binary' });

        // Filter metrics belonging to the uploaded department
        const deptCats = config.categories.filter((c) => c.deptId === deptId);
        const deptSubs = config.subcategories.filter((s) => deptCats.some((c) => c.id === s.catId));
        const deptMets = config.metrics.filter((m) => deptSubs.some((s) => s.id === m.subId));

        const normalizeForMatch = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '');

        const isCsv = file.name.toLowerCase().endsWith('.csv');
        if (isCsv && workbook.SheetNames.length > 0) {
          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];
          const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

          const targetNorm = normalizeForMatch(fileNameWithoutExt);
          const rowsRaw = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' }) as any[][];
          const allCellStrings = rowsRaw.flat().map((c) => normalizeForMatch(String(c || '')));

          // Find ALL matching metrics for this CSV sheet
          const matchingMetrics = deptMets.filter((m) => {
            const mSheetNorm = normalizeForMatch(m.sheetName || '');
            const mNameNorm = normalizeForMatch(m.name || '');
            
            // Match by file name
            if (mSheetNorm === targetNorm || mSheetNorm.includes(targetNorm) || targetNorm.includes(mSheetNorm) || mNameNorm.includes(targetNorm) || targetNorm.includes(mNameNorm)) {
              return true;
            }

            // Match by column headers/aliases
            return m.charts?.some((ch) => {
              const colNorm = normalizeForMatch(ch.col || '');
              const nameNorm = normalizeForMatch(ch.name || '');
              
              // Look up aliases from COLUMN_ALIASES
              const colAliases = (COLUMN_ALIASES as any)[colNorm] || [];
              const normalizedAliases = colAliases.map(normalizeForMatch);

              return (
                (colNorm && allCellStrings.includes(colNorm)) ||
                (nameNorm && allCellStrings.includes(nameNorm)) ||
                normalizedAliases.some((alias: string) => allCellStrings.includes(alias))
              );
            });
          });

          if (matchingMetrics.length > 0) {
            matchingMetrics.forEach((m) => {
              workbook.Sheets[m.sheetName] = firstSheet;
              console.log(`CSV mapping: matched and assigned sheet "${m.sheetName}"`);
            });
          } else {
            console.warn(
              "Could not determine matching metric/sheet for CSV file name: " +
                file.name +
                ". Parsing under all metrics as fallback."
            );
            deptMets.forEach((m) => {
              workbook.Sheets[m.sheetName] = firstSheet;
            });
          }
        }

        const updatedUdata = { ...userData };
        if (!updatedUdata[deptId]) {
          updatedUdata[deptId] = {};
        }

        const currentYear = new Date().getFullYear();
        let parsedCount = 0;

        deptMets.forEach((metric) => {
          const sheetName = metric.sheetName;
          let worksheet = workbook.Sheets[sheetName];
          if (!worksheet) {
            // Self-healing fuzzy/case-insensitive matchup of the sheetName
            const metricNorm = normalizeForMatch(sheetName);
            const foundSheetName = workbook.SheetNames.find((sn) => {
              const snNorm = normalizeForMatch(sn);
              return snNorm === metricNorm || snNorm.includes(metricNorm) || metricNorm.includes(snNorm);
            });
            if (foundSheetName) {
              worksheet = workbook.Sheets[foundSheetName];
              console.log(`Self-healing resolved sheet name "${foundSheetName}" for metric sheet "${sheetName}"`);
            }
          }
          if (!worksheet) return;

          parsedCount++;

          // Extract values
          const rowsRaw = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];
          const rowsFormatted = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', raw: false }) as any[][];

          // NOTE: Upfront key deletion is intentionally removed.
          // Old metric values are preserved for any key the new file leaves null/blank (null-safe merge).
          // New values from the uploaded Excel overwrite old ones only when they are non-empty.

          // Block-scanning
          const blocks: any[] = [];
          for (let ri = 0; ri < rowsRaw.length; ri++) {
            const row = rowsRaw[ri] || [];
            for (let ci = 0; ci < row.length; ci++) {
              const val = String(row[ci] || '').trim().toLowerCase();
              if (val === 'year') {
                const yearVal = String(rowsRaw[ri][ci + 1] || '').trim();

                let headerIdx = -1;
                for (let rx = ri + 1; rx < Math.min(ri + 8, rowsRaw.length); rx++) {
                  const headVal = String(rowsRaw[rx]?.[ci] || '').trim().toLowerCase();
                  if (
                    headVal === 'month' ||
                    headVal === 'week' ||
                    headVal === 'month/week' ||
                    headVal === 'period'
                  ) {
                    headerIdx = rx;
                    break;
                  }
                }
                if (headerIdx < 0) continue;

                const hr = rowsRaw[headerIdx] || [];
                const headers: any[] = [];
                for (let hi = ci + 1; hi < hr.length; hi++) {
                  const headerVal = String(hr[hi] || '').trim();
                  if (!headerVal) break;
                  headers.push({ index: hi, name: headerVal });
                }

                const dataCols = headers.filter(
                  (h) =>
                    !h.name.toLowerCase().includes('target') &&
                    !h.name.toLowerCase().includes('projected') &&
                    !h.name.toLowerCase().includes('projection')
                );
                const tgtCols = headers.filter((h) => h.name.toLowerCase().includes('target'));

                blocks.push({
                  periodCol: ci,
                  yearVal,
                  headerIdx,
                  dataStart: headerIdx + 1,
                  headers,
                  dataCols,
                  tgtCols,
                  isMonthly: null,
                });
              }
            }
          }

          // Secondary scan: If no Year blocks found, search for flat table structure with headers
          if (blocks.length === 0) {
            for (let ri = 0; ri < Math.min(10, rowsRaw.length); ri++) {
              const row = rowsRaw[ri] || [];
              for (let ci = 0; ci < Math.min(5, row.length); ci++) {
                const headVal = String(row[ci] || '').trim().toLowerCase();
                if (
                  headVal === 'month' ||
                  headVal === 'week' ||
                  headVal === 'month/week' ||
                  headVal === 'period'
                ) {
                  const hr = row;
                  const headers: any[] = [];
                  for (let hi = ci + 1; hi < hr.length; hi++) {
                    const headerVal = String(hr[hi] || '').trim();
                    if (!headerVal) continue;
                    headers.push({ index: hi, name: headerVal });
                  }
                  
                  if (headers.length > 0) {
                    const dataCols = headers.filter(
                      (h) =>
                        !h.name.toLowerCase().includes('target') &&
                        !h.name.toLowerCase().includes('projected') &&
                        !h.name.toLowerCase().includes('projection')
                    );
                    const tgtCols = headers.filter((h) => h.name.toLowerCase().includes('target'));

                    blocks.push({
                      periodCol: ci,
                      yearVal: String(currentYear), // Default to current year
                      headerIdx: ri,
                      dataStart: ri + 1,
                      headers,
                      dataCols,
                      tgtCols,
                      isMonthly: null,
                    });
                    
                    break;
                  }
                }
              }
              if (blocks.length > 0) break;
            }
          }

          // Fallback parsing (raw non-table sheets without Year or flat header tables)
          if (blocks.length === 0) {
            rowsRaw.slice(1).forEach((row) => {
              if (!row || !row[0]) return;
              const pStr = String(row[0]).trim();
              const period = normalizePeriod(pStr, pStr.length <= 3 && isNaN(parseInt(pStr)));
              if (!period) return;

              const col = normKey(metric.sheetName);
              if (row[1] !== '' && row[1] !== null && row[1] !== undefined) {
                updatedUdata[deptId][period + '_' + col] = parseFloat(row[1]);
              }
              if (row[2] !== '' && row[2] !== null && row[2] !== undefined) {
                updatedUdata[deptId]['PY_' + period + '_' + col] = parseFloat(row[2]);
              }
              if (row[3] !== '' && row[3] !== null && row[3] !== undefined) {
                updatedUdata[deptId]['TGT_' + period + '_' + col] = parseFloat(row[3]);
              }
            });
            return;
          }

          // % formatting checks
          const pctColIdxs = new Set<number>();
          blocks.forEach((blk) => {
            [...blk.dataCols, ...blk.tgtCols].forEach((hdr) => {
              for (let rx = blk.dataStart; rx < Math.min(blk.dataStart + 13, rowsRaw.length); rx++) {
                const formattedVal = String(rowsFormatted[rx]?.[hdr.index] || '').trim();
                if (formattedVal.endsWith('%')) {
                  pctColIdxs.add(hdr.index);
                  break;
                }
              }
            });
          });

          // Block parser iteration
          blocks.forEach((blk) => {
            blk.isMonthly = detectMonthly(rowsRaw, blk.dataStart, blk.periodCol);
            const isPY = blk.yearVal ? parseInt(blk.yearVal) < currentYear : false;
            const prefix = isPY ? 'PY_' : '';
            const isSingle = blk.dataCols.length <= 1;
            const sheetKey = normKey(metric.sheetName);

            for (let ri = blk.dataStart; ri < rowsRaw.length; ri++) {
              const row = rowsRaw[ri];
              if (!row || row.every((v) => v === '' || v === null || v === undefined)) break;
              const periodRaw = String(row[blk.periodCol] || '').trim();
              if (!periodRaw) break;

              const period = normalizePeriod(periodRaw, blk.isMonthly);
              if (!period) continue;

              if (isSingle) {
                const achCol = blk.dataCols[0];
                const tgtCol = blk.tgtCols[0];
                const mCol = metric.charts?.[0]?.col || sheetKey;

                if (achCol) {
                  const rVal = row[achCol.index];
                  if (rVal !== '' && rVal !== null && rVal !== undefined) {
                    let val = parseFloat(rVal);
                    if (!isNaN(val)) {
                      if (pctColIdxs.has(achCol.index)) {
                        val = Math.round(val * 10000) / 100;
                        if (!isPY) updatedUdata[deptId]['_ispct_' + mCol] = 1;
                      }
                      updatedUdata[deptId][prefix + period + '_' + mCol] = val;
                    }
                  }
                }

                if (tgtCol && !isPY) {
                  const rVal = row[tgtCol.index];
                  if (rVal !== '' && rVal !== null && rVal !== undefined) {
                    let val = parseFloat(rVal);
                    if (!isNaN(val)) {
                      if (pctColIdxs.has(tgtCol.index)) val = Math.round(val * 10000) / 100;
                      updatedUdata[deptId]['TGT_' + period + '_' + mCol] = val;
                      if (!blk.isMonthly) {
                        updatedUdata[deptId]['tgt_latest_' + mCol] = val;
                      }
                    }
                  }
                }
              } else {
                // Multi column maps
                blk.dataCols.forEach((hdr) => {
                  const rVal = row[hdr.index];
                  if (rVal === '' || rVal === null || rVal === undefined) return;
                  let val = parseFloat(rVal);
                  if (isNaN(val)) return;
                  const hKey = normKey(hdr.name);
                  if (pctColIdxs.has(hdr.index)) {
                    val = Math.round(val * 10000) / 100;
                    if (!isPY) updatedUdata[deptId]['_ispct_' + hKey] = 1;
                  }
                  updatedUdata[deptId][prefix + period + '_' + hKey] = val;
                });

                // Targets matched positionally
                blk.tgtCols.forEach((hdr) => {
                  if (isPY) return;
                  const rVal = row[hdr.index];
                  if (rVal === '' || rVal === null || rVal === undefined) return;
                  let val = parseFloat(rVal);
                  if (isNaN(val)) return;
                  if (pctColIdxs.has(hdr.index)) val = Math.round(val * 10000) / 100;

                  const tgtPos = blk.tgtCols.findIndex((h) => h.index === hdr.index);
                  const stripped = normKey(hdr.name).replace(/^target_?/, '');
                  const byName = blk.dataCols.find((dc) => normKey(dc.name) === stripped);
                  const byPos =
                    tgtPos >= 0 && tgtPos < blk.dataCols.length ? blk.dataCols[tgtPos] : null;
                  const resolvedDC = byName || byPos || blk.dataCols[0];
                  const tgtKey = resolvedDC ? normKey(resolvedDC.name) : normKey(hdr.name);

                  updatedUdata[deptId]['TGT_' + period + '_' + tgtKey] = val;
                  if (!blk.isMonthly) {
                    updatedUdata[deptId]['tgt_latest_' + tgtKey] = val;
                  }
                });
              }
            }
          });

          // Projections block parser
          for (let ri = 0; ri < rowsRaw.length; ri++) {
            const row = rowsRaw[ri] || [];
            for (let ci = 0; ci < row.length; ci++) {
              const cellVal = String(row[ci] || '').trim().toLowerCase();
              if (cellVal === 'projections' || cellVal === 'projection') {
                let hdrRi = -1;
                for (let hi = ri + 1; hi < Math.min(ri + 4, rowsRaw.length); hi++) {
                  const hv = String(rowsRaw[hi]?.[ci] || '').trim().toLowerCase();
                  if (hv === 'month' || hv === 'period' || hv === 'current' || hv === 'month+1') {
                    hdrRi = hi;
                    break;
                  }
                  if (rowsRaw[hi]?.[ci + 1] !== undefined && rowsRaw[hi]?.[ci + 1] !== '') {
                    hdrRi = hi;
                    break;
                  }
                }
                const dataStart = hdrRi >= 0 ? hdrRi : ri + 1;
                const projCols: any[] = [];
                if (hdrRi >= 0) {
                  const hr = rowsRaw[hdrRi] || [];
                  for (let hi = ci + 1; hi < hr.length; hi++) {
                    const hv = String(hr[hi] || '').trim();
                    if (!hv) break;
                    const hk = normKey(hv);
                    projCols.push({
                      index: hi,
                      key:
                        hk === 'projected_value' || hk === 'projected'
                          ? normKey(metric.sheetName)
                          : hk,
                    });
                  }
                }
                if (projCols.length === 0) {
                  projCols.push({ index: ci + 1, key: normKey(metric.sheetName) });
                }

                let projIdx = 0;
                for (let di = dataStart; di < rowsRaw.length && projIdx < 7; di++) {
                  const dr = rowsRaw[di];
                  if (!dr || String(dr[ci] || '').trim() === '') break;
                  let rowHasVal = false;
                  projCols.forEach((pc) => {
                    const rVal = dr[pc.index];
                    if (rVal === undefined || rVal === null || rVal === '') return;
                    let val = parseFloat(rVal);
                    if (isNaN(val)) return;
                    if (pctColIdxs.has(pc.index)) {
                      val = Math.round(val * 10000) / 100;
                    }
                    updatedUdata[deptId]['proj_' + projIdx + '_' + pc.key] = val;
                    rowHasVal = true;
                  });
                  if (rowHasVal) projIdx++;
                  else break;
                }
                break;
              }
            }
          }

          // Compile raw columns maps structures
          const rawCols: any[] = [];
          blocks.forEach((blk) =>
            blk.headers.forEach((h) => {
              if (!h.name.toLowerCase().includes('target')) {
                const raw = h.name.trim();
                const key = normKey(raw);
                if (raw && !rawCols.find((x) => x.key === key)) {
                  rawCols.push({ raw, key });
                }
              }
            })
          );
          if (rawCols.length > 0) {
            updatedUdata[deptId]['_colmap_' + normKey(metric.sheetName)] = JSON.stringify(rawCols);
          }
        });

        setUserData(updatedUdata);
        syncUserData(updatedUdata);

        // Upload the raw Excel file to Azure Blob Storage in the background
        try {
          const reader2 = new FileReader();
          reader2.onload = async (ev2) => {
            try {
              const binaryStr = ev2.target?.result as string;
              if (binaryStr) {
                // Convert binary string to base64 for transmission
                const base64 = btoa(
                  Array.from(binaryStr, (ch) => ch).join('')
                );
                const token = getWbiToken();
                await fetch(`${BACKEND_URL}/api/wbi/upload-excel`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                  },
                  body: JSON.stringify({
                    deptKey: deptId,
                    fileName: file.name,
                    fileBase64: base64,
                  }),
                });
              }
              // Refresh uploaded-files list so HomeScreen shows the new entry
              fetchUploadedFiles();
            } catch (azureErr) {
              console.warn('[Upload] Azure Excel upload failed silently:', azureErr);
            }
          };
          reader2.readAsBinaryString(file);
        } catch (azureErr) {
          console.warn('[Upload] Could not initiate Azure Excel upload:', azureErr);
        }

        setIsUploading(false);
        alert(
          isCsv
            ? `Analysis Complete: Synced CSV file "${file.name}". Visual trends have populated.`
            : `Analysis Complete: Synced ${parsedCount} spreadsheets. Visual trends have populated.`
        );
      } catch (err: any) {
        setIsUploading(false);
        alert('Parsing Failed: ' + err.message);
      }
    };
    setIsUploading(true);
    reader.readAsBinaryString(file);
  };

  const handleClearDeptData = async (deptId: string) => {
    lastUserDataChangeRef.current = Date.now();
    const updated = { ...userData };
    updated[deptId] = {};
    setUserData(updated);
    
    // Call the new DELETE endpoint on the backend to clear files and records
    try {
      const token = getWbiToken();
      await fetch(`${BACKEND_URL}/api/wbi/userdata/${deptId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      // Refresh uploaded-files list so HomeScreen hides the cleared entry
      fetchUploadedFiles();
    } catch (err) {
      console.error('Failed to call clear department backend endpoint:', err);
    }

    alert('Cleared upload metrics history for department selection.');
    window.location.reload();
  };

  // Overwriting logic for Import Backup
  const handleOverwriteAllData = (payload: any) => {
    lastConfigChangeRef.current = Date.now();
    setConfig(payload.cfg);
    syncConfig(payload.cfg);

    if (payload.notes) {
      lastNotesChangeRef.current = Date.now();
      setNotes(payload.notes);
      syncNotes(payload.notes);
    }

    if (payload.udata) {
      lastUserDataChangeRef.current = Date.now();
      setUserData(payload.udata);
      syncUserData(payload.udata);
    }

    setIsConfigUnlocked(true);
    setActiveTab('admin');
  };

  // State Updaters passed to children
  const handleUpdateConfig = (newCfg: AppConfig) => {
    lastConfigChangeRef.current = Date.now();
    const updated = { ...newCfg, isLockedLayout: true };
    setConfig(updated);
    syncConfig(updated);
  };

  const handleUpdateNotes = (subId: string, notesObj: { inf?: any[]; ini?: any[] }) => {
    lastNotesChangeRef.current = Date.now();
    const updated = { ...notes };
    updated[subId] = notesObj;
    setNotes(updated);
    syncNotes(updated);
  };

  const handleUpdateConfigNotes = (deptId: string, sections: any[]) => {
    lastConfigChangeRef.current = Date.now();
    const updated = { ...config, isLockedLayout: true };
    updated.leadershipNotes[deptId] = sections;
    setConfig(updated);
    syncConfig(updated);
  };

  const handleCreateDepartment = async (deptKey: string, deptName: string, desc: string, order: number) => {
    try {
      const token = getWbiToken();
      await fetch(`${BACKEND_URL}/api/wbi/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ deptKey, deptName, desc, order }),
      });
    } catch (err) {
      console.error('Failed to create department in DB:', err);
    }
  };

  // View WBR Navigation helper
  const handleOpenWBR = (deptId: string) => {
    setActiveDeptId(deptId);
    startTabTransition(() => setActiveTab('wbr'));
  };

  const currentWeekRange = getWeekDateRange(viewingWeek);
  const activeConfig = {
    ...config,
    currentWeek: viewingWeek,
  };

  if (!user) {
    return <LoginScreen />;
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[#64748b] font-medium">Loading platform data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] pb-12 font-sans flex flex-col">
      {/* Upload loader overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-xl flex flex-col items-center gap-3 min-w-[200px]">
            <div className="w-8 h-8 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-[#0f172a]">Processing file...</p>
            <p className="text-xs text-[#64748b]">Parsing and syncing data</p>
          </div>
        </div>
      )}

      {/* Tab-switch loader overlay */}
      {isTabSwitching && (
        <div className="fixed inset-0 z-[9998] bg-[#f1f5f9]/70 flex items-center justify-center pointer-events-none">
          <div className="w-7 h-7 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
          {/* Main Navigation Header bar */}
          <NavBar
            brandName={config.brand?.name || 'WBI'}
            logoData={config.brand?.logoData || ''}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            currentWeek={viewingWeek}
            dateRange={currentWeekRange}
            email={user.email}
            onSignOut={handleSignOut}
            wbrEnabled={!!activeDeptId}
          />

          {/* Main viewport frame */}
          <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <HomeScreen
                    config={activeConfig}
                    userData={userData}
                    uploadedFiles={uploadedFiles}
                    onOpenWBR={handleOpenWBR}
                    onClearData={handleClearDeptData}
                    onUploadExcel={handleUploadExcel}
                  />
                </motion.div>
              )}

              {activeTab === 'wbr' && (
                <motion.div
                  key="wbr"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <WBRScreen
                    config={activeConfig}
                    userData={userData}
                    notes={notes}
                    deptId={activeDeptId}
                    user={user}
                    isConfigUnlocked={isConfigUnlocked}
                    onUpdateNotes={handleUpdateNotes}
                    onUpdateConfigNotes={handleUpdateConfigNotes}
                    onStepWeek={(dir) => {
                      const newWk = Math.max(1, Math.min(52, viewingWeek + dir));
                      handleSetViewingWeek(newWk);
                    }}
                    onSelectWeek={(w) => {
                      handleSetViewingWeek(w);
                    }}
                    onUploadExcel={handleUploadExcel}
                    onClearData={handleClearDeptData}
                  />
                </motion.div>
              )}

              {activeTab === 'admin' && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <AdminScreen
                    config={config}
                    userData={userData}
                    notes={notes}
                    onUpdateConfig={handleUpdateConfig}
                    onLockAdmin={() => {
                      setIsConfigUnlocked(false);
                      setActiveTab('home');
                    }}
                    onOverwriteAllData={handleOverwriteAllData}
                    onCreateDepartment={handleCreateDepartment}
                  />
                </motion.div>
              )}

              {activeTab === 'docs' && (
                <motion.div
                  key="docs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <DocsScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* PIN GATER DIALOG POPUP */}
          {pinPopupOpen && (
            <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[#0f172a]/45 backdrop-blur-xs">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                tabIndex={-1}
                className="bg-white border border-[#cbd5e1] rounded-2xl p-6 w-full max-w-[380px] shadow-2xl flex flex-col items-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 select-none">
                  <Lock className="w-5 h-5 animate-pulse" />
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a]">Administrative Access</h3>
                <p className="text-center text-xs text-[#64748b] mt-1.5 leading-relaxed">
                  Enter your admin password to access configuration settings.
                </p>

                <form onSubmit={handlePinUnlockSubmit} className="mt-5 w-full space-y-4">
                  <div className="space-y-1">
                    <input
                      type="password"
                      autoFocus
                      required
                      ref={adminPinRef}
                      defaultValue=""
                      onChange={() => { if (pinError) setPinError(''); }}
                      placeholder="Admin password"
                      className="w-full text-center text-sm bg-[#f8fafc] border border-[#e2e8f0] focus:bg-white focus:border-blue-600 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  {pinError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-[10px] text-center text-rose-600 font-bold"
                    >
                      {pinError}
                    </motion.div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPinPopupOpen(false);
                        setPendingTab(null);
                        if (adminPinRef.current) adminPinRef.current.value = '';
                        setPinError('');
                      }}
                      className="flex-1 py-2 bg-slate-50 border border-[#cbd5e1] hover:bg-slate-100 rounded-xl text-xs font-bold text-[#334155] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      Unlock config
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-[9px] font-mono font-bold text-[#94a3b8] tracking-widest uppercase">
                    Server-Validated Admin Access
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
    </div>
  );
}
