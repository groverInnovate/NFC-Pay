import { TrendingUp, Award, Activity } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  recentTransactions: number;
}

export default function ScoreCard({ score, recentTransactions }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-neon-green';
    if (score >= 600) return 'text-neon-blue';
    return 'text-neon-purple';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 700) return 'Excellent';
    if (score >= 600) return 'Good';
    return 'Fair';
  };

  return (
    <div className="glass-card relative overflow-hidden group">
      {/* Background glow animated */}
      <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-blue/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display tracking-wider font-semibold text-white/90">PAYMENT SCORE</h2>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
             <Award className="w-5 h-5 text-neon-blue" />
          </div>
        </div>
        
        <div className="flex items-end space-x-4 mb-6">
          <div className={`text-6xl font-bold font-display tracking-tighter ${getScoreColor(score)} drop-shadow-[0_0_15px_rgba(77,124,255,0.4)]`}>
            {score}
          </div>
          <div className="pb-1">
            <p className="text-base font-medium text-white/90 uppercase tracking-widest">{getScoreLabel(score)}</p>
            <p className="text-xs text-white/50 tracking-wide mt-1">Based on on-chain history</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-gray-300 font-medium">Recent Transactions</span>
          </div>
          <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/5">{recentTransactions}</span>
        </div>
      </div>
    </div>
  );
}
