export interface Task {
  id: string;
  text: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  notes?: string;
  estimateMinutes?: number;
}

export type TaskCategory = 'all' | 'Personal' | 'Work' | 'Wellness' | 'Focus';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface UserProfile {
  name: string;
  mindfulIntention: string;
  showInspirationalQuote: boolean;
  lastCompletedBonusText?: string;
}

export interface InspirationalQuote {
  text: string;
  author: string;
}
