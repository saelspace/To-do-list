import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskCategory, TaskPriority } from '../types';

interface TaskInputProps {
  onAddTask: (text: string, category: TaskCategory, priority: TaskPriority, notes?: string, estimateMinutes?: number) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Exclude<TaskCategory, 'all'>>('Personal');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [notes, setNotes] = useState('');
  const [estimateMinutes, setEstimateMinutes] = useState<number>(30);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic aesthetic class for current priority setting in Frosted Glass style
  const getPriorityAccent = (p: TaskPriority) => {
    switch (p) {
      case 'low': return 'bg-sky-500/25 text-sky-200 border-sky-400/40';
      case 'medium': return 'bg-purple-500/25 text-purple-200 border-purple-400/40';
      case 'high': return 'bg-rose-500/25 text-rose-200 border-rose-400/40';
    }
  };

  const categories: Exclude<TaskCategory, 'all'>[] = ['Personal', 'Work', 'Wellness', 'Focus'];
  const priorities: TaskPriority[] = ['low', 'medium', 'high'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAddTask(
      text.trim(),
      category,
      priority,
      notes.trim() ? notes.trim() : undefined,
      estimateMinutes
    );

    // Reset fields
    setText('');
    setNotes('');
    setEstimateMinutes(30);
    setIsExpanded(false);
  };

  return (
    <form id="task-input-form" onSubmit={handleSubmit} className="px-6 py-4 bg-white/3 border-b border-white/10 shrink-0">
      <div className="flex flex-col gap-3">
        {/* Main input wrapper */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              id="task-title-input"
              type="text"
              required
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (e.target.value.trim() && !isExpanded) {
                  setIsExpanded(true);
                }
              }}
              placeholder="Add details of what you'll create today..."
              className="w-full pl-4 pr-14 py-3.5 bg-white/7 text-sm rounded-2xl text-white placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-purple-400/50 transition-all border border-white/12 font-medium"
            />
            {text.trim() && (
              <button
                id="toggle-expand-btn"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-purple-300 font-bold uppercase tracking-wider hover:text-white cursor-pointer transition-colors"
              >
                {isExpanded ? "Less" : "More"}
              </button>
            )}
          </div>

          <motion.button
            id="add-task-submit"
            type="submit"
            whileTap={{ scale: 0.94 }}
            className={`p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md ${
              text.trim() 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border border-purple-400/20 shadow-purple-500/10' 
                : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
            }`}
            disabled={!text.trim()}
          >
            <Plus size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Expandable attributes block */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden flex flex-col gap-4 pt-2.5 pb-2 border-t border-white/10 mt-1"
            >
              {/* Category flow selection */}
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase mb-2 block">
                  Assign Flow Tag
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      id={`category-pill-${cat}`}
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`text-xs px-3.5 py-1.5 rounded-xl transition-all duration-200 border cursor-pointer font-medium ${
                        category === cat
                          ? 'bg-white text-slate-950 border-white font-semibold'
                          : 'bg-white/5 text-slate-300 border-white/5 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority & Estimation stack */}
              <div className="flex flex-col gap-4">
                {/* Priority selection */}
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase mb-2 block">
                    Priority / Energy
                  </span>
                  <div className="flex gap-2 w-full">
                    {priorities.map((p) => (
                      <button
                        id={`priority-pill-${p}`}
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 text-xs py-2 rounded-xl border capitalize transition-all duration-200 cursor-pointer font-medium text-center ${
                          priority === p
                            ? getPriorityAccent(p) + ' font-semibold shadow-sm'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimate time */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase block">
                      Time Estimate
                    </span>
                    <span className="text-xs font-semibold text-purple-200 bg-white/10 px-2.5 py-0.5 rounded-md">
                      {estimateMinutes} mins
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-slate-300 shrink-0" />
                    <input
                      id="estimate-minutes-slider"
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={estimateMinutes}
                      onChange={(e) => setEstimateMinutes(Number(e.target.value))}
                      className="w-full accent-purple-400 bg-white/15 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Extra context / notes */}
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase mb-2 block">
                  Focused Context note (optional)
                </span>
                <input
                  id="task-notes-input"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Focus on quality over speed, use reference layouts..."
                  className="w-full px-3.5 py-2.5 bg-white/5 text-xs rounded-xl text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-400/50"
                  maxLength={100}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
