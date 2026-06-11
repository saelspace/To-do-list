import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flower2, Heart, Moon, Sun } from 'lucide-react';
import { Task, TaskCategory, TaskPriority, UserProfile, InspirationalQuote } from './types';
import { INSPIRATIONAL_QUOTES } from './data/quotes';

// Component imports
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Statistics from './components/Statistics';

const DEFAULTS: { tasks: Task[]; user: UserProfile } = {
  tasks: [
    {
      id: "init-1",
      text: "Drink standard cool water with a splash of fresh lemon",
      category: "Wellness",
      priority: "low",
      completed: true,
      createdAt: new Date().toISOString(),
      notes: "Hydration starts the body's flow state.",
      estimateMinutes: 10
    },
    {
      id: "init-2",
      text: "Refactor task layout into clean, modular components",
      category: "Work",
      priority: "high",
      completed: false,
      createdAt: new Date().toISOString(),
      notes: "Avoid massive single files to prevent token limit overflows.",
      estimateMinutes: 45
    },
    {
      id: "init-3",
      text: "Dust the leaves of the quiet monstera plant",
      category: "Personal",
      priority: "low",
      completed: false,
      createdAt: new Date().toISOString(),
      notes: "Physical beauty outside invites clarity inside.",
      estimateMinutes: 15
    },
    {
      id: "init-4",
      text: "Reflect on design: 10 minutes of completely quiet rest",
      category: "Focus",
      priority: "medium",
      completed: false,
      createdAt: new Date().toISOString(),
      notes: "A quiet space generates the best solutions.",
      estimateMinutes: 10
    }
  ],
  user: {
    name: "Sahaj",
    mindfulIntention: "To draft beautiful, functional code with absolute presence and high-contrast color rhythm",
    showInspirationalQuote: true
  }
};

export default function App() {
  // Load tasks from LocalStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('mindful_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    }
    return DEFAULTS.tasks;
  });

  // Load User profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mindful_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load user profile", e);
      }
    }
    return DEFAULTS.user;
  });

  // Active inspirational quote
  const [quoteIndex, setQuoteIndex] = useState(() => {
    return Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length);
  });

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem('mindful_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persist user profile to localStorage
  useEffect(() => {
    localStorage.setItem('mindful_user', JSON.stringify(user));
  }, [user]);

  // Handle adding a task
  const handleAddTask = (
    text: string,
    category: TaskCategory,
    priority: TaskPriority,
    notes?: string,
    estimateMinutes?: number
  ) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text,
      category,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      notes,
      estimateMinutes
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Toggle task completed state
  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete/release a task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleRefreshQuote = () => {
    let nextIndex = Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length);
    // Ensure we get a fresh quote different from the current one
    while (INSPIRATIONAL_QUOTES.length > 1 && nextIndex === quoteIndex) {
      nextIndex = Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length);
    }
    setQuoteIndex(nextIndex);
  };

  const activeQuote = INSPIRATIONAL_QUOTES[quoteIndex];

  return (
    <div id="aesthetic-sandbox-root" className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#0b0f19] selection:bg-purple-500/30 selection:text-white overflow-x-hidden antialiased relative">
      {/* Dynamic mesh gradients for Frosted Glass theme */}
      <div className="fixed top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-radial from-[#c084fc]/30 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-radial from-[#38bdf8]/30 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-radial from-[#fb7185]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Main Single-View App Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md flex flex-col bg-white/8 backdrop-blur-2xl rounded-[36px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative min-h-[680px] overflow-hidden"
      >
        {/* Mock top phone system glass reflex */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-white/10 rounded-t-[36px] pointer-events-none border-b border-white/5 z-20" />

        {/* 1. Header component */}
        <Header
          user={user}
          onUpdateUser={setUser}
          activeQuote={activeQuote}
          onRefreshQuote={handleRefreshQuote}
        />

        {/* 2. Task input form */}
        <TaskInput onAddTask={handleAddTask} />

        {/* 3. Real interactive task scroll list */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onClearCompleted={handleClearCompleted}
        />

        {/* 4. Statistics, ratio bar, feedback block */}
        <Statistics tasks={tasks} />

        {/* External branding label - kept highly humble, clean and aesthetic */}
        <div className="absolute -bottom-8 left-12 right-12 flex justify-between items-center px-2 opacity-50 select-none text-[9px] uppercase tracking-widest text-slate-400 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1">
            <Flower2 size={10} className="text-purple-400" />
            Designed for Flow
          </span>
          <span className="flex items-center gap-1">
            Carefully Crafted
            <Heart size={8} className="text-rose-400 inline" />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
