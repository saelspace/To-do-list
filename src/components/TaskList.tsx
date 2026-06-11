import { useState } from 'react';
import { Check, Trash2, Clock, Inbox, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task, TaskCategory, TaskPriority } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted: () => void;
}

export default function TaskList({ tasks, onToggleComplete, onDeleteTask, onClearCompleted }: TaskListProps) {
  const [activeTab, setActiveTab] = useState<TaskCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: TaskCategory[] = ['all', 'Personal', 'Work', 'Wellness', 'Focus'];

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case 'low': return 'border-sky-500/20 text-sky-200 bg-sky-500/10';
      case 'medium': return 'border-purple-500/20 text-purple-200 bg-purple-500/10';
      case 'high': return 'border-rose-500/30 text-rose-200 bg-rose-500/15';
    }
  };

  const getPriorityDot = (p: TaskPriority) => {
    switch (p) {
      case 'low': return 'bg-sky-400';
      case 'medium': return 'bg-purple-400';
      case 'high': return 'bg-rose-400 animate-pulse';
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesCategory = activeTab === 'all' || task.category === activeTab;
      const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

  const completedCount = filteredTasks.filter(t => t.completed).length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-transparent">
      {/* Search and Category selectors combined with frosted look */}
      <div className="px-6 pt-4 pb-2 flex flex-col gap-3 shrink-0 border-b border-white/10 bg-white/2">
        {/* Transparent search bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            id="task-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flow state tasks..."
            className="w-full pl-9 pr-4 py-2 bg-white/5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-400/70 font-medium border border-white/8"
          />
        </div>

        {/* Tab horizontal list */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {categories.map((tab) => {
            const count = tab === 'all' 
              ? tasks.length 
              : tasks.filter(t => t.category === tab).length;

            const isActive = activeTab === tab;

            return (
              <button
                id={`tab-filter-${tab}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap font-medium flex items-center gap-1.5 border shrink-0 ${
                  isActive
                    ? 'bg-white text-slate-950 border-white font-semibold'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/12 hover:text-white'
                }`}
              >
                <span>{tab === 'all' ? 'All Flow' : tab}</span>
                {count > 0 && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive 
                      ? 'bg-slate-950 text-white' 
                      : 'bg-white/10 text-slate-300'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actual tasks list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-[350px]">
        <AnimatePresence initial={false}>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center justify-center py-20 text-center px-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-purple-300 border border-white/10 mb-4">
                <Inbox size={22} className="stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-medium text-white">
                {searchQuery ? "No matching reflections" : "A quiet, clear mind"}
              </h3>
              <p className="text-xs text-slate-300/80 mt-1 max-w-[220px] leading-relaxed">
                {searchQuery 
                  ? "Try searching for another keyword or check active category filters." 
                  : "All intentions are complete. Add a new focus path or relax."
                }
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTasks.map((task) => (
                <motion.div
                  id={`task-item-${task.id}`}
                  key={task.id}
                  layoutId={task.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`p-4 rounded-2xl border transition-all duration-200 group relative ${
                    task.completed
                      ? 'bg-white/3 border-white/5 opacity-55'
                      : 'bg-white/7 border-white/12 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Checkbox */}
                    <button
                      id={`toggle-task-${task.id}`}
                      onClick={() => onToggleComplete(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 mt-0.5 ${
                        task.completed
                          ? 'bg-purple-500 border-purple-500 text-white shadow-sm shadow-purple-500/20'
                          : `bg-transparent hover:scale-105 border-slate-400 hover:border-purple-300`
                      }`}
                    >
                      {task.completed && <Check size={12} strokeWidth={3} />}
                    </button>

                    {/* Content text */}
                    <div className="flex-1 min-w-0 pr-6">
                      <p className={`text-xs font-semibold leading-relaxed transition-all duration-200 text-white break-words ${
                        task.completed ? 'line-through text-slate-400 font-medium' : ''
                      }`}>
                        {task.text}
                      </p>

                      {/* Notes context */}
                      {task.notes && (
                        <p className={`text-[10px] mt-1 italic break-words leading-normal ${
                          task.completed ? 'text-slate-400/50' : 'text-purple-200/80'
                        }`}>
                          "{task.notes}"
                        </p>
                      )}

                      {/* Info and Tags footer list */}
                      <div className="flex flex-wrap items-center gap-2 mt-2 pt-1">
                        <span className="text-[9px] font-semibold text-slate-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider scale-95 origin-left">
                          {task.category}
                        </span>

                        {task.estimateMinutes && (
                          <span className="text-[9px] font-medium text-slate-300 flex items-center gap-1">
                            <Clock size={10} className="text-slate-400" />
                            {task.estimateMinutes}m
                          </span>
                        )}

                        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-300 capitalize">
                          <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)}`} />
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    {/* Absolute positioned delete button */}
                    <button
                      id={`delete-task-${task.id}`}
                      onClick={() => onDeleteTask(task.id)}
                      className="absolute right-3.5 top-3.5 p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                      title="Release Task"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear completed banner if they exist */}
      {completedCount > 0 && (
        <div className="px-6 py-2.5 bg-white/5 border-t border-white/5 flex justify-between items-center shrink-0">
          <span className="text-[10px] text-slate-300 font-medium italic">
            You completed {completedCount} flow {completedCount > 1 ? 'items' : 'item'} here
          </span>
          <button
            id="clear-completed-btn"
            onClick={onClearCompleted}
            className="text-[10px] font-bold text-rose-450 hover:text-rose-300 transition-colors uppercase tracking-widest cursor-pointer"
          >
            Clear Finished
          </button>
        </div>
      )}
    </div>
  );
}
