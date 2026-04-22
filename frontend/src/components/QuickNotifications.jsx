import React from "react";

export default function QuickNotifications({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Dimmer Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/60 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />
      
      {/* Panel Drawer */}
      <div className="relative w-full max-w-[420px] bg-[#0f2323]/85 backdrop-blur-xl border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Notifications</h2>
            <button onClick={onClose} className="size-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Unread (3)</span>
            <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Mark all as read
              <span className="material-symbols-outlined text-sm">done_all</span>
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">New</h3>
            
            {/* High Risk Notification with Pulse */}
            <div className="group bg-white/5 hover:bg-white/10 rounded-lg p-4 border-l-4 border-accent-red shadow-[0_0_0_0_rgba(255,77,77,0.4)] animate-pulse-red cursor-pointer">
              <div className="flex justify-between items-start mb-2 text-accent-red">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">warning</span>
                  <h4 className="text-sm font-bold">🚨 High Risk Alert</h4>
                </div>
                <span className="text-[10px] text-slate-400">1m ago</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">Suspicious flash loan activity targeting <code className="bg-black/30 px-1.5 py-0.5 rounded text-primary text-xs font-mono">0x71C...3e21</code></p>
              <button className="w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-black text-xs font-bold rounded transition-all">Quick View</button>
            </div>

            {/* System Update */}
            <div className="group bg-white/5 hover:bg-white/10 rounded-lg p-4 border-l-4 border-blue-500 cursor-pointer">
              <div className="flex justify-between items-start mb-2 text-blue-500">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">cloud_done</span>
                  <h4 className="text-sm font-bold">System Update</h4>
                </div>
                <span className="text-[10px] text-slate-400">12m ago</span>
              </div>
              <p className="text-sm text-slate-300">Anomaly detection model retraining successful. Version 2.4.0 live.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Earlier Today</h3>
            <div className="group bg-white/5 hover:bg-white/10 rounded-lg p-4 border-l-4 border-secondary cursor-pointer">
               <div className="flex justify-between mb-2 text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">account_balance</span>
                    <h4 className="text-sm font-bold">New DAO Proposal</h4>
                  </div>
                  <span className="text-[10px] text-slate-400">5h ago</span>
               </div>
               <p className="text-sm text-slate-300">Proposal #42: Adjusting security parameters for LP v3.</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center gap-3 bg-white/5">
          <button className="flex-1 bg-primary py-3 rounded-lg text-background-dark text-sm font-bold tracking-tight hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2">
            View All Alerts <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
          <button onClick={onClose} className="size-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/5 text-white">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}