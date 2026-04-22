import React from "react";

export default function QuickSettings({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Semi-transparent backdrop to close on click */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Slide-out Panel */}
      <div className="relative w-full md:w-[420px] bg-[#0f2323]/95 backdrop-blur-3xl border-l border-primary/10 h-full flex flex-col shadow-2xl animate-slide-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">settings_input_component</span>
            <h2 className="text-white text-xl font-bold tracking-tight">Quick Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#9bbbbb]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 custom-scrollbar">
          {/* Section: System Preferences */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#9bbbbb] mb-4">System Preferences</h3>
            <div className="space-y-4">
              <ToggleRow title="Desktop Notifications" sub="Real-time threat alerts" defaultChecked />
              <div className="flex flex-col gap-2">
                <label className="text-[#9bbbbb] text-xs font-medium px-1">Auto-Refresh Rate</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer">
                  <option value="realtime">Real-time (Stream)</option>
                  <option value="10s">Every 10 seconds</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section: Dashboard Layout */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#9bbbbb] mb-4">Dashboard Layout</h3>
            <div className="space-y-1">
              <CompactToggle title="Live Activity Feed" icon="dynamic_feed" defaultChecked />
              <CompactToggle title="Risk Heatmap" icon="grid_view" defaultChecked />
              <CompactToggle title="Compact Data View" icon="view_headline" />
            </div>
          </section>

          {/* Section: Alert Sounds */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#9bbbbb]">Alert Sounds</h3>
              <button className="text-primary text-xs font-bold hover:underline">TEST AUDIO</button>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white">Master Volume</span>
                  <span className="text-primary font-mono">75%</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-semibold group">
              View All Settings
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            {/* <span className="text-[#4a6b6b] text-[10px] font-mono">v2.4.0-STABLE</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for better modularity within this file
function ToggleRow({ title, sub, defaultChecked }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
      <div className="flex flex-col gap-0.5">
        <span className="text-white text-sm font-medium">{title}</span>
        <span className="text-[#9bbbbb] text-xs">{sub}</span>
      </div>
      <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full bg-white/10 p-1 transition-colors has-[:checked]:bg-primary">
        <input defaultChecked={defaultChecked} className="peer invisible absolute" type="checkbox" />
        <div className="h-full w-[20px] rounded-full bg-white shadow-md transition-all peer-checked:translate-x-[20px]" />
      </label>
    </div>
  );
}

function CompactToggle({ title, icon, defaultChecked }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#9bbbbb] group-hover:text-primary transition-colors">{icon}</span>
        <span className="text-white text-sm">{title}</span>
      </div>
      <label className="relative flex h-[24px] w-[42px] cursor-pointer items-center rounded-full bg-white/10 p-0.5 transition-colors has-[:checked]:bg-primary">
        <input defaultChecked={defaultChecked} className="peer invisible absolute" type="checkbox" />
        <div className="h-full w-[19px] rounded-full bg-white transition-all peer-checked:translate-x-[18px]" />
      </label>
    </div>
  );
}