export type LanguageCode = "ja" | "zh" | "en" | "es";

export type ExerciseKind =
  | "translation"
  | "listening"
  | "memory"
  | "draw"
  | "speed";

export type ScreenId =
  | "dashboard"
  | "languages"
  | "path"
  | "lesson"
  | "games"
  | "result"
  | "profile"
  | "rewards";

export interface ExerciseOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface Exercise {
  id: string;
  type: ExerciseKind;
  prompt: string;
  clue?: string;
  content?: string;
  answer?: string;
  audioText?: string;
  options?: ExerciseOption[];
  pairs?: Array<{ id: string; label: string; pairId: string }>;
  strokes?: string[];
  seconds?: number;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: "cyan" | "magenta" | "lime" | "gold";
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
  requiredLessonIds: string[];
  theory: string[];
  vocabulary: Array<{ term: string; reading: string; meaning: string }>;
  phrases: Array<{ source: string; reading: string; meaning: string }>;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Language {
  code: LanguageCode;
  name: string;
  icon: string;
  atmosphere: string;
  description: string;
  units: Unit[];
}

export interface UserLanguageProgress {
  unlockedLessonIds: string[];
  completedLessonIds: string[];
  lessonScores: Record<string, { hits: number; misses: number; xpEarned: number }>;
}

export interface RewardBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserState {
  xp: number;
  level: number;
  coins: number;
  gems: number;
  streak: number;
  energy: number;
  selectedLanguage: LanguageCode;
  activeScreen: ScreenId;
  profileName: string;
  dailyMissionProgress: number;
  weeklyProgress: number;
  totalHits: number;
  totalMisses: number;
  badges: RewardBadge[];
  languageProgress: Record<string, UserLanguageProgress>;
}
