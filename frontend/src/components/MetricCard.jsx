export default function MetricCard({ label, value, icon, subtext, trendIcon, variant }) {
  // Mapping variants to specific Sentinel AI colors
  const accentClasses = {
    danger: "text-accent-red hover:border-accent-red/50 shadow-neon-red/10",
    primary: "text-primary hover:border-primary/50",
    secondary: "text-secondary hover:border-secondary/50",
    success: "text-accent-green"
  };

  return (
    <div className={`bg-surface-dark border border-[#283639] rounded-xl p-5 relative overflow-hidden group transition-all ${accentClasses[variant] || accentClasses.primary}`}>
      {/* Semi-transparent background icon seen in stitch design */}
      <span className="material-symbols-outlined text-6xl absolute right-0 top-0 opacity-10 group-hover:opacity-20 transition-opacity p-2">
        {icon}
      </span>

      <div className="relative z-10">
        <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
        <h3 className={`text-3xl font-bold tracking-tight mb-2 ${variant === 'danger' ? 'text-accent-red' : 'text-white'}`}>
          {value}
        </h3>
        
        {subtext && (
          <p className={`text-sm flex items-center gap-1 font-medium ${variant === 'danger' ? 'text-accent-red' : 'text-accent-green'}`}>
            <span className="material-symbols-outlined text-sm">{trendIcon || 'trending_up'}</span>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}