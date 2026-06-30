import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { motion } from 'motion/react';
import {
  Palette,
  FolderTree,
  Sliders,
  Database,
  History,
  Activity,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Lock,
  ChevronDown,
  Upload,
  ArrowRight,
  ShieldAlert,
  Search,
  Calendar,
  X,
  RotateCcw,
} from 'lucide-react';
import { AppConfig, Department, Category, Subcategory, Metric, LoginActivityLog, SubNotes } from '../types';
import { ACCENT_PALETTES, normKey } from '../utils';
import { getDefaultConfig } from '../defaultConfig';

interface AdminScreenProps {
  config: AppConfig;
  onUpdateConfig: (cfg: AppConfig) => void;
  onLockAdmin: () => void;
  onOverwriteAllData: (payload: any) => void;
  onCreateDepartment: (deptKey: string, deptName: string, desc: string, order: number) => void;
  userData: any;
  notes: SubNotes;
}

type AdminTab = 'brand' | 'depts' | 'structure' | 'settings' | 'backup' | 'activity';

export default function AdminScreen({
  config,
  onUpdateConfig,
  onLockAdmin,
  onOverwriteAllData,
  onCreateDepartment,
  userData,
  notes,
}: AdminScreenProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('brand');

  return (
    <div className="space-y-6 font-sans">
      {/* Admin header */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight">
            Platform Configuration
          </h2>
          <p className="text-[11px] text-[#64748b] font-medium uppercase tracking-wider mt-0.5">
            Gated Admin Console · Authorized edits execute instantly
          </p>
        </div>

        <button
          onClick={onLockAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-[#cbd5e1] text-[#334155] rounded-xl text-xs font-bold transition"
        >
          <Lock className="w-4 h-4 text-[#64748b]" />
          <span>Lock config</span>
        </button>
      </div>

      {/* Tabs list row (.at) */}
      <div className="flex border-b border-[#e2e8f0] overflow-x-auto gap-1 scrollbar-none">
        {(
          [
            { id: 'brand', label: 'Branding', icon: Palette },
            { id: 'depts', label: 'Departments', icon: FolderTree },
            { id: 'structure', label: 'Structure', icon: FolderTree },
            { id: 'settings', label: 'Settings', icon: Sliders },
            { id: 'backup', label: 'Backup & Restore', icon: Database },
            { id: 'activity', label: 'Activity Logs', icon: History },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-3 text-xs font-bold select-none flex items-center gap-1.5 shrink-0 hover:text-[#334155] focus:outline-none transition border-b-2 -mb-0.5 ${
                activeTab === item.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-[#64748b]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE TAB PAGE */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-xs min-h-[400px]">
        {activeTab === 'brand' && (
          <BrandTabPage config={config} onUpdateConfig={onUpdateConfig} />
        )}
        {activeTab === 'depts' && (
          <DeptsTabPage config={config} onUpdateConfig={onUpdateConfig} onCreateDepartment={onCreateDepartment} />
        )}
        {activeTab === 'structure' && (
          <StructureTabPage config={config} onUpdateConfig={onUpdateConfig} userData={userData} />
        )}
        {activeTab === 'settings' && (
          <SettingsTabPage config={config} onUpdateConfig={onUpdateConfig} />
        )}
        {activeTab === 'backup' && (
          <BackupTabPage
            config={config}
            userData={userData}
            notes={notes}
            onOverwriteAllData={onOverwriteAllData}
          />
        )}
        {activeTab === 'activity' && <ActivityLogPage />}
      </div>
    </div>
  );
}

/* ════════════════ PAGE: BRANDING ════════════════ */
function BrandTabPage({ config, onUpdateConfig }: { config: AppConfig; onUpdateConfig: (cfg: AppConfig) => void }) {
  const [name, setName] = useState(config.brand?.name || 'WBI');
  const [logoFileLabel, setLogoFileLabel] = useState('');

  const handleNameChange = (val: string) => {
    setName(val);
    const updated = { ...config };
    updated.brand.name = val;
    onUpdateConfig(updated);
  };

  const handlePaletteSelect = (idx: number) => {
    const updated = { ...config };
    updated.brand.accentIdx = idx;
    onUpdateConfig(updated);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFileLabel(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...config };
      updated.brand.logoData = reader.result as string;
      onUpdateConfig(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="border-b border-[#e2e8f0] pb-3 mb-2">
        <h3 className="text-sm font-bold text-[#0f172a]">Company Branding Configuration</h3>
        <p className="text-xs text-[#64748b]">Configure names and logo visuals loaded live across headers</p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
            Company / Workspace Title
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full text-sm bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] focus:bg-white focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        {/* Color Palette swatches */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748b] block">
            Accent Brand Palette
          </label>
          <div className="flex flex-wrap gap-3">
            {ACCENT_PALETTES.map((palette, idx) => (
              <button
                key={palette.name}
                type="button"
                onClick={() => handlePaletteSelect(idx)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition border-3 hover:scale-105 active:scale-[0.98] ${
                  config.brand?.accentIdx === idx
                    ? 'border-[#0f172a] scale-105 shadow-sm'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: palette.val }}
                title={palette.name}
              />
            ))}
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748b] block">
            Company Logo (Square Format Preferred)
          </label>
          <div className="flex items-center gap-4">
            {config.brand?.logoData ? (
              <img
                src={config.brand.logoData}
                alt="preview"
                className="w-12 h-12 rounded-xl border border-[#cbd5e1] object-cover bg-[#f8fafc]"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-dashed border-blue-200 text-blue-600 flex items-center justify-center font-bold text-xs select-none">
                PREV
              </div>
            )}

            <label className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-[#cbd5e1] rounded-xl text-xs font-semibold text-[#334155] hover:bg-slate-100 cursor-pointer shadow-3xs transition">
              <Upload className="w-4 h-4 text-[#64748b]" />
              <span>Choose Logo File</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>

            {logoFileLabel && (
              <span className="text-[10px] font-mono font-medium text-[#64748b] truncate max-w-[200px]">
                {logoFileLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PAGE: DEPARTMENTS ════════════════ */
function DeptsTabPage({ config, onUpdateConfig, onCreateDepartment }: { config: AppConfig; onUpdateConfig: (cfg: AppConfig) => void; onCreateDepartment: (deptKey: string, deptName: string, desc: string, order: number) => void }) {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddDept = () => {
    const title = newTitle.trim();
    if (!title) return;

    const deptId = normKey(title);
    if (config.departments.some((d) => d.id === deptId)) {
      alert('A department with this title already exists.');
      return;
    }

    const nextOrder = config.departments.length;
    const newDept: Department = {
      id: deptId,
      name: title,
      desc: newDesc.trim(),
      order: nextOrder,
    };

    // Auto-seed: Summary tab -> Overview subtab -> Default Metric with charts structures as requested
    const catId = 'c-' + deptId + '_sum';
    const subId = 's-' + deptId + '_sum_over';
    const metId = 'm-' + deptId + '_sum_over';

    const defaultCategory: Category = {
      id: catId,
      deptId: deptId,
      name: 'Summary',
      order: 0,
    };

    const defaultSubcategory: Subcategory = {
      id: subId,
      catId: catId,
      name: 'Overview',
      order: 0,
    };

    const defaultMetric: Metric = {
      id: metId,
      subId: subId,
      name: 'Overview',
      order: 0,
      kpi: true,
      sheetName: 'Overview',
      charts: [
        { id: 'ch-' + deptId + '-1', name: 'Operational Trend', col: deptId + '_trend_metric', kpi: true },
        { id: 'ch-' + deptId + '-2', name: 'Performance Rating', col: deptId + '_grade_metric', kpi: true },
      ],
    };

    const updated = { ...config };
    updated.departments.push(newDept);
    updated.categories.push(defaultCategory);
    updated.subcategories.push(defaultSubcategory);
    updated.metrics.push(defaultMetric);

    // Initial base highlight template
    updated.leadershipNotes[deptId] = [
      {
        id: 'lns-' + deptId + '-1',
        title: 'Weekly Highlights',
        notes: ['Write your executive summary operational highlight here.'],
      },
    ];

    onUpdateConfig(updated);
    onCreateDepartment(deptId, title, newDesc.trim(), nextOrder);
    setNewTitle('');
    setNewDesc('');
  };

  const handleRenameDept = (id: string, name: string) => {
    if (!name.trim()) return;
    const updated = { ...config };
    const idx = updated.departments.findIndex((d) => d.id === id);
    if (idx !== -1) {
      updated.departments[idx].name = name.trim();
      onUpdateConfig(updated);
    }
  };

  const handleDeleteDept = (id: string) => {
    if (confirm('Delete this department and all associated categories, subcategories, metrics, and default operational data?')) {
      const updated = { ...config };
      updated.departments = updated.departments.filter((d) => d.id !== id);
      updated.categories = updated.categories.filter((c) => c.deptId !== id);
      // Remove orphaned subcategories and metrics
      const remainingCats = updated.categories.map((c) => c.id);
      updated.subcategories = updated.subcategories.filter((s) => remainingCats.includes(s.catId));
      const remainingSubs = updated.subcategories.map((s) => s.id);
      updated.metrics = updated.metrics.filter((m) => remainingSubs.includes(m.subId));

      onUpdateConfig(updated);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const list = [...config.departments].sort((a, b) => a.order - b.order);
    const targetIdx = direction === 'up' ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap ordering parameters
    const temp = list[index].order;
    list[index].order = list[targetIdx].order;
    list[targetIdx].order = temp;

    const updated = { ...config };
    updated.departments = list;
    onUpdateConfig(updated);
  };

  const sortedDepts = [...config.departments].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2e8f0] pb-3 mb-2">
        <h3 className="text-sm font-bold text-[#0f172a]">Departments Portfolio Management</h3>
        <p className="text-xs text-[#64748b]">Add or sort target departments active on home submission panels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Creation Box */}
        <div className="border border-[#e2e8f0] p-5 rounded-2xl bg-[#f8fafc]/50 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#334155] flex items-center gap-1.5 select-none">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Create New Department</span>
          </h4>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748b]">Department Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Accounts & billing"
                className="w-full text-xs bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748b]">Description</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Optional department subtitle description"
                className="w-full text-xs bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <button
              onClick={handleAddDept}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Add with Bootstrapped Default Summary Tab
            </button>
          </div>
        </div>

        {/* Existing List */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#334155] select-none">
            Existing Target Departments ({sortedDepts.length})
          </h4>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {sortedDepts.map((d, index) => {
              return (
                <div
                  key={d.id}
                  className="bg-white border border-[#e2e8f0] p-3 rounded-xl flex items-center justify-between gap-3 shadow-3xs"
                >
                  <div className="flex items-center gap-2">
                    {/* Sorting Arrow buttons */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-0.5 hover:bg-slate-100 rounded text-[#94a3b8] hover:text-[#0f172a] disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === sortedDepts.length - 1}
                        className="p-0.5 hover:bg-slate-100 rounded text-[#94a3b8] hover:text-[#0f172a] disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="min-w-0">
                      <input
                        type="text"
                        value={d.name}
                        onChange={(e) => handleRenameDept(d.id, e.target.value)}
                        className="font-bold text-xs text-[#0f172a] bg-transparent border-none p-0 focus:ring-0 focus:underline font-sans cursor-text width-full"
                      />
                      <div className="text-[10px] text-[#64748b] truncate mt-0.5">{d.desc || '—'}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteDept(d.id)}
                    className="p-1 px-2 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold transition shrink-0"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PAGE: STRUCTURE CONFIG ════════════════ */
function StructureTabPage({
  config,
  onUpdateConfig,
  userData,
}: {
  config: AppConfig;
  onUpdateConfig: (cfg: AppConfig) => void;
  userData: any;
}) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(config.departments[0]?.id || '');

  // Add category forms
  const [newCatName, setNewCatName] = useState('');
  const [newSubInlineName, setNewSubInlineName] = useState('');

  const activeDept = config.departments.find((d) => d.id === selectedDeptId);

  const handleExcelAutoLayout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedDeptId) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        if (!data) return;
        const workbook = XLSX.read(data, { type: 'binary' });

        const updated = { ...config };
        
        const confirmClear = window.confirm(
          `Do you want to re-build the complete visual layout of the ${activeDept?.name || 'selected'} department using this Excel workbook? This will automatically map all tabs and data columns into Recharts, allowing you to instantly recover your custom structure!`
        );
        if (!confirmClear) return;

        // Clear existing categories, subcategories, metrics for SELECTED department only!
        const catIdsToPrune = config.categories.filter((c) => c.deptId === selectedDeptId).map((c) => c.id);
        const subIdsToPrune = config.subcategories.filter((s) => catIdsToPrune.includes(s.catId)).map((s) => s.id);
        
        updated.categories = updated.categories.filter((c) => c.deptId !== selectedDeptId);
        updated.subcategories = updated.subcategories.filter((s) => !catIdsToPrune.includes(s.catId));
        updated.metrics = updated.metrics.filter((m) => !subIdsToPrune.includes(m.subId));

        // Setup the standard 8 marketing categories as the target groups, plus any extra required keyword mapping
        const defaultCatsMap = [
          { name: 'Summary', keywords: ['summary', 'overview', 'dashboard', 'overall'] },
          { name: 'Organic Marketing Activity', keywords: ['organic', 'seo', 'search', 'social', 'blog'] },
          { name: 'Marketing Campaigns', keywords: ['campaign', 'facebook', 'instagram', 'linkedin', 'ads_cam', 'advertising', 'ads performance'] },
          { name: 'Device Segmentation', keywords: ['device', 'mobile', 'desktop', 'tablet', 'safari', 'chrome', 'android'] },
          { name: 'Lead Generation', keywords: ['lead_gen', 'lead', 'inbound', 'qualified', 'signups', 'registration', 'sales lead'] },
          { name: 'Lead Generation - Paid Acquisition', keywords: ['paid', 'paid_acq', 'google_ads', 'social_ads', 'cpa', 'adwords'] },
          { name: 'Lead Nurturing', keywords: ['nurture', 'email_nurture', 'sms_nurture', 'drip', 'nurture stats'] },
        ];

        // Create these categories in the config
        const createdCategories: Category[] = defaultCatsMap.map((c, idx) => ({
          id: 'c-' + selectedDeptId + '_' + normKey(c.name),
          deptId: selectedDeptId,
          name: c.name,
          order: idx,
        }));
        updated.categories.push(...createdCategories);

        let subIdx = 0;
        let chartCount = 0;
        workbook.SheetNames.forEach((sheetName) => {
          // Skip info sheets
          if (sheetName.toLowerCase().includes('instructions') || sheetName.toLowerCase().includes('help')) return;

          const worksheet = workbook.Sheets[sheetName];
          const rowsRaw = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];
          if (rowsRaw.length < 3) return;

          // Search header columns to create charts
          let headerIdx = -1;
          for (let ri = 0; ri < Math.min(25, rowsRaw.length); ri++) {
            const row = rowsRaw[ri];
            if (row && row.some((v) => {
              const s = String(v).toLowerCase().trim();
              return s === 'month' || s === 'week' || s === 'period';
            })) {
              headerIdx = ri;
              break;
            }
          }

          if (headerIdx === -1) return; // No period header found

          // Find columns of data
          const hr = rowsRaw[headerIdx] || [];
          const dataCols: { name: string; key: string }[] = [];
          for (let hi = 1; hi < hr.length; hi++) {
            const hVal = String(hr[hi] || '').trim();
            if (!hVal || hVal.toLowerCase().includes('target') || hVal.toLowerCase().includes('projected') || hVal.toLowerCase().includes('projection')) continue;
            dataCols.push({ name: hVal, key: normKey(hVal) });
          }

          if (dataCols.length === 0) return; // No columns

          // Determine category grouping based on sheet name keywords
          const normSheet = sheetName.toLowerCase();
          let targetCatId = 'c-' + selectedDeptId + '_summary'; // Default to Summary
          
          for (const catObj of defaultCatsMap) {
            const matched = catObj.keywords.some((k) => normSheet.includes(k));
            if (matched) {
              targetCatId = 'c-' + selectedDeptId + '_' + normKey(catObj.name);
              break;
            }
          }

          const subId = 's-' + selectedDeptId + '_' + normKey(sheetName);
          const newSub: Subcategory = {
            id: subId,
            catId: targetCatId,
            name: sheetName,
            order: subIdx++,
          };
          updated.subcategories.push(newSub);

          const charts = dataCols.map((dc, cidx) => {
            chartCount++;
            return {
              id: 'ch-' + dc.key + '-' + cidx + '-' + Date.now(),
              name: dc.name,
              col: dc.key,
            };
          });

          const newMet: Metric = {
            id: 'm-' + selectedDeptId + '_' + normKey(sheetName),
            subId: subId,
            name: sheetName,
            order: 0,
            kpi: sheetName.toLowerCase().includes('overview') || sheetName.toLowerCase().includes('summary'),
            sheetName: sheetName,
            charts: charts,
          };
          updated.metrics.push(newMet);
        });

        // Prune unused categories
        updated.categories = updated.categories.filter((cat) => {
          return updated.subcategories.some((sub) => sub.catId === cat.id);
        });

        onUpdateConfig(updated);
        alert(`Successfully auto-built your department layout!\nCreated ${updated.categories.filter(c => c.deptId === selectedDeptId).length} categories, ${subIdx} sub-categories (tabs), and mapped ${chartCount} metrics.`);
      } catch (err: any) {
        alert('Failed parsing the Excel structure: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleRevertToDefaultLayout = () => {
    if (!selectedDeptId) return;

    const confirmRevert = window.confirm(
      `Are you sure you want to revert the layout of the "${activeDept?.name || 'selected'}" department back to the standard out-of-the-box system template?\n\nThis will revoke all custom Excel auto-layout mappings, custom categories, and custom sub-tabs for THIS department only, restoring its original default configuration!`
    );
    if (!confirmRevert) return;

    try {
      const defaultCfg = getDefaultConfig();
      const updated = { ...config };

      // 1. Get default elements for this department to restore
      const defaultCategories = defaultCfg.categories.filter((c) => c.deptId === selectedDeptId);
      const defaultCatIds = defaultCategories.map((c) => c.id);
      
      const defaultSubcategories = defaultCfg.subcategories.filter((s) => defaultCatIds.includes(s.catId));
      const defaultSubIds = defaultSubcategories.map((s) => s.id);

      const defaultMetrics = defaultCfg.metrics.filter((m) => defaultSubIds.includes(m.subId));

      // 2. Remove current elements for this department from client config
      const currentCatIds = config.categories.filter((c) => c.deptId === selectedDeptId).map((c) => c.id);
      const currentSubIds = config.subcategories.filter((s) => currentCatIds.includes(s.catId)).map((s) => s.id);

      updated.categories = updated.categories.filter((c) => c.deptId !== selectedDeptId);
      updated.subcategories = updated.subcategories.filter((s) => !currentCatIds.includes(s.catId));
      updated.metrics = updated.metrics.filter((m) => !currentSubIds.includes(m.subId));

      // 3. Insert default elements
      updated.categories.push(...defaultCategories);
      updated.subcategories.push(...defaultSubcategories);
      updated.metrics.push(...defaultMetrics);

      onUpdateConfig(updated);

      alert(`Successfully reverted the "${activeDept?.name}" department layout to the system default configuration! Mistaken mappings have been completely revoked.`);
    } catch (err: any) {
      alert('Failed to reset department: ' + err.message);
    }
  };

  const handleAddCategory = () => {
    const catName = newCatName.trim();
    if (!catName || !selectedDeptId) return;

    const catId = 'c-' + selectedDeptId + '_' + normKey(catName);
    if (config.categories.some((c) => c.id === catId)) {
      alert('A category named ' + catName + ' already exists in this department.');
      return;
    }

    const nextOrder = config.categories.filter((c) => c.deptId === selectedDeptId).length;
    const newCategory: Category = {
      id: catId,
      deptId: selectedDeptId,
      name: catName,
      order: nextOrder,
    };

    const updated = { ...config };
    updated.categories.push(newCategory);

    // If inline subcategory was also created:
    const subName = newSubInlineName.trim();
    if (subName) {
      const subId = 's-' + selectedDeptId + '_' + normKey(subName);
      const newSub: Subcategory = {
        id: subId,
        catId: catId,
        name: subName,
        order: 0,
      };
      updated.subcategories.push(newSub);

      const newMet: Metric = {
        id: 'm-' + selectedDeptId + '_' + normKey(subName),
        subId: subId,
        name: subName,
        order: 0,
        kpi: false,
        sheetName: subName,
        charts: [{ id: 'ch-' + normKey(subName) + '-1', name: 'Example Chart', col: normKey(subName) }],
      };
      updated.metrics.push(newMet);
    }

    onUpdateConfig(updated);
    setNewCatName('');
    setNewSubInlineName('');
  };

  const handleAddSubcategory = (catId: string) => {
    const val = prompt('Enter name of the subcategory (and matching Excel tab name):');
    if (!val || !val.trim()) return;

    const subName = val.trim();
    const subId = 's-' + selectedDeptId + '_' + normKey(subName);
    const order = config.subcategories.filter((s) => s.catId === catId).length;

    const newSub: Subcategory = {
      id: subId,
      catId,
      name: subName,
      order,
    };

    const newMet: Metric = {
      id: 'm-' + selectedDeptId + '_' + normKey(subName),
      subId: subId,
      name: subName,
      order: 0,
      kpi: false,
      sheetName: subName,
      charts: [{ id: 'ch-' + normKey(subName) + '-' + Date.now(), name: 'Chart 1', col: normKey(subName) }],
    };

    const updated = { ...config };
    updated.subcategories.push(newSub);
    updated.metrics.push(newMet);
    onUpdateConfig(updated);
  };

  const handleAddChartRow = (subId: string) => {
    const label = prompt('Chart Title:');
    if (!label || !label.trim()) return;

    const key = prompt('Excel Sheet Column Header (exact header name):');
    if (!key || !key.trim()) return;

    const updated = { ...config };
    const metIdx = updated.metrics.findIndex((m) => m.subId === subId);
    if (metIdx !== -1) {
      updated.metrics[metIdx].charts.push({
        id: 'ch_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
        name: label.trim(),
        col: normKey(key.trim()),
        kpi: false,
      });
      onUpdateConfig(updated);
    }
  };

  const handleUpdateChart = (subId: string, chartId: string, field: 'name' | 'col' | 'kpi', val: any) => {
    const updated = { ...config };
    const metIdx = updated.metrics.findIndex((m) => m.subId === subId);
    if (metIdx !== -1) {
      const charts = updated.metrics[metIdx].charts;
      const chIdx = charts.findIndex((c) => c.id === chartId);
      if (chIdx !== -1) {
        if (field === 'kpi') {
          charts[chIdx].kpi = val;
        } else if (field === 'col') {
          charts[chIdx].col = normKey(val);
        } else {
          charts[chIdx].name = val;
        }
        onUpdateConfig(updated);
      }
    }
  };

  const handleDeleteChart = (subId: string, chartId: string) => {
    const updated = { ...config };
    const metIdx = updated.metrics.findIndex((m) => m.subId === subId);
    if (metIdx !== -1) {
      updated.metrics[metIdx].charts = updated.metrics[metIdx].charts.filter((c) => c.id !== chartId);
      onUpdateConfig(updated);
    }
  };

  const handleRenameCategory = (catId: string, name: string) => {
    if (!name.trim()) return;
    const updated = { ...config };
    const idx = updated.categories.findIndex((c) => c.id === catId);
    if (idx !== -1) {
      updated.categories[idx].name = name.trim();
      onUpdateConfig(updated);
    }
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm('Delete this Category tab and all of its subcategories, charts, and metrics?')) {
      const updated = { ...config };
      updated.categories = updated.categories.filter((c) => c.id !== catId);
      const subIds = updated.subcategories.filter((s) => s.catId === catId).map((s) => s.id);
      updated.subcategories = updated.subcategories.filter((s) => s.catId !== catId);
      updated.metrics = updated.metrics.filter((m) => !subIds.includes(m.subId));
      onUpdateConfig(updated);
    }
  };

  const handleRenameSubcategory = (subId: string, name: string) => {
    if (!name.trim()) return;
    const updated = { ...config };
    const idx = updated.subcategories.findIndex((s) => s.id === subId);
    if (idx !== -1) {
      updated.subcategories[idx].name = name.trim();
      // Keep metrics sheetName + name aligned
      const mIdx = updated.metrics.findIndex((m) => m.subId === subId);
      if (mIdx !== -1) {
        updated.metrics[mIdx].name = name.trim();
        updated.metrics[mIdx].sheetName = name.trim();
      }
      onUpdateConfig(updated);
    }
  };

  const handleDeleteSubcategory = (subId: string) => {
    if (confirm('Delete this subcategory and all charts?')) {
      const updated = { ...config };
      updated.subcategories = updated.subcategories.filter((s) => s.id !== subId);
      updated.metrics = updated.metrics.filter((m) => m.subId !== subId);
      onUpdateConfig(updated);
    }
  };

  const handleMoveSubcategory = (subId: string, direction: 'up' | 'down') => {
    const updated = { ...config };
    const sub = updated.subcategories.find((s) => s.id === subId);
    if (!sub) return;

    const siblings = updated.subcategories
      .filter((s) => s.catId === sub.catId)
      .sort((a, b) => a.order - b.order);

    const index = siblings.findIndex((s) => s.id === subId);
    if (index === -1) return;

    const neighborIndex = direction === 'up' ? index - 1 : index + 1;
    if (neighborIndex < 0 || neighborIndex >= siblings.length) return;

    const neighbor = siblings[neighborIndex];

    const tempOrder = sub.order;
    sub.order = neighbor.order;
    neighbor.order = tempOrder;

    const siblingsWithNewSort = [...siblings];
    siblingsWithNewSort[index] = neighbor;
    siblingsWithNewSort[neighborIndex] = sub;

    siblingsWithNewSort.forEach((s, idx) => {
      const actualSub = updated.subcategories.find((x) => x.id === s.id);
      if (actualSub) {
        actualSub.order = idx;
      }
    });

    onUpdateConfig(updated);
  };

  const handleMoveChart = (subId: string, chartId: string, direction: 'up' | 'down') => {
    const updated = { ...config };
    const metIdx = updated.metrics.findIndex((m) => m.subId === subId);
    if (metIdx !== -1) {
      const charts = [...updated.metrics[metIdx].charts];
      const index = charts.findIndex((c) => c.id === chartId);
      if (index === -1) return;

      const neighborIndex = direction === 'up' ? index - 1 : index + 1;
      if (neighborIndex < 0 || neighborIndex >= charts.length) return;

      const temp = charts[index];
      charts[index] = charts[neighborIndex];
      charts[neighborIndex] = temp;

      updated.metrics[metIdx].charts = charts;
      onUpdateConfig(updated);
    }
  };

  const handleMoveCategory = (catId: string, direction: 'up' | 'down') => {
    const updated = { ...config };
    const cat = updated.categories.find((c) => c.id === catId);
    if (!cat) return;

    const siblings = updated.categories
      .filter((c) => c.deptId === cat.deptId)
      .sort((a, b) => a.order - b.order);

    const index = siblings.findIndex((c) => c.id === catId);
    if (index === -1) return;

    const neighborIndex = direction === 'up' ? index - 1 : index + 1;
    if (neighborIndex < 0 || neighborIndex >= siblings.length) return;

    const neighbor = siblings[neighborIndex];

    const tempOrder = cat.order;
    cat.order = neighbor.order;
    neighbor.order = tempOrder;

    const siblingsWithNewSort = [...siblings];
    siblingsWithNewSort[index] = neighbor;
    siblingsWithNewSort[neighborIndex] = cat;

    siblingsWithNewSort.forEach((c, idx) => {
      const actualCat = updated.categories.find((x) => x.id === c.id);
      if (actualCat) {
        actualCat.order = idx;
      }
    });

    onUpdateConfig(updated);
  };

  const cats = config.categories
    .filter((c) => c.deptId === selectedDeptId)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2e8f0] pb-3 mb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0f172a]">WBR Hierarchical Tree Configurator</h3>
          <p className="text-xs text-[#64748b]">Configure categories, tabs, spreadsheet sheet names, and graph columns</p>
        </div>

        {/* Picker */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Target Dept:</span>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-2.5 py-1.5 focus:ring-1 focus:ring-blue-600 outline-none"
          >
            {config.departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Layout Locking Info and Preservation banner */}
      <div className="bg-emerald-50/75 border border-emerald-200/85 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-3 items-start">
          <div className="bg-emerald-600 text-white rounded-xl p-2 shrink-0 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-emerald-900 tracking-wide uppercase">
              Structure Preservation & hard-lock status
            </h4>
            <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
              Your customized tab hierarchy and graph mappings are <strong className="font-bold underline text-emerald-950">hard-saved</strong> and locked. Automatic system upgrades will never override or reset your custom-built categories, tabs, or metrics.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const updated = { ...config, isLockedLayout: true };
            onUpdateConfig(updated);
            alert("Layout and category/subcategory hierarchies have been hard-saved and locked successfully! No automatic system upgrades will alter your custom layout.");
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs shrink-0 self-start sm:self-center"
        >
          <Database className="w-3.5 h-3.5 text-emerald-100" />
          <span>Hard-Save Layout Structure</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Creator panel */}
        <div className="border border-[#e2e8f0] rounded-2xl p-5 bg-[#f8fafc]/50 space-y-4 shadow-3xs xl:col-span-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#334155] flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Add Category tab</span>
          </h4>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748b]">Category Label</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Sales KPI, Operations..."
                className="w-full text-xs bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748b]">
                First Sub Category <span className="text-slate-400 font-medium">(Optional)</span>
              </label>
              <input
                type="text"
                value={newSubInlineName}
                onChange={(e) => setNewSubInlineName(e.target.value)}
                placeholder="Leads sub-tab (matching tab of xls)"
                className="w-full text-xs bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <button
              onClick={handleAddCategory}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-3xs transition"
            >
              Add Category Target
            </button>
          </div>
        </div>

        {/* Dynamic Excel Layout Discovery Card */}
        <div className="border border-dashed border-blue-200 rounded-2xl p-5 bg-blue-50/20 space-y-4 shadow-3xs xl:col-span-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Excel Auto-Layout Builder</span>
          </h4>
          <p className="text-[11px] text-[#64748b] leading-relaxed">
            Missing structural tabs or charts? Select your target department and upload any reporting Excel ledger. The system will automatically construct the complete hierarchical categories, map all tabs/sub-tabs, configure Chart channels, and make targets fully visible.
          </p>

          <label className="flex flex-col items-center justify-center border border-dashed border-blue-200 hover:border-blue-400 cursor-pointer bg-white rounded-xl p-4 text-center transition">
            <Upload className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-[11px] font-bold text-blue-700">Upload Excel Spreadsheet</span>
            <span className="text-[9px] text-[#64748b] mt-0.5">Auto-builds categories & charts</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelAutoLayout}
              className="hidden"
            />
          </label>
        </div>

        {/* Revert / Revoke Layout Card */}
        <div className="border border-dashed border-rose-200 rounded-2xl p-5 bg-rose-50/20 space-y-4 shadow-3xs xl:col-span-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Revoke / Revert Layout</span>
          </h4>
          <p className="text-[11px] text-[#64748b] leading-relaxed">
            Uploaded a wrong Excel template or got misplaced metrics? Select your department as target and click Revert. This instantly revokes custom structures for the current department, returning it to standard KPI configurations.
          </p>

          <button
            onClick={handleRevertToDefaultLayout}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revert "{activeDept?.name || 'Selected'}" Department</span>
          </button>
        </div>

        {/* Tree expandable lists */}
        <div className="space-y-4 xl:col-span-3 max-h-[640px] overflow-y-auto pr-1">
          {cats.map((cat) => {
            const subs = config.subcategories
              .filter((s) => s.catId === cat.id)
              .sort((a, b) => a.order - b.order);

            return (
              <div
                key={cat.id}
                className="border border-[#e2e8f0] bg-[#f8fafc]/40 rounded-2xl overflow-hidden shadow-2xs"
              >
                {/* Cat label Header */}
                <div className="bg-[#f8fafc] px-4 py-2.5 border-b border-[#e2e8f0] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleRenameCategory(cat.id, e.target.value)}
                      className="bg-transparent border-none p-0 focus:ring-0 focus:underline font-extrabold text-[#0f172a] text-xs font-mono max-w-[200px]"
                    />
                    <span className="text-[9px] font-semibold text-[#64748b] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
                      {subs.length} tabs
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAddSubcategory(cat.id)}
                      className="text-[10px] font-bold text-blue-600 hover:bg-blue-50/50 px-2 py-1 rounded transition"
                    >
                      + Sub-Tab
                    </button>
                    <span className="w-px h-3.5 bg-slate-200"></span>
                    <button
                      type="button"
                      onClick={() => handleMoveCategory(cat.id, 'up')}
                      disabled={cats.indexOf(cat) === 0}
                      className="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-25"
                      title="Move category up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveCategory(cat.id, 'down')}
                      disabled={cats.indexOf(cat) === cats.length - 1}
                      className="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-25"
                      title="Move category down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-px h-3.5 bg-slate-200"></span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-[#94a3b8] hover:text-rose-600 p-1"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub tree cards list */}
                <div className="p-4 space-y-4">
                  {subs.map((sub) => {
                    const metric = config.metrics.find((m) => m.subId === sub.id);
                    const charts = metric?.charts || [];

                    return (
                      <div key={sub.id} className="bg-white border border-[#cbd5e1]/40 rounded-xl p-3.5 space-y-3 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                          <div className="min-w-0 flex items-center gap-1.5">
                            <input
                              type="text"
                              value={sub.name}
                              onChange={(e) => handleRenameSubcategory(sub.id, e.target.value)}
                              className="font-bold text-xs text-[#334155] bg-transparent border-none p-0 focus:ring-0 focus:underline"
                            />
                            <span className="text-[9px] font-mono text-[#94a3b8]">
                              ({charts.length} chart channels)
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-400">
                            <button
                              type="button"
                              onClick={() => handleMoveSubcategory(sub.id, 'up')}
                              className="p-1 rounded hover:bg-slate-50 hover:text-blue-600 transition disabled:opacity-25"
                              disabled={subs.indexOf(sub) === 0}
                              title="Move subtab up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveSubcategory(sub.id, 'down')}
                              className="p-1 rounded hover:bg-slate-50 hover:text-blue-600 transition disabled:opacity-25"
                              disabled={subs.indexOf(sub) === subs.length - 1}
                              title="Move subtab down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <span className="w-px h-3.5 bg-slate-200 mx-0.5"></span>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubcategory(sub.id)}
                              className="p-1 rounded hover:bg-slate-50 hover:text-rose-600 transition"
                              title="Remove subtab"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* MAPPED SHEET INFO DISPLAY */}
                        <div className="text-[9px] font-mono text-[#64748b] bg-slate-50 border border-[#e2e8f0] px-2.5 py-1.5 rounded-lg">
                          Expected Spreadsheet Sheet Name: <strong className="text-slate-800">"{metric?.sheetName || sub.name}"</strong>
                        </div>

                        {/* Charts list inside sub */}
                        <div className="space-y-2">
                          {charts.map((ch, chIdx) => {
                            return (
                              <div
                                key={ch.id}
                                className="bg-[#f8fafc] border border-[#e2e8f0] p-2.5 rounded-xl flex flex-wrap items-center gap-3"
                              >
                                {/* Rename */}
                                <div className="min-w-[120px] flex-1">
                                  <div className="text-[8px] font-mono font-bold text-[#64748b] uppercase">Graph Label</div>
                                  <input
                                    type="text"
                                    value={ch.name}
                                    onChange={(e) => handleUpdateChart(sub.id, ch.id, 'name', e.target.value)}
                                    className="bg-transparent border-none p-0 focus:ring-0 text-xs text-[#0f172a] font-bold w-full"
                                  />
                                </div>

                                {/* Col Key */}
                                <div className="min-w-[120px] flex-1">
                                  <div className="text-[8px] font-mono font-bold text-[#64748b] uppercase">Column Key</div>
                                  <input
                                    type="text"
                                    value={ch.col}
                                    onChange={(e) => handleUpdateChart(sub.id, ch.id, 'col', e.target.value)}
                                    className="bg-transparent border-none p-0 focus:ring-0 text-xs text-blue-600 font-mono font-semibold w-full"
                                  />
                                </div>

                                {/* KPI Toggle Checkbox styling */}
                                <div className="flex items-center gap-1.5 shrink-0 bg-white border border-[#cbd5e1]/40 px-2 py-1 rounded-lg">
                                  <input
                                    type="checkbox"
                                    id={`kpi-ch-${ch.id}`}
                                    checked={!!ch.kpi}
                                    onChange={(e) => {
                                      handleUpdateChart(sub.id, ch.id, 'kpi', e.target.checked);
                                    }}
                                    className="w-3.5 h-3.5 text-blue-600 border-[#cbd5e1] rounded shrink-0 focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor={`kpi-ch-${ch.id}`}
                                    className="text-[9px] font-mono font-bold select-none text-[#64748b]"
                                  >
                                    ⭐ KPI
                                  </label>
                                </div>

                                {/* Reordering Controls */}
                                <div className="flex items-center gap-1 shrink-0 bg-white border border-[#cbd5e1]/40 p-0.5 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveChart(sub.id, ch.id, 'up')}
                                    disabled={chIdx === 0}
                                    className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition disabled:opacity-25"
                                    title="Move graph label up"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveChart(sub.id, ch.id, 'down')}
                                    disabled={chIdx === charts.length - 1}
                                    className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition disabled:opacity-25"
                                    title="Move graph label down"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteChart(sub.id, ch.id)}
                                  className="text-[#94a3b8] hover:text-rose-600 self-center shrink-0 p-1 rounded hover:bg-slate-100 transition"
                                  title="Delete graph label"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}

                          {charts.length === 0 && (
                            <div className="text-center py-2.5 text-[10px] text-[#94a3b8] italic select-none">
                              No charts set click button below to initialize.
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddChartRow(sub.id)}
                          className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-dashed border-[#e2e8f0] hover:border-blue-300 text-[10px] font-bold tracking-wider text-[#64748b] hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-lg uppercase select-none transition"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Graph channel</span>
                        </button>
                      </div>
                    );
                  })}

                  {subs.length === 0 && (
                    <div className="text-center py-4 text-xs text-[#94a3b8] italic select-none">
                      No sub tabs added. Click + Sub-Tab above.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PAGE: SETTINGS ════════════════ */
function SettingsTabPage({
  config,
  onUpdateConfig,
}: {
  config: AppConfig;
  onUpdateConfig: (cfg: AppConfig) => void;
}) {
  const [newPIN, setNewPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');
  const [pinMessage, setPinMessage] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const [currentWeekOverride, setCurrentWeekOverride] = useState(config.currentWeek);

  const handlePINReset = (e: React.FormEvent) => {
    e.preventDefault();
    setPinMessage('');
    setPinSuccess(false);

    const pinTrimmed = newPIN.trim();
    if (pinTrimmed.length < 4 || pinTrimmed.length > 6) {
      setPinMessage('PIN code must be between 4 and 6 characters.');
      return;
    }

    if (pinTrimmed !== confirmPIN.trim()) {
      setPinMessage('PIN codes do not match.');
      return;
    }

    const updated = { ...config };
    updated.pin = pinTrimmed;
    onUpdateConfig(updated);

    setNewPIN('');
    setConfirmPIN('');
    setPinSuccess(true);
    setPinMessage('Authorized PIN updated successfully.');
  };

  const handleSetWeekOverride = () => {
    const val = currentWeekOverride;
    if (val < 1 || val > 52) {
      alert('Enter a valid week number between 1 and 52');
      return;
    }

    const updated = { ...config };
    updated.currentWeek = val;
    updated._weekOverride = true;
    onUpdateConfig(updated);
    alert('Week override applied manually to W' + val);
  };

  const handleResetToAuto = () => {
    // Standard ISO week calculation logic
    const computedISO = getISOWeekCalc(new Date());
    const updated = { ...config };
    updated.currentWeek = computedISO;
    updated._weekOverride = false;
    onUpdateConfig(updated);
    setCurrentWeekOverride(computedISO);
    alert('Calendar auto week calculation restored.');
  };

  // Duplicate calculation for view state sync
  const getISOWeekCalc = (d: Date): number => {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  };

  return (
    <div className="space-y-8 max-w-xl">
      {/* PIN configuration */}
      <div className="space-y-4">
        <div className="border-b border-[#e2e8f0] pb-3 mb-2">
          <h3 className="text-sm font-bold text-[#0f172a]">PIN Authorized Credentials</h3>
          <p className="text-xs text-[#64748b]">Configure your PIN security code gating layout structural edits</p>
        </div>

        <form onSubmit={handlePINReset} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                New PIN Code (4-6 digits)
              </label>
              <input
                type="password"
                required
                value={newPIN}
                onChange={(e) => setNewPIN(e.target.value)}
                placeholder="••••"
                className="w-full text-sm bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] focus:bg-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Confirm PIN Code
              </label>
              <input
                type="password"
                required
                value={confirmPIN}
                onChange={(e) => setConfirmPIN(e.target.value)}
                placeholder="••••"
                className="w-full text-sm bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] focus:bg-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          {pinMessage && (
            <div
              className={`p-3 rounded-xl text-xs text-center border font-semibold ${
                pinSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}
            >
              {pinMessage}
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            Apply PIN Update
          </button>
        </form>
      </div>

      {/* Week offsets configuration */}
      <div className="space-y-4">
        <div className="border-b border-[#e2e8f0] pb-3 mb-2">
          <h3 className="text-sm font-bold text-[#0f172a]">Reporting Week offsets</h3>
          <p className="text-xs text-[#64748b]">Configure default dashboard visual week target index</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-[#334155] font-medium flex items-center gap-1.5">
              <span>Platform Target Week:</span>
              <span className="font-mono bg-blue-50 border border-blue-200 text-blue-600 px-2.5 py-0.5 rounded-full font-bold">
                W{config.currentWeek}
              </span>
              <span className="text-[10px] text-[#64748b]">
                {config._weekOverride ? '(Manual override)' : '(Calendar Auto set)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={52}
                value={currentWeekOverride}
                onChange={(e) => setCurrentWeekOverride(parseInt(e.target.value) || 1)}
                className="w-16 text-center text-xs font-mono font-bold bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-2 py-1.5 focus:outline-none focus:border-blue-600"
              />
              <button
                onClick={handleSetWeekOverride}
                className="px-3 py-1.5 border border-[#cbd5e1] hover:bg-slate-50 text-xs font-bold text-[#334155] rounded-xl transition"
              >
                Set Override
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleResetToAuto}
              className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100/60 border border-rose-100 rounded-xl px-3.5 py-1.5 transition"
            >
              Reset to Auto-Calendar Setting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PAGE: BACKUP & RESTORE ════════════════ */
interface BackupTabPageProps {
  config: AppConfig;
  userData: any;
  notes: SubNotes;
  onOverwriteAllData: (payload: any) => void;
}

function BackupTabPage({ config, userData, notes, onOverwriteAllData }: BackupTabPageProps) {
  const handleExportConfigOnly = () => {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      cfg: config,
      notes: notes || {},
    };

    downloadJSON(payload, `wbi_config_${dateStamp()}.json`);
  };

  const handleExportFullBackup = () => {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      cfg: config,
      notes: notes || {},
      udata: userData,
    };

    downloadJSON(payload, `wbi_full_backup_${dateStamp()}.json`);
  };

  const downloadJSON = (data: any, fileName: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const dateStamp = () => {
    const d = new Date();
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const payload = JSON.parse(event.target?.result as string);
        if (!payload.cfg || !payload.cfg.departments) {
          throw new Error('Invalid schema format: missing department records.');
        }

        if (confirm('Importing this file will overwrite existing platform structures, notes, and uploaded excel logs. Do you want to continue?')) {
          onOverwriteAllData(payload);
          alert('System configuration and backup restored successfully.');
        }
      } catch (err: any) {
        alert('Restoration Failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2e8f0] pb-3 mb-2">
        <h3 className="text-sm font-bold text-[#0f172a]">Backup & Disaster Recovery</h3>
        <p className="text-xs text-[#64748b]">Export complete setups or restore backups to preserve dashboards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Export Card */}
        <div className="border border-[#e2e8f0] rounded-2xl p-5 space-y-4 shadow-3xs bg-slate-50/20 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Export Backups</h4>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Export configs (structural targets, highlights, palettes) or complete archives including all uploaded Excel and historical columns.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleExportConfigOnly}
              className="w-full py-2 bg-white border border-[#cbd5e1] hover:border-blue-600 text-blue-600 text-xs font-bold rounded-xl shadow-3xs transition"
            >
              Export config.json (Structures + Notes)
            </button>
            <button
              onClick={handleExportFullBackup}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              Export full_backup.json (All Data included)
            </button>
          </div>
        </div>

        {/* Restore Card */}
        <div className="border border-[#e2e8f0] rounded-2xl p-5 space-y-4 shadow-3xs bg-slate-50/20 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Restore backups</h4>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Upload any previously downloaded config or full-backup JSON to fully populate indicators instantly. This will override existing states.
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-center justify-center gap-1.5 w-full py-3 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl text-xs font-bold text-[#64748b] hover:text-blue-600 cursor-pointer shadow-3xs transition">
              <Upload className="w-4 h-4" />
              <span>Import Config/Backup JSON</span>
              <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PAGE: ACTIVITY LOG ════════════════ */
function ActivityLogPage() {
  const [logs, setLogs] = useState<LoginActivityLog[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Activity logs are stored in DB; display is read-only from server data
  useEffect(() => {}, []);

  // Filter list
  const filtered = logs
    .filter((log) => {
      if (searchEmail && !log.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
      if (searchDate && log.loginDate !== searchDate) {
        // format date-picker string e.g. "2026-05-24" into "24 May 2026" or format matches
        const dObj = new Date(searchDate);
        if (!isNaN(dObj.getTime())) {
          const formattedPicker = dObj.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }); // e.g. "24 May 2026"
          if (log.loginDate !== formattedPicker) return false;
        }
      }
      return true;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const getActiveStateStr = (lastActive: number, curSession: number) => {
    const offset = Math.abs(curSession - lastActive);
    const secs = Math.floor(offset / 1000);
    if (secs < 20) return 'Online';
    if (secs < 60) return 'Active 1m ago';
    if (secs < 300) return 'Active 5m ago';
    return 'Offline';
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2e8f0] pb-3 mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#0f172a]">Security Login Activity Logs</h3>
          <p className="text-xs text-[#64748b]">Monitor administrative and user sessions (10-day retention)</p>
        </div>

        <span className="text-[10px] font-mono font-bold bg-blue-50 border border-blue-200 text-blue-600 rounded-full px-2.5 py-1">
          {filtered.length} total entries loaded
        </span>
      </div>

      {/* Inputs filters row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94a3b8]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search email log..."
            className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] pl-9 pr-4 py-2 rounded-xl focus:bg-white focus:outline-none transition leading-none shadow-3xs"
          />
        </div>

        {/* Date */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94a3b8]">
            <Calendar className="w-4 h-4" />
          </span>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] pl-9 pr-4 py-2 rounded-xl focus:bg-white focus:outline-none transition leading-none shadow-3xs text-[#334155]"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[9px] uppercase font-bold font-mono tracking-wider text-[#64748b]">
              <tr>
                <th className="py-2.5 px-4">User Session</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4">Browser/OS Device Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
              {filtered.length > 0 ? (
                filtered.map((log) => {
                  const stateStr = getActiveStateStr(log.lastActiveTime, Date.now());
                  const stateBadge =
                    stateStr === 'Online'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-[#f8fafc] text-slate-500 border-slate-200';

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-[#0f172a]">{log.email}</td>
                      <td className="py-3 px-4">{log.loginDate}</td>
                      <td className="py-3 px-4 font-mono">{log.loginTime}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeBgByState(stateStr)}`}>
                          {stateStr}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#64748b] font-mono select-all text-[11px] truncate max-w-[240px]">
                        {log.deviceInfo}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#64748b] italic">
                    No activity logs recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function badgeBgByState(str: string) {
  if (str === 'Online') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (str.startsWith('Active')) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-[#f8fafc] text-slate-400 border-slate-200';
}
