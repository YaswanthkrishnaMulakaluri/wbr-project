import React, { useState } from 'react';
import { Building2, UploadCloud, Trash2, Layers, Filter, FileSpreadsheet } from 'lucide-react';
import { AppConfig, UploadedDataState, UploadedFileInfo } from '../types';
import { hasData, WKS } from '../utils';

interface HomeScreenProps {
  config: AppConfig;
  userData: UploadedDataState;
  uploadedFiles: UploadedFileInfo[];
  onOpenWBR: (deptId: string) => void;
  onClearData: (deptId: string) => void;
  onUploadExcel: (deptId: string, file: File) => void;
}

export default function HomeScreen({
  config,
  userData,
  uploadedFiles,
  onOpenWBR,
  onClearData,
  onUploadExcel,
}: HomeScreenProps) {
  const getLatestFile = (deptId: string): UploadedFileInfo | undefined =>
    uploadedFiles.find((f) => f.dept_key === deptId);

  const formatUploadDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Filters state
  const [filterDept, setFilterDept] = useState('');
  const [filterWeek, setFilterWeek] = useState('W' + config.currentWeek);
  const [filterStatus, setFilterStatus] = useState('');

  // Helper to compute stats for a department
  const getDeptStats = (deptId: string) => {
    const deptCats = config.categories.filter((c) => c.deptId === deptId);
    const deptSubs = config.subcategories.filter((s) => deptCats.some((c) => c.id === s.catId));
    const deptMets = config.metrics.filter((m) => deptSubs.some((s) => s.id === m.subId));

    let total = 0;
    let submitted = 0;

    deptMets.forEach((m) => {
      (m.charts || []).forEach((ch) => {
        total++;
        if (hasData(userData[deptId], ch.col)) {
          submitted++;
        }
      });
    });

    const pct = total === 0 ? 0 : Math.round((submitted / total) * 100);
    let status: 'complete' | 'partial' | 'missing' = 'missing';
    if (pct === 100) status = 'complete';
    else if (pct > 0) status = 'partial';

    return {
      total: total || 1,
      submitted,
      pct,
      status,
      categoriesCount: deptCats.length,
      subcategoriesCount: deptSubs.length,
    };
  };

  const departmentsWithStats = config.departments.map((d) => ({
    ...d,
    stats: getDeptStats(d.id),
  }));

  // Filter logic for submission tracker table
  const filteredTrackerRows = departmentsWithStats.filter((dept) => {
    if (filterDept && dept.id !== filterDept) return false;
    if (filterStatus && dept.stats.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">
          Weekly Business Intelligence
        </h1>
        <p className="text-xs text-[#64748b] font-medium leading-relaxed">
          Select a department to view graphs, projections, and log inferences. Upload excel books underneath.
        </p>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentsWithStats
          .sort((a, b) => a.order - b.order)
          .map((dept) => {
            const stats = dept.stats;
            const badgeBg =
              stats.status === 'complete'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : stats.status === 'partial'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200';

            const fillBg =
              stats.status === 'complete'
                ? 'bg-emerald-500'
                : stats.status === 'partial'
                ? 'bg-amber-500'
                : 'bg-rose-500';

            return (
              <div
                key={dept.id}
                onClick={() => onOpenWBR(dept.id)}
                className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden cursor-pointer hover:border-[#93c5fd] hover:shadow-md hover:-translate-y-0.5 transition flex flex-col shadow-sm"
              >
                {/* Card Header */}
                <div className="p-5 flex items-start gap-4 border-b border-[#e2e8f0]">
                  <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-blue-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#0f172a] truncate">{dept.name}</h3>
                    <p className="text-[11px] text-[#64748b] truncate mt-0.5" title={dept.desc}>
                      {dept.desc || 'No department description provided'}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold capitalize border rounded-full px-2.5 py-0.5 shrink-0 shadow-xs ${badgeBg}`}
                  >
                    {stats.status === 'complete' ? 'Complete' : stats.status === 'partial' ? 'Partial' : 'Missing'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                      <span>Submission Rate</span>
                      <span className="text-[#334155]">
                        {stats.submitted} / {stats.total} Charts ({stats.pct}%)
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${fillBg}`}
                        style={{ width: `${stats.pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 3-Stat Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-center shadow-xs">
                    <div>
                      <div className="font-mono text-sm font-bold text-[#0f172a]">
                        {stats.categoriesCount}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-[#64748b] mt-0.5">
                        Categories
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold text-[#0f172a]">
                        {stats.subcategoriesCount}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-[#64748b] mt-0.5">
                        Sub tabs
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold text-[#0f172a]">
                        {stats.total}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-[#64748b] mt-0.5">
                        Graphs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#f8fafc] border-t border-[#e2e8f0] px-5 py-3 flex flex-col gap-2"
                >
                  {/* Latest uploaded file info */}
                  {(() => {
                    const f = getLatestFile(dept.id);
                    return f ? (
                      <div className="flex items-start gap-1.5 text-[10px] text-[#64748b]">
                        <FileSpreadsheet className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
                        <div className="min-w-0">
                          <span className="font-semibold truncate block" title={f.file_name}>
                            {f.file_name.length > 32 ? f.file_name.slice(0, 32) + '…' : f.file_name}
                          </span>
                          <span className="text-[9px]">
                            {formatUploadDate(f.uploaded_at)}
                            {f.uploader_email ? ` · ${f.uploader_email.split('@')[0]}` : ''}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                      Active: W{config.currentWeek}
                    </span>

                  <div className="flex items-center gap-2">
                    {/* File Upload Trigger */}
                    <label className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e2e8f0] hover:border-blue-500 hover:text-blue-600 rounded-lg text-xs font-semibold text-[#334155] cursor-pointer shadow-xs transition">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".xlsx, .csv"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onUploadExcel(dept.id, file);
                          }
                          e.target.value = ''; // Reset
                        }}
                      />
                    </label>

                    {/* Clear Button */}
                    <button
                      onClick={() => onClearData(dept.id)}
                      title="Clear uploaded data"
                      className="border border-[#e2e8f0] hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 rounded-lg p-1.5 text-[#64748b] transition shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Tracker & Checks Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-[#64748b]" />
          <h2 className="text-xs font-black uppercase tracking-widest text-[#64748b]">
            Tracker & Checks
          </h2>
          <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#64748b] font-bold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter List:</span>
          </div>

          <div className="flex flex-wrap gap-2 flex-1">
            {/* Department Filter */}
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="text-xs bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 px-3 py-1.5 rounded-lg outline-none font-medium text-[#334155] transition"
            >
              <option value="">All Departments</option>
              {config.departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Target Week */}
            <select
              value={filterWeek}
              onChange={(e) => setFilterWeek(e.target.value)}
              className="text-xs bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 px-3 py-1.5 rounded-lg outline-none font-mono text-[#334155] transition"
            >
              <option value="">All Weeks</option>
              {WKS.slice(0, config.currentWeek).map((wk) => (
                <option key={wk} value={wk}>
                  {wk}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 px-3 py-1.5 rounded-lg outline-none font-medium text-[#334155] transition"
            >
              <option value="">All Statuses</option>
              <option value="complete">Complete</option>
              <option value="partial">Partial</option>
              <option value="missing">Not Submitted</option>
            </select>
          </div>
        </div>

        {/* Tracker Table */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[10px] uppercase font-bold tracking-wider font-mono text-[#64748b]">
                <tr>
                  <th className="py-3 px-5">Department</th>
                  <th className="py-3 px-5 text-center">Target Week</th>
                  <th className="py-3 px-5 text-center">Active Charts</th>
                  <th className="py-3 px-5 text-center">Total Required</th>
                  <th className="py-3 px-5 text-center">Pending Uploads</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                {filteredTrackerRows.length > 0 ? (
                  filteredTrackerRows.map((dept) => {
                    const stats = dept.stats;
                    const pendingCount = stats.total - stats.submitted;
                    const badgeClass =
                      stats.status === 'complete'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : stats.status === 'partial'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200';

                    return (
                      <tr key={dept.id} className="hover:bg-[#f8fafc]/50 transition">
                        <td className="py-3.5 px-5 font-bold">
                          <button
                            onClick={() => onOpenWBR(dept.id)}
                            className="text-blue-600 hover:underline hover:text-blue-700 focus:outline-none text-left"
                          >
                            {dept.name}
                          </button>
                        </td>
                        <td className="py-3.5 px-5 text-center font-mono">{filterWeek || '—'}</td>
                        <td className="py-3.5 px-5 text-center font-mono font-medium">{stats.submitted}</td>
                        <td className="py-3.5 px-5 text-center font-mono text-[#64748b]">{stats.total}</td>
                        <td
                          className={`py-3.5 px-5 text-center font-mono font-semibold ${
                            pendingCount > 0 ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {pendingCount || '0'}
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border capitalize scale-[0.95] origin-left ${badgeClass}`}
                          >
                            {stats.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[#64748b]">
                      No matching logs or submission records. Check filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
