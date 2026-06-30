import * as XLSX from 'xlsx';
import { Metric, Subcategory } from './types';

export const WKS = Array.from({ length: 52 }, (_, i) => 'W' + (i + 1));
export const MOS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface AccentColor {
  name: string;
  val: string;
  light: string;
  mid: string;
}

export const ACCENT_PALETTES: AccentColor[] = [
  { name: 'Blue', val: '#2563eb', light: '#eff6ff', mid: '#93c5fd' },
  { name: 'Teal', val: '#0891b2', light: '#ecfeff', mid: '#67e8f9' },
  { name: 'Green', val: '#16a34a', light: '#f0fdf4', mid: '#86efac' },
  { name: 'Purple', val: '#7c3aed', light: '#f5f3ff', mid: '#c4b5fd' },
  { name: 'Rose', val: '#e11d48', light: '#fff1f2', mid: '#fda4af' },
  { name: 'Orange', val: '#ea580c', light: '#fff7ed', mid: '#fdba74' },
];

export function normKey(s: string): string {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function numFmt(v: any): string {
  if (v === null || v === undefined || v === '') return '—';
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  const absN = Math.abs(n);
  if (absN >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (absN >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n % 1 !== 0 ? n.toFixed(1) : String(Math.round(n));
}

export function pctChg(a: any, b: any): number | null {
  if (a === null || a === undefined || b === null || b === undefined || b === 0) return null;
  const valA = parseFloat(a);
  const valB = parseFloat(b);
  if (isNaN(valA) || isNaN(valB)) return null;
  return ((valA - valB) / Math.abs(valB)) * 100;
}

export function fmtPct(v: number | null): string {
  if (v === null) return '—';
  return (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
}

export function pctBadgeCls(v: number | null): string {
  if (v === null) return 'bg-slate-100 text-slate-600 border border-slate-200';
  return v >= 0
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    : 'bg-rose-50 text-rose-700 border border-rose-200';
}

export function achCls(pct: number): string {
  if (pct >= 95) return 'border-l-emerald-500 bg-emerald-50/20';
  if (pct >= 80) return 'border-l-amber-500 bg-amber-50/20';
  return 'border-l-rose-500 bg-rose-50/20';
}

export function getISOWeek(d: Date): number {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function getISOWeekMonday(wkNum: number, year: number): Date {
  const jan4 = new Date(year, 0, 4);
  const jan4Day = (jan4.getDay() + 6) % 7; // 0 = Mon
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - jan4Day + (wkNum - 1) * 7);
  return monday;
}

export function getWeekDateRange(wkNum: number, year?: number): string {
  const yr = year || new Date().getFullYear();
  const mon = getISOWeekMonday(wkNum, yr);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  return fmt(mon) + ' – ' + sun.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export const COLUMN_ALIASES: Record<string, string[]> = {
  total_enrollment: ['total_enrollments', 'enrollment', 'enrollments', 'total_fresh_enrollment', 'fresh_enrollment'],
  total_revenue: ['revenue', 'total_revenue', 'total_revenues', 'revenues', 'sales_revenue', 'total_sales', 'overview_revenue'],
  monthly_achievement: ['enrollment_trend', 'total_enrollment', 'total_enrollments', 'enrollments'],
  overview_revenue: ['revenue', 'total_revenue', 'total_revenues', 'revenues', 'total_sales'],
  overview_total_promo_ended: ['total_promos_ended', 'total_promo_ended', 'promos_ended', 'total_promo_ends'],
  overview_overall_conversion: ['overall_conversion', 'overall_conversion_percent', 'conversion_rate', 'overall_conversion_rate'],
  fresh_lead_google: ['lead_gen_google', 'lead_gen_google_ads', 'google_leads', 'google_fresh_leads', 'fresh_leads_google', 'lead_generation_google'],
  fresh_lead_meta: ['lead_gen_meta', 'lead_gen_facebook', 'meta_leads', 'meta_fresh_leads', 'fresh_leads_meta', 'lead_generation_meta', 'lead_gen_fb'],
  new_contacts_from_de_or_form_submissions: ['new_contacts_from_de', 'new_contacts_from_de_or_form_submissions', 'de_new_contacts', 'new_contacts_de', 'form_submissions', 'form_submission', 'new_contacts_from_de_form_submissions'],
  
  // Marketing Overview KPI Aliases
  marketing_cpa: ['cpa', 'cost_per_acquisition', 'lead_acquisition_cost', 'total_cpa', 'lead_acquisition_cost_cpa', 'cost_per_lead'],
  marketing_organic_sessions: ['organic_sessions', 'organic_session_volume', 'total_organic_sessions', 'organic_visitors', 'sessions_organic', 'total_visitors_sessions_blogs', 'count_of_blogs_published'],
  marketing_campaign_roi: ['campaign_roi', 'total_campaign_roi', 'campaign_roi_percent', 'roi', 'mkt_roi', 'marketing_roi'],
  marketing_lead_conversion_rate: ['lead_conversion_rate', 'conversion_rate', 'lead_to_mql_conversion_rate', 'lead_conv_rate'],

  // Retention Overview KPI Aliases
  ssm_head_count: ['ssm_hc', 'ssm_count', 'ssms', 'active_ssms'],
  average_customers_per_ssm: ['customers_per_ssm', 'avg_customers_ssm', 'ssm_load', 'ratio_customers_ssm'],
  total_customers_contacted: ['customers_contacted', 'percent_contacted', 'contacted_percentage', 'contact_rate'],

  // Academics Overview KPI Aliases
  active_students_overall: ['active_students', 'active_student_count', 'total_active_students', 'total_students'],
  retention_overall_pct: ['retention_rate', 'retention_percent', 'retention_pct', 'overall_retention'],
  conversion_overall_pct: ['conversion_rate', 'conversion_percent', 'overall_conversion'],
  tsr_overall: ['student_teacher_ratio', 'str_overall', 'student_to_teacher_ratio', 'tsr'],

  // Support Overview KPI Aliases
  occupancy_overall: ['occupancy', 'occupancy_percent', 'overall_occupancy', 'seat_occupancy'],
  total_escalations: ['escalations', 'escalation_count', 'total_escalation_cases', 'support_escalations'],
  refund_value: ['refunds', 'total_refunds', 'refund_amount', 'refund_val'],
  tickets_received: ['tickets', 'ticket_count', 'total_tickets', 'tickets_received_count'],

  // HR Overview KPI Aliases
  total_open_positions: ['open_positions', 'open_demands', 'total_open_demands', 'positions_open'],
  joining_count: ['joiners', 'total_joinings', 'number_of_joinings', 'joining_rate'],
  total_exists_attrition: ['exits', 'total_exits', 'attrition_count', 'employee_exits'],
  payroll_completion_percent: ['payroll_completion', 'payroll_percent', 'payroll_status', 'payroll_completion_rate']
};

export function getAliasedVal(d: any, prefix: string, period: string, col: string): any {
  if (!d) return null;
  const colNorm = normKey(col);
  const separator = period ? '_' : '';
  const searchKey = prefix + period + separator + colNorm;
  
  if (d[searchKey] !== undefined && d[searchKey] !== '' && d[searchKey] !== null) {
    return d[searchKey];
  }

  const keys = Object.keys(d);
  const targetSuffix = separator + colNorm;
  for (const k of keys) {
    if (k.startsWith(prefix + period) && k.substring(prefix.length + period.length).toLowerCase() === targetSuffix.toLowerCase()) {
      return d[k];
    }
  }

  const aliases = COLUMN_ALIASES[colNorm] || [];
  for (const alias of aliases) {
    const aliasNorm = normKey(alias);
    const aliasKey = prefix + period + separator + aliasNorm;
    if (d[aliasKey] !== undefined && d[aliasKey] !== '' && d[aliasKey] !== null) {
      return d[aliasKey];
    }
  }

  for (const k of keys) {
    if (k.startsWith(prefix + period)) {
      const remaining = k.substring(prefix.length + period.length + separator.length);
      const remainingNorm = normKey(remaining);
      if (remainingNorm === colNorm) {
        return d[k];
      }
      for (const alias of aliases) {
        if (remainingNorm === normKey(alias)) {
          return d[k];
        }
      }
    }
  }

  return null;
}

export function getWkSeries(userData: any, col: string, py: boolean): (number | null)[] {
  const d = userData || {};
  const prefix = py ? 'PY_' : '';
  return WKS.map(w => {
    const v = getAliasedVal(d, prefix, w, col);
    return v !== '' && v !== undefined && v !== null ? parseFloat(v) : null;
  });
}

export function getMoSeries(userData: any, col: string, py: boolean): (number | null)[] {
  const d = userData || {};
  const prefix = py ? 'PY_' : '';
  return MOS.map(m => {
    const v = getAliasedVal(d, prefix, m, col);
    return v !== '' && v !== undefined && v !== null ? parseFloat(v) : null;
  });
}

export function getTgtSeries(userData: any, col: string): (number | null)[] {
  const d = userData || {};
  return MOS.map(m => {
    const v = getAliasedVal(d, 'TGT_', m, col);
    return v !== '' && v !== undefined && v !== null ? parseFloat(v) : null;
  });
}

export function getWkTgtSeries(userData: any, col: string): (number | null)[] {
  const d = userData || {};
  return WKS.map(w => {
    const v = getAliasedVal(d, 'TGT_', w, col);
    return v !== '' && v !== undefined && v !== null ? parseFloat(v) : null;
  });
}

export function hasData(userData: any, col: string): boolean {
  const wk = getWkSeries(userData, col, false);
  const mo = getMoSeries(userData, col, false);
  return wk.some(v => v !== null) || mo.some(v => v !== null);
}

export function getProj(userData: any, col: string): (number | null)[] {
  const d = userData || {};
  const key = normKey(col);
  return Array.from({ length: 7 }, (_, i) => {
    const val = getAliasedVal(d, 'proj_' + i + '_', '', key);
    return val !== '' && val !== undefined && val !== null ? parseFloat(val) : null;
  });
}

export function getDetectedCols(userData: any, colKey: string): { raw: string; key: string }[] {
  const d = userData || {};
  const mapKey = '_colmap_' + normKey(colKey);
  if (d[mapKey]) {
    try {
      return JSON.parse(d[mapKey]);
    } catch {
      return [];
    }
  }
  return [];
}

export function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';
  else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('Edge') > -1) browser = 'Edge';

  if (ua.indexOf('Windows') > -1) os = 'Windows';
  else if (ua.indexOf('Macintosh') > -1) os = 'macOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iPhone') > -1) os = 'iOS';

  return `${browser} (${os})`;
}

export function generateExcelTemplate(
  subcategories: Subcategory[],
  metrics: Metric[],
  fileName: string
) {
  const cyYear = new Date().getFullYear();
  const pyYear = cyYear - 1;
  const wb = XLSX.utils.book_new();

  const usedNames = new Set<string>();

  subcategories.forEach(sub => {
    const m = metrics.find(x => x.subId === sub.id);
    const charts = m?.charts || [];
    const dataCols = charts.map(ch => ({ key: ch.col, label: ch.col, friendlyName: ch.name }));
    const tgtCols =
      dataCols.length > 1
        ? dataCols.map(dc => ({
            key: 'target_' + dc.key,
            label: 'Target_' + dc.key,
            friendlyName: 'Target (' + dc.friendlyName + ')',
          }))
        : [{ key: 'target', label: 'Target', friendlyName: 'Target' }];
    const allCols = [...dataCols, ...tgtCols];

    const aoa: any[][] = [];
    const blank = () => aoa.push([]);

    // Row 0: Subcategory and columns friendly names
    const friendlyRow = ['Subcategory: ' + sub.name];
    if (dataCols.length > 1) {
      dataCols.forEach(c => friendlyRow.push(c.friendlyName));
    }
    aoa.push(friendlyRow);
    blank(); // Row 1 blank

    // Monthly blocks
    const yearRowPY = ['Year', pyYear, ...Array(allCols.length - 1).fill(null), null];
    const yearRowCY = ['Year', cyYear, ...Array(allCols.length - 1).fill(null)];
    aoa.push([...yearRowPY, ...yearRowCY]); // Row 2

    const hdrRow = ['Month', ...allCols.map(c => c.label), null, 'Month', ...allCols.map(c => c.label)];
    aoa.push(hdrRow); // Row 3

    MOS.forEach(mo => {
      aoa.push([mo, ...Array(allCols.length).fill(null), null, mo, ...Array(allCols.length).fill(null)]);
    });

    blank();
    blank();

    // Weekly blocks
    aoa.push([...yearRowPY, ...yearRowCY]);
    aoa.push(['Week', ...allCols.map(c => c.label), null, 'Week', ...allCols.map(c => c.label)]);
    for (let w = 1; w <= 52; w++) {
      aoa.push(['W' + w, ...Array(allCols.length).fill(null), null, 'W' + w, ...Array(allCols.length).fill(null)]);
    }

    blank();
    blank();

    // Projections Block
    aoa.push(['Projections']);
    const projHdr = ['Period', ...dataCols.map(c => c.label)];
    aoa.push(projHdr);
    if (dataCols.length > 1) {
      aoa.push(['# ' + dataCols.map(c => `${c.label}="${c.friendlyName}"`).join(', ')]);
    }

    const curMoIdx = new Date().getMonth();
    const curMo = MOS[curMoIdx];
    const projLabels = [
      curMo + ' (Current)',
      ...Array.from({ length: 6 }, (_, i) => MOS[(curMoIdx + i + 1) % 12] + ' +' + (i + 1)),
    ];

    projLabels.forEach(l => {
      aoa.push([l, ...Array(dataCols.length).fill(null)]);
    });

    blank();
    aoa.push(['INSTRUCTIONS']);
    aoa.push(['• Each column header is the storage key — do not rename headers when uploading.']);
    if (dataCols.length > 1) {
      const mapping = dataCols.map(c => `${c.label} = "${c.friendlyName}"`).join(', ');
      aoa.push(['• Column mapping: ' + mapping]);
      const tgtMapping = tgtCols.map(t => `${t.label} = target for "${t.friendlyName}"`).join(', ');
      aoa.push(['• Target mapping: ' + tgtMapping]);
    }
    aoa.push(['• Fill in values for each period. Leave blank if no data for that period.']);
    aoa.push(['• Weekly: W1–W52.  Monthly: Jan–Dec.']);
    aoa.push(['• Left blocks = Previous Year (' + pyYear + ').  Right blocks = Current Year (' + cyYear + ').']);
    aoa.push(['• Projections: current month + next 6 months forecast.']);
    aoa.push(['• Upload this file in the WBR view to populate all charts automatically.']);

    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols'] = [{ wch: 14 }, ...Array(allCols.length * 2 + 2).fill({ wch: 22 })];
    
    let tabName = sub.name.replace(/[\[\]\*\?\/\:]/g, '');
    tabName = tabName.slice(0, 31).trim();
    if (usedNames.has(tabName.toLowerCase())) {
      let suffix = 2;
      let checkName = tabName;
      while (usedNames.has(checkName.toLowerCase())) {
        const suffixStr = `_${suffix}`;
        checkName = tabName.slice(0, 31 - suffixStr.length) + suffixStr;
        suffix++;
      }
      tabName = checkName;
    }
    usedNames.add(tabName.toLowerCase());

    XLSX.utils.book_append_sheet(wb, ws, tabName || 'Sub_' + sub.id.slice(0, 6));
  });

  const wbOut = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
  const buf = new ArrayBuffer(wbOut.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < wbOut.length; i++) {
    view[i] = wbOut.charCodeAt(i) & 0xff;
  }
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function detectMonthly(rows: any[][], dataStart: number, ci: number): boolean {
  for (let ri = dataStart; ri < Math.min(dataStart + 5, rows.length); ri++) {
    const v = String(rows[ri]?.[ci] || '').trim().toLowerCase();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    if (months.includes(v)) return true;
    if (v.startsWith('w') || /^\d{1,2}$/.test(v)) return false;
  }
  return true;
}

export function normalizePeriod(raw: string, isMonthly: boolean): string | null {
  if (!raw) return null;
  const v = String(raw).trim();
  if (isMonthly) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const full = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const vl = v.toLowerCase();
    const shortIdx = months.findIndex(m => vl === m.toLowerCase() || vl.startsWith(m.toLowerCase()));
    if (shortIdx >= 0) return months[shortIdx];
    const fullIdx = full.findIndex(m => vl === m || vl.startsWith(m));
    if (fullIdx >= 0) return months[fullIdx];
    return null;
  } else {
    if (/^w\d{1,2}$/i.test(v)) return 'W' + parseInt(v.substring(1));
    if (/^\d{1,2}$/.test(v)) {
      const n = parseInt(v);
      if (n >= 1 && n <= 52) return 'W' + n;
    }
    return null;
  }
}
