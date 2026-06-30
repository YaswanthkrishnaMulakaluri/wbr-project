import { Home, BarChart2, Settings, LogOut, FileText } from 'lucide-react';

interface NavBarProps {
  brandName: string;
  logoData: string;
  activeTab: 'home' | 'wbr' | 'admin' | 'docs';
  onTabChange: (tab: 'home' | 'wbr' | 'admin' | 'docs') => void;
  currentWeek: number;
  dateRange: string;
  email: string;
  onSignOut: () => void;
  wbrEnabled: boolean;
}

export default function NavBar({
  brandName,
  logoData,
  activeTab,
  onTabChange,
  currentWeek,
  dateRange,
  email,
  onSignOut,
  wbrEnabled,
}: NavBarProps) {
  return (
    <nav className="sticky top-0 z-[300] bg-white border-b border-[#e2e8f0] shadow-sm px-6 py-2.5 flex items-center justify-between">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 text-left focus:outline-none"
        >
          {logoData ? (
            <img
              src={logoData}
              alt="logo"
              className="w-8 h-8 rounded-lg object-cover border border-[#e2e8f0]"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              {brandName ? brandName.charAt(0).toUpperCase() : 'W'}
            </div>
          )}
          <span className="text-base font-black tracking-tight text-blue-600 font-sans">
            {brandName || 'WBI'}
          </span>
        </button>
        <span className="w-[1px] h-5 bg-[#cbd5e1] hidden sm:inline"></span>
        <span className="text-[11px] text-[#64748b] font-mono hidden sm:inline uppercase tracking-wider">
          Weekly Business Intelligence
        </span>
      </div>

      {/* Centre: Nav Tabs */}
      <div className="bg-[#f8fafc] p-1 rounded-xl border border-[#e2e8f0] flex items-center gap-1">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition ${
            activeTab === 'home'
              ? 'bg-white text-blue-600 shadow-sm border border-[#e2e8f0]'
              : 'text-[#64748b] hover:text-[#334155]'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Home</span>
        </button>

        {/* WBR Tabs */}
        {wbrEnabled && (
          <button
            onClick={() => onTabChange('wbr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition ${
              activeTab === 'wbr'
                ? 'bg-white text-blue-600 shadow-sm border border-[#e2e8f0]'
                : 'text-[#64748b] hover:text-[#334155]'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">WBR Tabs</span>
          </button>
        )}

        {/* Config (PIN Gated in App) */}
        <button
          onClick={() => onTabChange('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition ${
            activeTab === 'admin'
              ? 'bg-white text-blue-600 shadow-sm border border-[#e2e8f0]'
              : 'text-blue-600 hover:bg-blue-50/50 border border-transparent'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Config</span>
        </button>

        {/* IT Handoff Requirements Doc */}
        <button
          onClick={() => onTabChange('docs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition ${
            activeTab === 'docs'
              ? 'bg-white text-teal-600 shadow-sm border border-[#e2e8f0]'
              : 'text-[#64748b] hover:text-[#334155]'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-teal-500" />
          <span className="hidden xs:inline">IT Requirements</span>
        </button>
      </div>

      {/* Right: Info Badge & Sign Out */}
      <div className="flex items-center gap-3">
        {/* User context info */}
        <div className="hidden lg:flex flex-col items-end text-right">
          <span className="text-[10px] font-mono text-[#64748b] max-w-[150px] truncate" title={email}>
            {email}
          </span>
          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-0.5">
            MEMBER
          </span>
        </div>

        {/* Dynamic Week Badge */}
        <div className="hidden sm:flex font-mono text-[10px] font-semibold text-[#334155] bg-[#f8fafc] border border-[#e2e8f0] py-1.5 px-3 rounded-full items-center gap-1.5 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>W{currentWeek} · {dateRange}</span>
        </div>

        {/* Logout */}
        <button
          onClick={onSignOut}
          title="Sign Out"
          className="border border-[#e2e8f0] hover:border-red-200 hover:bg-rose-50 hover:text-red-600 text-[#64748b] rounded-lg p-1.5 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
