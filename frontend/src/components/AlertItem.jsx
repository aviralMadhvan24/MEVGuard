export default function AlertItem({ wallet, amount, score, subtitle, severity, time, onClick }) {
  const severityColors = {
    high: "border-l-accent-red",
    warning: "border-l-yellow-500",
    anomalous: "border-l-secondary"
  };

  return (
    <div onClick={onClick} className={`bg-[#111718] p-3 rounded-lg border border-l-4 border-[#283639] ${severityColors[severity]} hover:bg-[#1c2628] transition-colors cursor-pointer group`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-opacity-20 ${severity === 'high' ? 'bg-accent-red/20 text-accent-red' : 'bg-yellow-500/20 text-yellow-500'}`}>
          {severity} Risk
        </span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-white font-mono text-sm group-hover:text-primary transition-colors">{wallet}</span>
        <span className="text-white font-bold text-sm">{amount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">{subtitle}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Score:</span>
          <span className={`${severity === 'high' ? 'text-accent-red' : 'text-yellow-500'} font-bold text-xs`}>{score}</span>
        </div>
      </div>
    </div>
  );
}