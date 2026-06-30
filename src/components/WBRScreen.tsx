import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileDown,
  Upload,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileCheck,
  FileX,
  Target,
  Plus,
  X,
  Sparkles,
  HelpCircle,
  BarChart4,
} from 'lucide-react';
import { AppConfig, UploadedDataState, SubNotes, Metric } from '../types';
import {
  WKS,
  MOS,
  normKey,
  numFmt,
  pctChg,
  fmtPct,
  pctBadgeCls,
  achCls,
  getISOWeek,
  getWeekDateRange,
  getWkSeries,
  getMoSeries,
  getTgtSeries,
  getWkTgtSeries,
  getProj,
  hasData,
  generateExcelTemplate,
  getAliasedVal,
} from '../utils';

// Import recharts fully
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';

interface WBRScreenProps {
  config: AppConfig;
  userData: UploadedDataState;
  notes: SubNotes;
  deptId: string;
  user: any;
  isConfigUnlocked: boolean;
  onUpdateNotes: (subId: string, notesObj: { inf?: any[]; ini?: any[] }) => void;
  onUpdateConfigNotes: (deptId: string, sections: any[]) => void;
  onStepWeek: (dir: number) => void;
  onSelectWeek: (w: number) => void;
  onUploadExcel: (deptId: string, file: File) => void;
  onClearData: (deptId: string) => void;
}

