import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export default function LoginScreen() {
  const handleMicrosoftLogin = () => {
    // Redirect to backend Microsoft OAuth endpoint
    window.location.href = 'http://localhost:4000/api/wbi/auth/microsoft';
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[400px] bg-white rounded-2xl border border-[#e2e8f0] shadow-lg p-10 flex flex-col items-center"
      >
        {/* Top Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 border border-blue-100 shadow-sm">
            <Activity className="w-7 h-7 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-blue-600">WBI Platform</h1>
          <span className="text-[10px] font-mono font-medium tracking-widest text-[#64748b] mt-1 uppercase">
            Weekly Business Intelligence
          </span>
        </div>

        {/* Info label */}
        <p className="text-center text-xs text-[#334155] mb-8 leading-relaxed">
          Sign in with your Microsoft work account to access interactive weekly graphs, forecasts, and executive performance indicators.
        </p>

        {/* Microsoft SSO Button */}
        <button
          type="button"
          onClick={handleMicrosoftLogin}
          className="w-full py-3.5 bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white font-bold rounded-xl text-sm transition shadow-sm active:transform active:scale-[0.99] flex items-center justify-center gap-3"
        >
          {/* Microsoft Logo SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
          </svg>
          Sign in with Microsoft
        </button>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#94a3b8] leading-relaxed">
            Access is restricted to authorised work accounts only.<br />
            Session activity is monitored and recorded.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
