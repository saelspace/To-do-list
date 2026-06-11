import React, { useState } from 'react';
import { Sparkles, Edit2, Check, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, InspirationalQuote } from '../types';

interface HeaderProps {
  user: UserProfile;
  onUpdateUser: (newUser: UserProfile) => void;
  activeQuote: InspirationalQuote;
  onRefreshQuote: () => void;
}

export default function Header({ user, onUpdateUser, activeQuote, onRefreshQuote }: HeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingIntention, setIsEditingIntention] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [intentionInput, setIntentionInput] = useState(user.mindfulIntention);

  const saveName = () => {
    if (nameInput.trim()) {
      onUpdateUser({ ...user, name: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  const saveIntention = () => {
    onUpdateUser({ ...user, mindfulIntention: intentionInput.trim() });
    setIsEditingIntention(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, saveFn: () => void) => {
    if (e.key === 'Enter') {
      saveFn();
    }
  };

  return (
    <div className="pt-7 pb-5 px-6 border-b border-white/10 bg-white/4 rounded-t-[36px] relative overflow-hidden shrink-0">
      {/* Soft mesh background glows */}
      <div className="absolute right-[-10%] top-[-20%] w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute left-[-5%] bottom-[-10%] w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-purple-200 uppercase bg-purple-500/20 border border-purple-500/15 px-2.5 py-1 rounded-full">
              Mindful Flow Space
            </span>
            <div className="flex items-center gap-1.5 mt-2.5 group">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    id="edit-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onBlur={saveName}
                    onKeyDown={(e) => handleKeyPress(e, saveName)}
                    className="text-2xl font-bold text-white border-b-2 border-purple-400 focus:outline-none w-48 bg-transparent"
                    autoFocus
                  />
                  <button id="save-name-btn" onClick={saveName} className="text-purple-300 hover:text-white">
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
                    Be present, {user.name}
                  </h1>
                  <button
                    id="edit-name-trigger"
                    onClick={() => setIsEditingName(true)}
                    className="opacity-0 group-hover:opacity-72 hover:!opacity-100 transition-opacity text-slate-300 cursor-pointer"
                    title="Customize Name"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <motion.button
            id="refresh-quote-btn"
            whileTap={{ scale: 0.95 }}
            onClick={onRefreshQuote}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/10 flex items-center justify-center cursor-pointer shadow-sm"
            title="Refresh Serene Quote"
          >
            <Compass size={16} />
          </motion.button>
        </div>

        {/* Intention statement banner */}
        <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 relative group">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <span className="text-[9px] font-semibold tracking-widest text-slate-300 uppercase block mb-1">
                Intention for Today
              </span>
              {isEditingIntention ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    id="edit-intention-input"
                    type="text"
                    value={intentionInput}
                    onChange={(e) => setIntentionInput(e.target.value)}
                    onBlur={saveIntention}
                    onKeyDown={(e) => handleKeyPress(e, saveIntention)}
                    className="text-xs text-white font-medium border-b border-purple-400 focus:outline-none w-full bg-transparent"
                    placeholder="Set a focal priority..."
                    autoFocus
                  />
                  <button id="save-intention-btn" onClick={saveIntention} className="text-purple-300">
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <p className="text-xs text-slate-200 font-medium leading-relaxed italic pr-4">
                    "{user.mindfulIntention || 'Set a daily mindfulness priority...'}"
                  </p>
                  <button
                    id="edit-intention-trigger"
                    onClick={() => setIsEditingIntention(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Edit2 size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Daily quote container */}
        <div className="text-[11.5px] text-slate-200 leading-relaxed italic font-light flex items-start gap-1.5 pt-1">
          <Sparkles size={11} className="text-rose-400 shrink-0 mt-0.5 animate-pulse" />
          <span className="leading-snug">
            "{activeQuote.text}" — <span className="not-italic text-sky-300 font-semibold">{activeQuote.author}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