export default function WBRScreen({
  config,
  userData,
  notes,
  deptId,
  user,
  isConfigUnlocked,
  onUpdateNotes,
  onUpdateConfigNotes,
  onStepWeek,
  onSelectWeek,
  onUploadExcel,
  onClearData,
}: WBRScreenProps) {
  const dept = config.departments.find((d) => d.id === deptId);
  const udata = userData[deptId] || {};

  // Active Category (Summary always first, followed by others sorted by order)
  const categories = config.categories
    .filter((c) => c.deptId === deptId)
    .sort((a, b) => a.order - b.order);

  const [activeCatId, setActiveCatId] = useState<string>(categories[0]?.id || '');
  const activeCat = categories.find((c) => c.id === activeCatId);
  const isSummaryActive =
    activeCat?.name === 'Summary' ||
    activeCatId === 'c-sum' ||
    activeCatId === 'c-sum-ret' ||
    activeCat?.name.toLowerCase() === 'summary';

  // Subcategories under active category
  const subcategories = config.subcategories
    .filter((s) => s.catId === activeCatId)
    .sort((a, b) => a.order - b.order);

  const [activeSubId, setActiveSubId] = useState<string>(subcategories[0]?.id || '');

  // Reset active subcategory when category changes
  React.useEffect(() => {
    if (subcategories.length > 0) {
      setActiveSubId(subcategories[0].id);
    } else {
      setActiveSubId('');
    }
  }, [activeCatId]);

  // Excel mapping UI panel open or closed
  const [showMappingPanel, setShowMappingPanel] = useState(false);

  // Download Excel template helper
  const handleDownloadTemplate = () => {
    const deptFileName = (dept?.name || 'Department').replace(/[^a-zA-Z0-9]/g, '_') + '_WBR_Template.xlsx';
    // Get all subcategories for this department
    const deptCats = config.categories.filter((c) => c.deptId === deptId);
    const deptSubs = config.subcategories
      .filter((s) => deptCats.some((c) => c.id === s.catId))
      .sort((a, b) => a.order - b.order);

    generateExcelTemplate(deptSubs, config.metrics, deptFileName);
  };

  // Submission count calculation
  const getSubmitsCount = () => {
    const deptCats = config.categories.filter((c) => c.deptId === deptId);
    const deptSubs = config.subcategories.filter((s) => deptCats.some((c) => c.id === s.catId));
    const deptMets = config.metrics.filter((m) => deptSubs.some((s) => s.id === m.subId));

    let total = 0;
    let submitted = 0;

    deptMets.forEach((m) => {
      (m.charts || []).forEach((ch) => {
        total++;
        if (hasData(udata, ch.col)) {
          submitted++;
        }
      });
    });

    return { submitted, total };
  };

  const { submitted: dSub, total: dTot } = getSubmitsCount();
  const currentWeekRange = getWeekDateRange(config.currentWeek);

  return (
    <div className="space-y-6 font-sans">
      {/* Upper Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight">
            {dept?.name || 'Department'} WBR
          </h2>
        </div>

        {/* Date / Week Browser controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] p-1 rounded-xl">
            <button
              onClick={() => onStepWeek(-1)}
              className="p-1.5 bg-white hover:bg-slate-100 rounded-lg border border-[#e2e8f0] shadow-2xs hover:text-blue-600 transition"
              title="Previous target week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center min-w-[100px] px-2 text-center">
              <select
                value={config.currentWeek}
                onChange={(e) => onSelectWeek(parseInt(e.target.value))}
                className="text-xs font-mono font-bold text-[#0f172a] bg-transparent outline-none cursor-pointer border-none p-0 focus:ring-0"
              >
                {Array.from({ length: 52 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Week {w}
                  </option>
                ))}
              </select>
              <span className="text-[9px] font-mono font-bold text-[#64748b] whitespace-nowrap mt-0.5">
                {currentWeekRange}
              </span>
            </div>
            <button
              onClick={() => onStepWeek(1)}
              className="p-1.5 bg-white hover:bg-slate-100 rounded-lg border border-[#e2e8f0] shadow-2xs hover:text-blue-600 transition"
              title="Next target week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e2e8f0] hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-[#334155] cursor-pointer shadow-xs transition"
          >
            <FileDown className="w-4 h-4 text-[#64748b]" />
            <span className="hidden xs:inline">Excel Template</span>
          </button>

          <button
            onClick={() => setShowMappingPanel(!showMappingPanel)}
            className="px-3 py-2 bg-slate-50 border border-[#e2e8f0] rounded-xl text-xs font-semibold text-[#64748b] hover:bg-slate-100 transition"
          >
            Sheets Map
          </button>
        </div>
      </div>

      {/* Sheet mapping helper panel overlay style */}
      {showMappingPanel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f8fafc] border border-blue-200 bg-blue-50/20 rounded-2xl p-5 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#cbd5e1]/40 pb-2.5">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-[#0f172a]">Excel Sheet mapping diagnostics</h3>
            </div>
            <button
              onClick={() => setShowMappingPanel(false)}
              className="text-[#64748b] hover:text-[#0f172a] p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-[#334155] leading-relaxed space-y-2">
            <p>
              Your WBI platform auto-discovers tabs in the uploaded workbook matching the target subcategory names. Check mapped targets of your current active sheets below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2">
              {config.metrics
                .filter((m) => {
                  const s = config.subcategories.find((sc) => sc.id === m.subId);
                  if (!s) return false;
                  const c = config.categories.find((cat) => cat.id === s.catId);
                  return c?.deptId === deptId;
                })
                .map((m) => {
                  const s = config.subcategories.find((sc) => sc.id === m.subId)!;
                  const sheetsPresent = true; // diag indicator
                  return (
                    <div
                      key={m.id}
                      className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl flex items-center justify-between shadow-xs"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0f172a] truncate">{s.name}</div>
                        <div className="text-[10px] text-[#64748b] font-mono truncate mt-0.5">
                          Mapped Tab: "{m.sheetName}"
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-blue-50 border border-blue-200 text-blue-600 rounded-full px-2 py-0.5">
                        {m.charts.length} charts
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="border-t border-[#cbd5e1]/40 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 gap-y-2">
            <div className="text-[10px] text-[#64748b] font-mono">
              Pro-Tip: Ensure subcategory names correspond identically to Excel tab names.
            </div>
            <button
              onClick={() => {
                if (confirm('Clear all uploaded data records for this department? You will need to re-upload.')) {
                  onClearData(deptId);
                  setShowMappingPanel(false);
                }
              }}
              className="text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition shrink-0"
            >
              🗑 Clear Department Data
            </button>
          </div>
        </motion.div>
      )}

      {/* Category Tabs (.mtabs) */}
      <div className="border-b border-[#e2e8f0] pb-2 flex flex-wrap items-center gap-1">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setActiveCatId(cat.id)}
            className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider select-none flex items-center gap-1 focus:outline-none transition rounded-xl border ${
              activeCatId === cat.id
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-2xs'
                : 'bg-transparent border-transparent text-[#64748b] hover:bg-slate-50 hover:text-[#334155]'
            }`}
          >
            <span className="font-mono text-[9px] font-bold text-[#94a3b8] bg-slate-100 px-1 rounded-sm">
              {idx + 1}
            </span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Render Pages */}
      {isSummaryActive ? (
        <SummaryPage
          deptId={deptId}
          config={config}
          udata={udata}
          user={user}
          isConfigUnlocked={isConfigUnlocked}
          onUpdateConfigNotes={onUpdateConfigNotes}
        />
      ) : (
        <div className="space-y-6">
          {/* Subcategory subtabs row (.stabs) */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-1 shrink-0 flex flex-wrap gap-1">
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold select-none transition ${
                  activeSubId === sub.id
                    ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                    : 'text-[#64748b] hover:text-[#334155]'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Subpage Viewport */}
          {activeSubId && (
            <SubcategoryPage
              deptId={deptId}
              config={config}
              subId={activeSubId}
              udata={udata}
              notes={notes}
              user={user}
              isConfigUnlocked={isConfigUnlocked}
              onUpdateNotes={onUpdateNotes}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════ SUMMARY PAGE ════════════════ */
interface SummaryPageProps {
  deptId: string;
  config: AppConfig;
  udata: Record<string, any>;
  user: any;
  isConfigUnlocked: boolean;
  onUpdateConfigNotes: (deptId: string, sections: any[]) => void;
}

function SummaryPage({ deptId, config, udata, user, isConfigUnlocked, onUpdateConfigNotes }: SummaryPageProps) {
  // Collect all metrics of this department
  const deptCats = config.categories.filter((c) => c.deptId === deptId);
  const deptSubs = config.subcategories.filter((s) => deptCats.some((c) => c.id === s.catId));
  const deptMets = config.metrics.filter((m) => deptSubs.some((s) => s.id === m.subId));

  // Filter ONLY charts where ch.kpi === true
  const kpiCharts: { ch: any; metric: Metric }[] = [];
  deptMets.forEach((m) => {
    (m.charts || []).forEach((ch) => {
      if (ch.kpi) {
        kpiCharts.push({ ch, metric: m });
      }
    });
  });

  // Leadership Notes
  const sections = config.leadershipNotes[deptId] || [];

  const canModifyNote = (noteAuthor: string) => {
    if (isConfigUnlocked) return true;
    if (!noteAuthor) return true;
    return user && user.email === noteAuthor;
  };

  const handleUpdateSectionTitle = (index: number, val: string) => {
    if (!isConfigUnlocked) {
      alert("Only an administrator can rename highlight section headers.");
      return;
    }
    const updated = [...sections];
    updated[index].title = val;
    onUpdateConfigNotes(deptId, updated);
  };

  const handleAddSection = () => {
    const newSection = {
      id: 'sec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: 'New Highlight Section',
      notes: [{
        text: 'Draft note bullet point — click to type details.',
        author: user?.email || '',
      }],
    };
    onUpdateConfigNotes(deptId, [...sections, newSection]);
  };

  const handleDeleteSection = (index: number) => {
    if (!isConfigUnlocked) {
      alert("Only an administrator can delete highlight section headers.");
      return;
    }
    if (confirm('Delete this highlight section and its bullets?')) {
      const updated = sections.filter((_, i) => i !== index);
      onUpdateConfigNotes(deptId, updated);
    }
  };

  const handleUpdateNote = (sectionIndex: number, noteIndex: number, val: string) => {
    const updated = [...sections];
    const currentNote = updated[sectionIndex].notes[noteIndex];
    const existingAuthor = typeof currentNote === 'object' && currentNote !== null ? currentNote.author : '';
    if (!canModifyNote(existingAuthor)) return;

    updated[sectionIndex].notes[noteIndex] = {
      text: val,
      author: existingAuthor || user?.email || '',
    };
    onUpdateConfigNotes(deptId, updated);
  };

  const handleAddNote = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].notes.push({
      text: 'New operational note bullet — click to edit.',
      author: user?.email || '',
    });
    onUpdateConfigNotes(deptId, updated);
  };

  const handleDeleteNote = (sectionIndex: number, noteIndex: number) => {
    const currentNote = sections[sectionIndex].notes[noteIndex];
    const existingAuthor = typeof currentNote === 'object' && currentNote !== null ? currentNote.author : '';
    if (!canModifyNote(existingAuthor)) {
      alert("You cannot delete this item as you are not the author or an admin!");
      return;
    }

    const updated = [...sections];
    updated[sectionIndex].notes = updated[sectionIndex].notes.filter((_, i) => i !== noteIndex);
    onUpdateConfigNotes(deptId, updated);
  };

  return (
    <div className="space-y-8">
      {/* PART 1 — KPI PERFORMANCE GRID */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-4 h-4 text-[#64748b]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#64748b]">
            PART 1 — KPI PERFORMANCE
          </h3>
          <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
        </div>

        {kpiCharts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCharts.map(({ ch, metric }) => {
              const col = ch.col;

              // Pull values based on target overridden currentWeek
              const wkCY = getWkSeries(udata, col, false);
              const cwIdx = config.currentWeek - 1;
              const value = wkCY[cwIdx] !== undefined && wkCY[cwIdx] !== null ? wkCY[cwIdx] : null;

              // Previous week
              const prevValue = cwIdx > 0 && wkCY[cwIdx - 1] !== undefined && wkCY[cwIdx - 1] !== null ? wkCY[cwIdx - 1] : null;

              const wow = pctChg(value, prevValue);

              // Target lookup
              const targets = getTgtSeries(udata, col);
              const wkTgtVal = getAliasedVal(udata, 'TGT_W' + config.currentWeek, '', col);
              const tgtLatestVal = getAliasedVal(udata, 'tgt_latest_', '', col);
              const currentMonthIndex = new Date().getMonth();
              const tgtValue = (wkTgtVal !== undefined && wkTgtVal !== '' && wkTgtVal !== null)
                ? parseFloat(wkTgtVal)
                : (tgtLatestVal !== undefined && tgtLatestVal !== '' && tgtLatestVal !== null
                  ? parseFloat(tgtLatestVal)
                  : (targets[currentMonthIndex] !== undefined && targets[currentMonthIndex] !== null ? targets[currentMonthIndex] : null));

              const ach = value !== null && tgtValue ? Math.round((value / tgtValue) * 100) : 0;
              const borderCls = value !== null && tgtValue ? achCls(ach) : 'border-l-slate-300';

              return (
                <div
                  key={ch.id}
                  className={`bg-white border border-[#e2e8f0] border-l-4 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[140px] ${borderCls}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#64748b] font-mono truncate max-w-[150px]">
                        {ch.name}
                      </div>
                      <div className="text-[10px] text-[#94a3b8] font-medium leading-none mt-0.5">
                        {metric.sheetName}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono leading-none bg-blue-50 border border-blue-100 text-blue-600 rounded-lg px-2 py-1 font-bold shrink-0">
                      W{config.currentWeek}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-[28px] font-black font-mono text-[#0f172a] tracking-tight">
                      {numFmt(value)}
                    </span>
                    {wow !== null && (
                      <span className={`text-[10px] font-mono font-bold rounded-full px-2 py-0.5 ${pctBadgeCls(wow)}`}>
                        {fmtPct(wow)} WoW
                      </span>
                    )}
                  </div>

                  <div className="border-t border-[#e2e8f0] pt-2.5 mt-2 flex items-center justify-between text-xs text-[#64748b]">
                    <span>Target: <strong className="font-mono text-[#475569]">{numFmt(tgtValue)}</strong></span>
                    {tgtValue && value !== null ? (
                      <span className="font-semibold text-blue-600 font-mono">{ach}% achieved</span>
                    ) : (
                      <span className="text-[10px] italic text-[#94a3b8]">No target set</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#f8fafc] border border-dashed border-[#e2e8f0] rounded-2xl p-8 text-center text-xs text-[#64748b]">
            <AlertCircle className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
            <p className="font-semibold text-[#334155]">No KPI Performance metrics configured</p>
            <p className="mt-1">
              Go to the <strong className="text-blue-600">Config → Structure</strong> tree view and check the ⭐ KPI box on individual subcategory charts to populate this dashboard view.
            </p>
          </div>
        )}
      </div>

      {/* PART 2 — KPI CHARTS & TRENDS */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-4 h-4 text-[#64748b]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#64748b]">
            PART 2 — KPI CHARTS & TRENDS
          </h3>
          <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
        </div>

        {kpiCharts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {kpiCharts.map(({ ch, metric }) => (
              <WbrChartCard key={ch.id} ch={ch} metric={metric} deptId={deptId} udata={udata} config={config} />
            ))}
          </div>
        ) : (
          <div className="bg-[#f8fafc] border border-dashed border-[#e2e8f0] rounded-2xl p-6 text-center text-xs text-[#94a3b8]">
            Trend graphs appear here after ticking charts or uploading mapped spreadsheets.
          </div>
        )}
      </div>

      {/* PART 3 — LEADERSHIP NOTES & INSIGHTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#64748b]">
            PART 3 — LEADERSHIP NOTES & INSIGHTS
          </h3>
          <button
            onClick={handleAddSection}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 shadow-3xs flex items-center gap-1 transition shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Header</span>
          </button>
          <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
        </div>

        <div className="space-y-6">
          {sections.map((sec, secIdx) => (
            <div
              key={sec.id || secIdx}
              className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Note Section Header */}
              <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-5 py-3 flex items-center justify-between">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleUpdateSectionTitle(secIdx, e.target.value)}
                  className="bg-transparent font-bold text-sm text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-blue-600 px-1 py-0.5 rounded-md min-w-[200px]"
                />
                <button
                  onClick={() => handleDeleteSection(secIdx)}
                  className="text-[#94a3b8] hover:text-rose-600 p-1 rounded-lg"
                  title="Remove highlights section"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Note Section Bullets */}
              <div className="p-5 space-y-3">
                <ul className="space-y-2.5">
                  {sec.notes.map((note, noteIdx) => {
                    const noteText = typeof note === 'object' && note !== null ? note.text : note;
                    const noteAuthor = typeof note === 'object' && note !== null ? note.author : '';
                    const editable = canModifyNote(noteAuthor);

                    return (
                      <li
                        key={noteIdx}
                        className={`border-l-2 border-blue-500 bg-blue-50/15 p-2.5 pl-3 rounded-r-xl flex items-start gap-2.5 transition-all ${
                          !editable ? 'opacity-85 bg-slate-50/50 border-l-slate-400' : ''
                        }`}
                      >
                        <div className="flex-1">
                          <textarea
                            rows={1}
                            value={noteText}
                            onChange={(e) => handleUpdateNote(secIdx, noteIdx, e.target.value)}
                            readOnly={!editable}
                            placeholder="Write bullet comment..."
                            className={`w-full bg-transparent text-xs text-[#334155] leading-relaxed resize-none focus:outline-none rounded ${
                              editable ? 'focus:ring-1 focus:ring-blue-600' : 'cursor-not-allowed select-none text-slate-500'
                            }`}
                            style={{ height: 'auto' }}
                          />
                          {noteAuthor && (
                            <span className="text-[9px] font-medium text-slate-400 block mt-0.5 select-none">
                              by {noteAuthor} {noteAuthor === user?.email ? '(You)' : ''} {!editable ? '🔒 locked' : ''}
                            </span>
                          )}
                        </div>
                        {editable && (
                          <button
                            onClick={() => handleDeleteNote(secIdx, noteIdx)}
                            className="text-[#94a3b8] hover:text-rose-600 self-center shrink-0 p-0.5 rounded-full"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handleAddNote(secIdx)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-[#64748b] transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add operational bullet</span>
                </button>
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-6 text-xs text-[#64748b]">
              Click "Add Header" above to write high-level executive highlight summaries.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════ CHART CARD INTEGRATION ════════════════ */
interface ChartCardProps {
  key?: any;
  ch: any;
  metric: Metric;
  deptId: string;
  udata: Record<string, any>;
  config: AppConfig;
}

function WbrChartCard({ ch, metric, deptId, udata, config }: ChartCardProps) {
  const col = ch.col;
  const hasUploaded = hasData(udata, col);

  // Extract data series
  const wkCY = getWkSeries(udata, col, false);
  const wkPY = getWkSeries(udata, col, true);
  const moCY = getMoSeries(udata, col, false);
  const moPY = getMoSeries(udata, col, true);
  const tgt = getTgtSeries(udata, col);
  const wkTgt = getWkTgtSeries(udata, col);

  // Check percentage mapping
  const isPercent = !!getAliasedVal(udata, '_ispct_', '', col) || col.toLowerCase().includes('percent') || col.toLowerCase().includes('rate') || (ch.name && (ch.name.includes('%') || ch.name.toLowerCase().includes('rate') || ch.name.toLowerCase().includes('percent') || ch.name.toLowerCase().includes('deviation')));

  // Rolling 6 weeks index lookup based on currently configured Week
  const targetWeekIdx = config.currentWeek - 1;

  // Let's find the last week that has data in the system (up to current target week)
  let lastDataWk = targetWeekIdx;
  for (let i = targetWeekIdx; i >= 0; i--) {
    if (wkCY[i] !== null && wkCY[i] !== undefined) {
      lastDataWk = i;
      break;
    }
  }

  const startWk = Math.max(0, lastDataWk - 5);
  const rollingWeeksLabels = WKS.slice(startWk, lastDataWk + 1);
  const wkCY_6 = wkCY.slice(startWk, lastDataWk + 1);
  const wkPY_6 = wkPY.slice(startWk, lastDataWk + 1);
  const wkTgt_6 = wkTgt.slice(startWk, lastDataWk + 1);

  // Rolling 12 months index lookup
  const lastCYMo = moCY.map((v, idx) => (v !== null ? idx : -1)).filter((idx) => idx >= 0);
  const lastPYMo = moPY.map((v, idx) => (v !== null ? idx : -1)).filter((idx) => idx >= 0);
  const maxMoIndex = Math.max(
    lastCYMo.length > 0 ? lastCYMo[lastCYMo.length - 1] : 11,
    lastPYMo.length > 0 ? lastPYMo[lastPYMo.length - 1] : 11
  );

  const startMo = Math.max(0, maxMoIndex - 11);
  const rollingMonthsLabels = MOS.slice(startMo, startMo + 12);
  const moCY_12 = moCY.slice(startMo, startMo + 12);
  const moPY_12 = moPY.slice(startMo, startMo + 12);
  const tgt_12 = tgt.slice(startMo, startMo + 12);

  // Prepare unified recharts combined data list
  const combinedData: any[] = [];

  // 1. Rolling 6 weeks data points
  rollingWeeksLabels.forEach((label, idx) => {
    combinedData.push({
      name: label,
      currentWk: wkCY_6[idx],
      previousWk: wkPY_6[idx],
      targetWkVal: wkTgt_6[idx],
      currentMo: null,
      previousMo: null,
      targetVal: null,
    });
  });

  // 2. Empty spacer point to buffer the dual timeline visual
  combinedData.push({
    name: ' ',
    currentWk: null,
    previousWk: null,
    targetWkVal: null,
    currentMo: null,
    previousMo: null,
    targetVal: null,
  });

  // 3. Rolling 12 months data points
  rollingMonthsLabels.forEach((label, idx) => {
    combinedData.push({
      name: label,
      currentWk: null,
      previousWk: null,
      targetWkVal: null,
      currentMo: moCY_12[idx],
      previousMo: moPY_12[idx],
      targetVal: tgt_12[idx],
    });
  });

  // Dual yAxes boundary logic — targets are excluded from domain calculation to prevent
  // large outlier targets (e.g. annual targets vs weekly actuals) from compressing actual data
  // to an invisible flat line at the bottom of the chart.
  const wk6DataVals = [...wkCY_6, ...wkPY_6].filter((v) => v !== null) as number[];
  const mo12DataVals = [...moCY_12, ...moPY_12].filter((v) => v !== null) as number[];

  // Monthly domain: driven by actual CY/PY data; targets included only if within 2× data max
  const moDataMin = mo12DataVals.length ? Math.min(...mo12DataVals) : 0;
  const moDataMax = mo12DataVals.length ? Math.max(...mo12DataVals) : 100;
  const moTgtFiltered = tgt_12.filter((v) => v !== null && v <= moDataMax * 2) as number[];
  const moEffMax = moTgtFiltered.length ? Math.max(moDataMax, ...moTgtFiltered) : moDataMax;
  const moDataRange = moEffMax - moDataMin || moEffMax * 0.5 || 10;
  const moPad = moDataRange * 0.2;
  const moMin = Math.max(0, moDataMin - moPad);
  const moMax = moEffMax + moPad;

  // Weekly domain: auto-proportionally aligned to monthly so both series appear at the same visual height
  const wkDataMin = wk6DataVals.length ? Math.min(...wk6DataVals) : 0;
  const wkDataMax = wk6DataVals.length ? Math.max(...wk6DataVals) : 100;
  const wkTgtFiltered = wkTgt_6.filter((v) => v !== null && v <= wkDataMax * 2) as number[];
  const wkEffMax = wkTgtFiltered.length ? Math.max(wkDataMax, ...wkTgtFiltered) : wkDataMax;

  // Scale ratio ensures weekly midpoint lands at the same chart-height fraction as monthly midpoint
  const moMid = mo12DataVals.length ? (moDataMin + moDataMax) / 2 : 1;
  const wkMid = wk6DataVals.length ? (wkDataMin + wkDataMax) / 2 : 1;
  const scaleRatio = moMid > 0 ? wkMid / moMid : 1;

  const wkPropoMin = moMin * scaleRatio;
  const wkPropoMax = moMax * scaleRatio;

  // Expand to cover all actual weekly data + reasonable weekly targets
  const wkDataRange = wkEffMax - wkDataMin || wkEffMax * 0.5 || 10;
  const wkPad = wkDataRange * 0.2;
  const wkMin = Math.min(wkPropoMin, Math.max(0, wkDataMin - wkPad));
  const wkMax = Math.max(wkPropoMax, wkEffMax + wkPad);

  // Custom TargetDot component representing triangle
  const TargetDotCustom = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || payload.targetVal === null || payload.targetVal === undefined) return null;
    return (
      <svg x={cx - 5} y={cy - 5} width={10} height={10} viewBox="0 0 10 10" className="overflow-visible">
        <polygon points="5,1 9,9 1,9" fill="#16a34a" />
      </svg>
    );
  };

  // Custom TargetDot component representing triangle for weekly targets (left axis)
  const TargetDotCustomLeft = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || payload.targetWkVal === null || payload.targetWkVal === undefined) return null;
    return (
      <svg x={cx - 5} y={cy - 5} width={10} height={10} viewBox="0 0 10 10" className="overflow-visible">
        <polygon points="5,1 9,9 1,9" fill="#16a34a" />
      </svg>
    );
  };

  // WOW | MTD | MOM | YOY calculations
  const calculateFooterStats = () => {
    // Current week val
    const curWkValue = wkCY[lastDataWk];
    const prevWkValue = lastDataWk > 0 ? wkCY[lastDataWk - 1] : null;
    const pyWkValue = wkPY[lastDataWk];

    const wowPct = pctChg(curWkValue, prevWkValue);

    // MTD: slide sum of last 4 weeks of current week
    const last4WkCY = wkCY.slice(Math.max(0, lastDataWk - 3), lastDataWk + 1).filter((v) => v !== null);
    const last4WkPY = wkPY.slice(Math.max(0, lastDataWk - 3), lastDataWk + 1).filter((v) => v !== null);
    const mtdSum = last4WkCY.reduce((s, v) => s + v, 0);
    const mtdPySum = last4WkPY.reduce((s, v) => s + v, 0);
    const mtdYoy = pctChg(mtdSum, mtdPySum);

    // MOM: current month vs previous month from monthly CY series
    const monCY = moCY[maxMoIndex];
    const monPY = moPY[maxMoIndex];
    const monPrev = maxMoIndex > 0 ? moCY[maxMoIndex - 1] : null;

    const momPct = pctChg(monCY, monPrev);
    const yoyPct = pctChg(monCY, monPY);

    return {
      curWkValue,
      wowPct,
      mtdSum,
      mtdYoy,
      momPct,
      yoyPct,
    };
  };

  const { curWkValue, wowPct, mtdSum, mtdYoy, momPct, yoyPct } = calculateFooterStats();

  const formattedStat = (val: number | null, isPctField = false) => {
    if (val === null) return '—';
    if (isPctField) return val.toFixed(1) + '%';
    return numFmt(val);
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
      {/* Header bar */}
      <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs font-bold text-[#0f172a]">{ch.name}</span>
        {ch.kpi && <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">⭐ KPI</span>}
      </div>

      {/* Legend identifiers */}
      <div className="bg-[#f8fafc]/50 px-4 py-1.5 border-b border-[#e2e8f0] flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-bold text-[#64748b] font-mono uppercase">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-blue-600 inline-block"></span>
          <span>CY Weekly</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-3 h-0.5 bg-blue-400 border-dashed border-t inline-block"></span>
          <span>PY Weekly</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-700">
          <span className="w-3 h-0.5 bg-[#0891b2] inline-block"></span>
          <span>CY Monthly</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-700 opacity-60">
          <span className="w-3 h-0.5 bg-[#0891b2] border-dashed border-t inline-block"></span>
          <span>PY Monthly</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-600">
          <svg width={8} height={8} className="overflow-visible inline-block">
            <polygon points="4,0 8,8 0,8" fill="#16a34a" />
          </svg>
          <span>Target</span>
        </div>
      </div>

      {/* Chart render boundary */}
      <div className="p-4 flex-1 flex flex-col justify-center min-h-[240px]">
        {hasUploaded ? (
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={combinedData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  fontSize={9}
                  tickMargin={5}
                  stroke="#94a3b8"
                  fontFamily="Plus Jakarta Sans"
                  fontWeight={500}
                />
                {/* Left YAxis - Weekly scale in Blue */}
                <YAxis
                  yAxisId="yLeft"
                  domain={[wkMin, wkMax]}
                  stroke="#2563eb"
                  fontSize={9}
                  tickFormatter={(val) => numFmt(val)}
                  width={40}
                />
                {/* Right YAxis - Monthly scale in Cyan */}
                <YAxis
                  yAxisId="yRight"
                  orientation="right"
                  domain={[moMin, moMax]}
                  stroke="#0891b2"
                  fontSize={9}
                  tickFormatter={(val) => numFmt(val)}
                  width={40}
                />
                <Tooltip
                  filterNull={true}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  itemStyle={{ padding: '2px 0' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                  formatter={(val: any, name: any) => {
                    const formatted = isPercent
                      ? parseFloat(val).toFixed(1) + '%'
                      : parseFloat(val).toLocaleString();
                    return [formatted, name];
                  }}
                />

                {/* CY Weekly Line */}
                <Line
                  yAxisId="yLeft"
                  name="Current Weekly"
                  type="monotone"
                  dataKey="currentWk"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#2563eb', strokeWidth: 1 }}
                  connectNulls={false}
                >
                  <LabelList
                    dataKey="currentWk"
                    position="top"
                    offset={10}
                    style={{ fontSize: 9, fill: '#1e40af', fontWeight: 'bold', fontFamily: 'monospace' }}
                    formatter={(val: any) => {
                      if (val === null || val === undefined) return '';
                      return isPercent ? val.toFixed(1) + '%' : numFmt(val);
                    }}
                  />
                </Line>
                {/* PY Weekly Line */}
                <Line
                  yAxisId="yLeft"
                  name="Previous Weekly"
                  type="monotone"
                  dataKey="previousWk"
                  stroke="#2563eb"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  opacity={0.5}
                  dot={{ r: 2 }}
                  connectNulls={false}
                />

                {/* Weekly Target Dot */}
                <Line
                  yAxisId="yLeft"
                  name="Weekly Target"
                  type="monotone"
                  dataKey="targetWkVal"
                  stroke="none"
                  dot={<TargetDotCustomLeft />}
                  connectNulls={true}
                />

                {/* CY Monthly Line */}
                <Line
                  yAxisId="yRight"
                  name="Current Monthly"
                  type="monotone"
                  dataKey="currentMo"
                  stroke="#0891b2"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0891b2', strokeWidth: 1 }}
                  connectNulls={true}
                >
                  <LabelList
                    dataKey="currentMo"
                    position="top"
                    offset={10}
                    style={{ fontSize: 9, fill: '#0e7490', fontWeight: 'bold', fontFamily: 'monospace' }}
                    formatter={(val: any) => {
                      if (val === null || val === undefined) return '';
                      return isPercent ? val.toFixed(1) + '%' : numFmt(val);
                    }}
                  />
                </Line>
                {/* PY Monthly Line */}
                <Line
                  yAxisId="yRight"
                  name="Previous Monthly"
                  type="monotone"
                  dataKey="previousMo"
                  stroke="#0891b2"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  opacity={0.5}
                  dot={{ r: 2 }}
                  connectNulls={true}
                />

                {/* Targets Series Dot */}
                <Line
                  yAxisId="yRight"
                  name="Target"
                  type="monotone"
                  dataKey="targetVal"
                  stroke="none"
                  dot={<TargetDotCustom />}
                  connectNulls={true}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-10 flex flex-col items-center gap-2">
            <BarChart4 className="w-8 h-8 text-[#cbd5e1]" />
            <span className="text-xs font-semibold text-[#64748b]">Awaiting uploaded data</span>
            <span className="text-[10px] bg-slate-50 border border-[#e2e8f0] rounded-md font-mono px-2 py-0.5 text-[#334155] select-all">
              Key: {col}
            </span>
          </div>
        )}
      </div>

      {/* Footer statistics (WOW | MTD | MOM | YOY%) */}
      <div className="grid grid-cols-4 border-t border-[#e2e8f0] bg-[#f8fafc]/40 font-mono text-[10px] text-center divide-x divide-[#e2e8f0]">
        <div className="p-2.5">
          <div className="text-[#64748b] select-none text-[8px] uppercase tracking-wider font-sans font-bold">
            WOW%
          </div>
          <div className={`text-xs font-bold font-mono mt-0.5 ${wowPct !== null && wowPct >= 0 ? 'text-emerald-600' : wowPct !== null ? 'text-rose-600' : 'text-[#64748b]'}`}>
            {wowPct !== null ? (wowPct >= 0 ? '+' : '') + wowPct.toFixed(1) + '%' : '—'}
          </div>
        </div>
        <div className="p-2.5">
          <div className="text-[#64748b] select-none text-[8px] uppercase tracking-wider font-sans font-bold">
            MTD (Rolling 4W)
          </div>
          <div className="text-[#334155] font-bold font-mono mt-0.5 select-all text-xs flex items-center justify-center gap-1 flex-wrap">
            <span>{formattedStat(mtdSum, isPercent)}</span>
            {mtdYoy !== null && (
              <span className={`text-[8px] px-1 rounded-sm ${mtdYoy >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {mtdYoy >= 0 ? '▲' : '▼'}{Math.abs(mtdYoy).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
        <div className="p-2.5">
          <div className="text-[#64748b] select-none text-[8px] uppercase tracking-wider font-sans font-bold">
            MOM%
          </div>
          <div className={`text-xs font-bold font-mono mt-0.5 ${momPct !== null && momPct >= 0 ? 'text-emerald-600' : momPct !== null ? 'text-rose-600' : 'text-[#64748b]'}`}>
            {momPct !== null ? (momPct >= 0 ? '+' : '') + momPct.toFixed(1) + '%' : '—'}
          </div>
        </div>
        <div className="p-2.5">
          <div className="text-[#64748b] select-none text-[8px] uppercase tracking-wider font-sans font-bold">
            YOY% (Monthly)
          </div>
          <div className={`text-xs font-bold font-mono mt-0.5 ${yoyPct !== null && yoyPct >= 0 ? 'text-emerald-600' : yoyPct !== null ? 'text-rose-600' : 'text-[#64748b]'}`}>
            {yoyPct !== null ? (yoyPct >= 0 ? '+' : '') + yoyPct.toFixed(1) + '%' : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ NOTE ITEM (isolated local state to prevent re-render on every keystroke) ════════════════ */
interface NoteItemProps {
  noteText: string;
  noteAuthor: string;
  editable: boolean;
  user: any;
  borderClass: string;
  bgClass: string;
  onUpdate: (val: string) => void;
  onDelete: () => void;
  autoFocus?: boolean;
}

function NoteItem({ noteText, noteAuthor, editable, user, borderClass, bgClass, onUpdate, onDelete, autoFocus }: NoteItemProps) {
  const [localText, setLocalText] = React.useState(noteText);
  const isFocusedRef = React.useRef(false);

  React.useEffect(() => {
    if (!isFocusedRef.current) {
      setLocalText(noteText);
    }
  }, [noteText]);

  return (
    <div
      className={`border-l-2 ${borderClass} ${bgClass} p-2 rounded-r-lg flex items-start justify-between gap-1 transition-all ${
        !editable ? 'opacity-85 bg-slate-50/50 border-l-slate-400' : ''
      }`}
    >
      <div className="flex-1">
        <textarea
          rows={1}
          value={localText}
          autoFocus={autoFocus}
          onChange={(e) => setLocalText(e.target.value)}
          onFocus={() => { isFocusedRef.current = true; }}
          onBlur={() => {
            isFocusedRef.current = false;
            if (localText !== noteText) onUpdate(localText);
          }}
          readOnly={!editable}
          className={`w-full bg-transparent border-none p-0 focus:ring-0 text-xs text-[#334155] resize-none leading-relaxed focus:outline-none ${
            editable ? '' : 'cursor-not-allowed select-none text-slate-500'
          }`}
        />
        {noteAuthor && (
          <span className="text-[9px] font-medium text-slate-400 block mt-0.5 select-none font-sans">
            by {noteAuthor} {noteAuthor === user?.email ? '(You)' : ''} {!editable ? '🔒 locked' : ''}
          </span>
        )}
      </div>
      {editable && (
        <button
          onClick={onDelete}
          className="text-[#94a3b8] hover:text-rose-600 self-center shrink-0 p-0.5 rounded-full"
          title="Delete note"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/* ════════════════ SUBCATEGORY (4-QUAD MULTI) VIEW ════════════════ */
interface SubcategoryPageProps {
  deptId: string;
  config: AppConfig;
  subId: string;
  udata: Record<string, any>;
  notes: SubNotes;
  user: any;
  isConfigUnlocked: boolean;
  onUpdateNotes: (subId: string, notesObj: { inf?: any[]; ini?: any[] }) => void;
}

function SubcategoryPage({ deptId, config, subId, udata, notes, user, isConfigUnlocked, onUpdateNotes }: SubcategoryPageProps) {
  const metrics = config.metrics.filter((m) => m.subId === subId).sort((a, b) => a.order - b.order);

  // All charts belonging to active subcategory
  const allCharts: { ch: any; metric: Metric }[] = [];
  metrics.forEach((m) => {
    (m.charts || []).forEach((ch) => {
      allCharts.push({ ch, metric: m });
    });
  });

  const isSingleChart = allCharts.length === 1;

  // Render Notes Section Engine for specific Subcategory
  const activeSubNotes = notes[subId] || { inf: [], ini: [] };
  const [newlyAddedIdx, setNewlyAddedIdx] = useState<{ type: 'inf' | 'ini'; idx: number } | null>(null);

  const canModifyNote = (noteAuthor: string) => {
    if (isConfigUnlocked) return true;
    if (!noteAuthor) return true;
    return user && user.email === noteAuthor;
  };

  const handleAddNoteItem = (type: 'inf' | 'ini') => {
    const list = [...(activeSubNotes[type] || [])];
    const defaultText = type === 'inf' ? 'New inference rationale — click to edit.' : 'Proposed initiative roadmap — click to edit.';
    list.push({
      text: defaultText,
      author: user?.email || '',
    } as any);
    setNewlyAddedIdx({ type, idx: list.length - 1 });
    onUpdateNotes(subId, {
      ...activeSubNotes,
      [type]: list,
    });
  };

  const handleUpdateNoteItem = (type: 'inf' | 'ini', index: number, val: string) => {
    const list = [...(activeSubNotes[type] || [])];
    const currentNote = list[index];
    const existingAuthor = typeof currentNote === 'object' && currentNote !== null ? currentNote.author : '';
    if (!canModifyNote(existingAuthor)) return;

    list[index] = {
      text: val,
      author: existingAuthor || user?.email || '',
    } as any;
    onUpdateNotes(subId, {
      ...activeSubNotes,
      [type]: list,
    });
  };

  const handleDeleteNoteItem = (type: 'inf' | 'ini', index: number) => {
    const list = activeSubNotes[type] || [];
    const currentNote = list[index];
    const existingAuthor = typeof currentNote === 'object' && currentNote !== null ? currentNote.author : '';
    if (!canModifyNote(existingAuthor)) {
      alert("You cannot delete this item as you are not the author or an admin!");
      return;
    }

    const filtered = list.filter((_, i) => i !== index);
    onUpdateNotes(subId, {
      ...activeSubNotes,
      [type]: filtered,
    });
  };

  return (
    <div className="space-y-6">
      {/* 5-Line Trends Composed Charts Row */}
      <div className={`grid grid-cols-1 ${isSingleChart ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
        {allCharts.map(({ ch, metric }) => (
          <WbrChartCard key={ch.id} ch={ch} metric={metric} deptId={deptId} udata={udata} config={config} />
        ))}
      </div>

      {/* Detail Strip: Projections (forecasts) | Inferences | Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Quad 1: Projections Grid */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2 flex items-center justify-between text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
            <span>Projection Forecasts (6M)</span>
            <span className="bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-2 py-0.5 select-none leading-none">
              AUTO
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <ProjectionsTable allCharts={allCharts} udata={udata} deptId={deptId} />
          </div>
        </div>

        {/* Quad 2: Inferences Notes */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2 flex items-center justify-between text-[10px] font-bold text-[#64748b] tracking-wider uppercase select-none">
            <span>Inferences — Case Studies (Why)</span>
            <span className="bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-2 py-0.5 leading-none">
              Inferences
            </span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {(activeSubNotes.inf || []).map((note, idx) => {
                const noteText = typeof note === 'object' && note !== null ? note.text : note;
                const noteAuthor = typeof note === 'object' && note !== null ? note.author : '';
                const editable = canModifyNote(noteAuthor);
                return (
                  <NoteItem
                    key={idx}
                    noteText={noteText}
                    noteAuthor={noteAuthor}
                    editable={editable}
                    user={user}
                    borderClass="border-blue-500"
                    bgClass="bg-blue-50/15"
                    onUpdate={(val) => handleUpdateNoteItem('inf', idx, val)}
                    onDelete={() => handleDeleteNoteItem('inf', idx)}
                    autoFocus={newlyAddedIdx?.type === 'inf' && newlyAddedIdx?.idx === idx}
                  />
                );
              })}
              {(!activeSubNotes.inf || activeSubNotes.inf.length === 0) && (
                <span className="text-[10px] italic text-[#94a3b8] block text-center py-4 select-none">
                  No inferences noted yet. Click Add to log.
                </span>
              )}
            </div>
            <button
              onClick={() => handleAddNoteItem('inf')}
              className="flex items-center justify-center gap-1 w-full py-1.5 border border-dashed border-[#e2e8f0] hover:border-blue-300 text-[10px] font-bold tracking-wider text-[#64748b] bg-slate-55 hover:bg-slate-100 rounded-lg uppercase select-none transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Inference</span>
            </button>
          </div>
        </div>

        {/* Quad 3: Initiatives Roadmap */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2 flex items-center justify-between text-[10px] font-bold text-[#64748b] tracking-wider uppercase select-none">
            <span>Initiatives & Strategy (How)</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-2 py-0.5 leading-none">
              Initiatives
            </span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {(activeSubNotes.ini || []).map((note, idx) => {
                const noteText = typeof note === 'object' && note !== null ? note.text : note;
                const noteAuthor = typeof note === 'object' && note !== null ? note.author : '';
                const editable = canModifyNote(noteAuthor);
                return (
                  <NoteItem
                    key={idx}
                    noteText={noteText}
                    noteAuthor={noteAuthor}
                    editable={editable}
                    user={user}
                    borderClass="border-emerald-500"
                    bgClass="bg-emerald-50/15"
                    onUpdate={(val) => handleUpdateNoteItem('ini', idx, val)}
                    onDelete={() => handleDeleteNoteItem('ini', idx)}
                    autoFocus={newlyAddedIdx?.type === 'ini' && newlyAddedIdx?.idx === idx}
                  />
                );
              })}
              {(!activeSubNotes.ini || activeSubNotes.ini.length === 0) && (
                <span className="text-[10px] italic text-[#94a3b8] block text-center py-4 select-none">
                  No action items logged yet. Click Add to log.
                </span>
              )}
            </div>
            <button
              onClick={() => handleAddNoteItem('ini')}
              className="flex items-center justify-center gap-1 w-full py-1.5 border border-dashed border-[#e2e8f0] hover:border-emerald-300 text-[10px] font-bold tracking-wider text-[#64748b] bg-slate-55 hover:bg-slate-100 rounded-lg uppercase select-none transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Initiative</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ PROJECTIONS FORECAST GRID TABLE ════════════════ */
interface ProjectionsTableProps {
  allCharts: any[];
  udata: Record<string, any>;
  deptId: string;
}

function ProjectionsTable({ allCharts, udata, deptId }: ProjectionsTableProps) {
  // Check if any projections are loaded
  const hasProjData = allCharts.some((item) => {
    const colKey = item.ch.col;
    const projValues = getProj(udata, colKey);
    return projValues.some((v) => v !== null);
  });

  if (!hasProjData) {
    return (
      <div className="space-y-4 text-xs leading-relaxed text-[#64748b]">
        <div className="flex items-start gap-2 bg-slate-50 border border-[#e2e8f0] p-3 rounded-lg text-[#334155]">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[#0f172a] text-[11px] mb-1">
              Projections not found in uploaded file
            </span>
            Add a <strong className="text-blue-600">"Projections"</strong> block to your Excel worksheet. Format:
          </div>
        </div>

        <div className="font-mono text-[9px] bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-lg overflow-x-auto text-[#475569] leading-5">
          <span className="text-blue-600 font-bold block">Projections</span>
          Period | {allCharts.map((i) => i.ch.col).join(' | ')}<br />
          Current | ... | ...<br />
          Month+1 | ... | ...
        </div>
      </div>
    );
  }

  // Monthly Labels forecast grid
  const currentMonthIdx = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const futureMonths = Array.from({ length: 7 }, (_, i) => {
    const targetIdx = (currentMonthIdx + i) % 12;
    const offsetYear = currentYear + Math.floor((currentMonthIdx + i) / 12);
    const label = MOS[targetIdx] + ' ' + offsetYear;
    return { label, index: i };
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left border-collapse">
        <thead>
          <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[9px] uppercase font-bold tracking-wider text-[#64748b]">
            <th className="py-2.5 px-3">Forecast Month</th>
            {allCharts.map((item) => (
              <th key={item.ch.id} className="py-2.5 px-3 text-right">
                {item.ch.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e2e8f0]">
          {futureMonths.map((mObj) => {
            return (
              <tr key={mObj.index} className="hover:bg-slate-50/50">
                <td className="py-2 px-3 font-semibold text-[#334155] whitespace-nowrap">
                  {mObj.label}
                  {mObj.index === 0 && (
                    <span className="ml-1.5 text-[8px] bg-blue-50 text-blue-600 font-bold border border-blue-200 px-1 rounded-sm uppercase tracking-wide">
                      CUR
                    </span>
                  )}
                </td>
                {allCharts.map((item) => {
                  const colKey = item.ch.col;
                  const isPct = !!getAliasedVal(udata, '_ispct_', '', colKey) || colKey.toLowerCase().includes('percent') || colKey.toLowerCase().includes('rate') || (item.ch.name && (item.ch.name.includes('%') || item.ch.name.toLowerCase().includes('rate') || item.ch.name.toLowerCase().includes('percent') || item.ch.name.toLowerCase().includes('deviation')));
                  const projValues = getProj(udata, colKey);
                  const predVal = projValues[mObj.index];

                  return (
                    <td key={item.ch.id} className="py-2 px-3 text-right font-mono font-medium text-[#0f172a]">
                      {predVal !== null ? (isPct ? predVal.toFixed(1) + '%' : numFmt(predVal)) : '—'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
