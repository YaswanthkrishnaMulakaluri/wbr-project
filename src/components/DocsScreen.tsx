import React, { useState } from 'react';
import { Copy, Check, Download, Search, Terminal, Database, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export default function DocsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'arch' | 'stack' | 'db' | 'security'>('all');
  const [copied, setCopied] = useState(false);

  const rawMarkdown = `# IT PRODUCTIONIZATION HANDOFF & ARCHITECTURAL REQUIREMENTS
## Weekly Business Intelligence (WBI) Platform

This document serves as the official technical handoff and engineering specification for software engineers and IT operations teams to move the Weekly Business Intelligence (WBI) prototype into a production-grade enterprise system.

---

## 2. Recommended Production Tech Stack
Frontend: React 18+ (Vite) or Next.js (App Router), Tailwind CSS
Backend: Node.js v18/v20 (NestJS) or Go microservices
Database: PostgreSQL on Google Cloud SQL or AWS RDS, Redis for caching and queues.

---

## 3. Core Architecture
- Asynchronous Excel/CSV ingestion pipeline using Redis Queue backend (BullMQ)
- Cloud CDN and Load Balancer edge integration
- Microservices division: Auth Service, Ingestion Service, Analytics Service.

---

## 5. Relational Database Schema Design
-- PostgreSQL DDL specifications for high availability
... (View full schema block inside Schema Explorer)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'WBI_IT_PRODUCTIONIZATION_HANDOFF.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    {
      id: 'stack',
      category: 'stack',
      icon: <Cpu className="w-4 h-4 text-sky-500" />,
      title: 'Enterprise Tech Stack Recommendation',
      desc: 'Selected enterprise-grade tools, platforms, and compilers to scale the dashboard.',
      content: (
        <div className="space-y-4 text-xs font-sans leading-relaxed">
          <p className="text-[#64748b]">
            Transitioning the local Excel database state to high autonomy requires shifting from serverless prototypes to decoupled client-server structures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl shadow-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 mb-2">Frontend Host</h4>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>React 18+ Workspaces</li>
                <li>Tailwind CSS Utility UI</li>
                <li>Recharts SVG Canvas</li>
                <li>Vite Bundler / SWC compiler</li>
              </ul>
            </div>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl shadow-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 mb-2">REST & Ingestion API</h4>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Node.js (LTS v20) or Go</li>
                <li>Express.js or NestJS Core</li>
                <li>XLSX Cell Parser Worker</li>
                <li>BullMQ Async Jobs (Redis)</li>
              </ul>
            </div>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl shadow-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 mb-2">Database Cluster</h4>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>PostgreSQL Relational Storage</li>
                <li>Cloud SQL Deployments</li>
                <li>Redis In-Memory Logs</li>
                <li>Drizzle ORM Dialects</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'arch',
      category: 'arch',
      icon: <Terminal className="w-4 h-4 text-teal-500" />,
      title: 'Decoupled Asynchronous Ingestion Pipeline',
      desc: 'Background parsing architectures preventing thread-blocking during large workbook uploads.',
      content: (
        <div className="space-y-4 text-xs font-sans leading-relaxed">
          <p className="text-[#64748b]">
            Parsing heavy multi-sheet Excel workbooks with hundreds of coordinate blocks takes seconds of server processing. To prevent client timeouts:
          </p>
          <div className="border border-[#cbd5e1] rounded-xl overflow-hidden">
            <div className="bg-slate-900 text-white p-3 font-mono text-[10px] flex justify-between items-center select-none">
              <span>PIPELINE SEQUENCE DIALOG CHECK</span>
              <span className="text-teal-400 font-bold">STATE: COMPLIANT</span>
            </div>
            <div className="p-4 bg-slate-950 font-mono text-[11px] text-teal-300 space-y-1.5 leading-relaxed">
              <div>{"[Client] 1. Requests Pre-signed Upload Token -> [API Gateway]"}</div>
              <div>{"[Client] 2. Push Excel Workbook directly to Secure Cloud Bucket (AWS S3 / GCS)"}</div>
              <div>{"[Bucket Event] 3. Dispatches Trigger topic to [Excel-Parser-Queue] (Redis Powered)"}</div>
              <div>{"[Worker Pool] 4. Grabs job, boots XLSX instance, parses rows block-by-block"}</div>
              <div>{"[Worker Pool] 5. Translates aliases & bulk-upserts sanitized models to PostgreSQL"}</div>
              <div>{"[Worker Pool] 6. Fires push-notification socket event: \"SESSION_INGEST_COMPLETE\""}</div>
              <div>{"[Client UI] 7. Listeners catch event and dynamically hot-reload chart statistics"}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'db',
      category: 'db',
      icon: <Database className="w-4 h-4 text-violet-500" />,
      title: 'Enterprise Relational Database DDL Schema',
      desc: 'Normalized structure safely recording Departments, Categories, Metrics, and Ingestion History.',
      content: (
        <div className="space-y-4 text-xs font-sans">
          <p className="text-[#64748b] leading-relaxed">
            Move away from static file syncs to PostgreSQL storage. Run the following verified migration commands to implement the schema on your server:
          </p>
          <div className="border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-50 border-b border-[#e2e8f0] px-4 py-2.5 flex justify-between items-center select-none">
              <span className="font-mono text-[10px] text-[#475569] font-bold">Drizzle/SQL Schema Definition</span>
              <span className="bg-violet-50 text-violet-700 text-[9px] font-mono font-bold border border-violet-200 px-2 py-0.5 rounded-md">PostgreSQL Compatible</span>
            </div>
            <div className="p-4 bg-[#f8fafc] font-mono text-[10.5px] text-slate-800 overflow-x-auto max-h-[350px] space-y-3 leading-relaxed">
              <pre className="whitespace-pre">{`-- Create Departments Table
CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Categories Table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    dept_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

-- Create Subcategories Table (Supports Academics & More)
CREATE TABLE subcategories (
    id VARCHAR(50) PRIMARY KEY,
    cat_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

-- Create Metrics (Spreadsheet Ingestion Targets)
CREATE TABLE metrics (
    id VARCHAR(50) PRIMARY KEY,
    sub_id VARCHAR(50) REFERENCES subcategories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    sheet_name VARCHAR(100) NOT NULL,
    is_kpi BOOLEAN DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 0
);

-- Create Clean Analytical Data Point Storage
CREATE TABLE metric_data (
    id SERIAL PRIMARY KEY,
    dept_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    period_key VARCHAR(50) NOT NULL, -- e.g., 'W22', 'M06'
    column_key VARCHAR(150) NOT NULL, -- e.g., 'active_students_math'
    value_data DOUBLE PRECISION NOT NULL,
    uploaded_by VARCHAR(150) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_period_column UNIQUE(dept_id, period_key, column_key)
);`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      category: 'security',
      icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
      title: 'Security, Compliance & Caching Protocols',
      desc: 'Establishing Microsoft SSO, secure user activity telemetry audits, and Redis layer caching.',
      content: (
        <div className="space-y-4 text-xs font-sans leading-relaxed">
          <p className="text-[#64748b]">
            High-availability financial and operational details require strong security baselines to prevent data leakages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-rose-100 bg-rose-50/30 p-4 rounded-xl">
              <h4 className="font-bold text-rose-900 flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                <span>Integration Specifications</span>
              </h4>
              <ul className="space-y-2 text-rose-800 list-inside list-disc">
                <li>Implement OIDC Single Sign-On (Active Directory or Okta).</li>
                <li>Establish RBAC: Managers may read and write. Executives read-only.</li>
                <li>Lock layouts (`isLockedLayout = true`) to safeguard config hierarchies.</li>
              </ul>
            </div>
            <div className="border border-emerald-100 bg-emerald-50/30 p-4 rounded-xl">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Performance & Caching Tuning</span>
              </h4>
              <ul className="space-y-2 text-emerald-800 list-inside list-disc">
                <li>Cache response results on GET operations within the Redis layer.</li>
                <li>Flush Redis cache coordinates selectively whenever a parsing block finishes.</li>
                <li>Throttle file uploads (limit 5 per user per min) to block denial-of-service.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredSections = sections.filter((s) => {
    const sType = s.category === activeFilter || activeFilter === 'all';
    const sSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return sType && sSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 select-none opacity-10 pointer-events-none">
          <Database className="w-80 h-80" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-teal-500/30">
            For Systems Engineers & IT Admins
          </span>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            IT Hand-off & Production Architecture Requirements
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            This live document summarizes precisely what resources, database schemas, identity models, and ingestion modules must be provisioned to convert this business intelligence demo into an isolated high-availability enterprise environment.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold py-2 px-4 rounded-xl select-none transition border border-transparent shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 animate-bounce" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Raw Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white text-xs font-bold py-2 px-4 rounded-xl select-none transition border border-slate-700 shadow-sm"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Download .md Document File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Core View Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
          {/* Section Selector tabs group */}
          <div className="flex flex-wrap gap-1.5 bg-slate-50 border border-[#e2e8f0] p-1.5 rounded-xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition select-none ${
                activeFilter === 'all' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              All Sections
            </button>
            <button
              onClick={() => setActiveFilter('stack')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition select-none ${
                activeFilter === 'stack' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Stack
            </button>
            <button
              onClick={() => setActiveFilter('arch')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition select-none ${
                activeFilter === 'arch' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveFilter('db')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition select-none ${
                activeFilter === 'db' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Database Schema
            </button>
            <button
              onClick={() => setActiveFilter('security')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition select-none ${
                activeFilter === 'security' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Security
            </button>
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full md:w-[260px]">
            <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-[#f8fafc] border border-[#e2e8f0] focus:bg-white focus:border-blue-600 rounded-xl pl-9 pr-4 py-2 w-full outline-none transition"
            />
          </div>
        </div>

        {/* Dynamic Items Output container */}
        <div className="space-y-6 divide-y divide-[#e2e8f0]">
          {filteredSections.length > 0 ? (
            filteredSections.map((sec, idx) => (
              <div key={sec.id} className={`space-y-4 ${idx > 0 ? 'pt-6' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-[#e2e8f0] flex items-center justify-center shrink-0">
                    {sec.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-slate-900">{sec.title}</h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>

                <div className="pl-11">{sec.content}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-[#64748b] text-xs">
              No matching specifications of requirements could be located. Try selecting 'All Sections' or broadening the query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
