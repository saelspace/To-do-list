import { motion } from 'motion/react';
import { Target, Smile, Flame, Sparkles } from 'lucide-react';
import { Task } from '../types';

interface StatisticsProps {
  tasks: Task[];
}

export default function Statistics({ tasks }: StatisticsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Calculate total time estimated for completed tasks
  const totalMinutesCompleted = tasks
    .filter(t => t.completed)
    .reduce((acc, current) => acc + (current.estimateMinutes || 0), 0);

  // Format total minutes beautifully
  const formatFocusedTime = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  // Get a mindful progress caption based on status
  const getMindfulState = (percent: number, count: number) => {
    if (count === 0) return { title: "Pristine Space", text: "Ready to capture thoughts and design intent." };
    if (percent === 0) return { title: "Still Waters", text: "Your path is clear. Begin with a single deliberate breath." };
    if (percent < 40) return { title: "Soft Initiation", text: "Gentle momentum builds as you check your tasks." };
    if (percent < 80) return { title: "Steady Flow", text: "Deep attention. You are perfectly in your creative zone." };
    if (percent < 100) return { title: "Sublime Progress", text: "Nearly home. Focus fully on the final remaining threads." };
    return { title: "Clear Zenith", text: "Outstanding focus! Enjoy the space and quiet clarity." };
  };

  const currentMindfulState = getMindfulState(percentage, total);

  return (
    <div className="p-6 bg-white/4 border-t border-white/10 rounded-b-[36px] shrink-0">
      <div className="flex flex-col gap-4">
        {/* Progress header slider */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-purple-300">
            <Target size={14} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Flow Completion</span>
          </div>
          <span className="text-sm font-bold text-white font-sans">{percentage}%</span>
        </div>

        {/* Beautiful progress track with glow */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="h-full bg-gradient-to-r from-purple-400 via-indigo-400 to-rose-400 shadow-[0_0_8px_rgba(192,132,252,0.4)]"
          />
        </div>

        {/* Bento grid layout for stats metrics */}
        <div className="grid grid-cols-2 gap-3.5 mt-1">
          {/* Minutes completed metric */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/8 flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/10">
              <Flame size={15} />
            </div>
            <div>
              <span className="text-[9px] text-slate-300 font-semibold tracking-wider block uppercase">Focused Time</span>
              <span className="text-xs font-bold text-white font-sans">{formatFocusedTime(totalMinutesCompleted)}</span>
            </div>
          </div>

          {/* Core ratio metric */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/8 flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 text-rose-300 rounded-xl border border-rose-500/10">
              <Smile size={15} />
            </div>
            <div>
              <span className="text-[9px] text-slate-300 font-semibold tracking-wider block uppercase">Completed</span>
              <span className="text-xs font-bold text-white font-sans">{completed}/{total} items</span>
            </div>
          </div>
        </div>

        {/* Dynamic description of mindfulness */}
        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl mt-1">
          <div className="flex items-start gap-2">
            <Sparkles size={11} className="text-purple-300 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">{currentMindfulState.title}</h4>
              <p className="text-[10px] text-slate-300/90 leading-normal mt-0.5">{currentMindfulState.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
