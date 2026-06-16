import { UserState } from "../types";

export const defaultUserState: UserState = {
  xp: 0,
  level: 1,
  coins: 0,
  gems: 0,
  streak: 0,
  energy: 50,
  selectedLanguage: "ja",
  activeScreen: "dashboard",
  profileName: "LinguaNEX",
  dailyMissionProgress: 0,
  weeklyProgress: 0,
  totalHits: 0,
  totalMisses: 0,
  badges: [
    { id: "starter", title: "Boot Sequence", description: "Conclua a primeira lição", icon: "⚡", unlocked: false },
    { id: "listener", title: "Neon Ears", description: "Acertar 5 desafios de áudio", icon: "🎧", unlocked: false },
    { id: "scribe", title: "Glyph Runner", description: "Concluir 3 exercícios de escrita", icon: "✍️", unlocked: false },
    { id: "combo", title: "Streak Core", description: "Manter 7 dias seguidos", icon: "🔥", unlocked: false }
  ],
  languageProgress: {
    ja: {
      unlockedLessonIds: ["ja-hiragana"],
      completedLessonIds: [],
      lessonScores: {}
    },
    zh: {
      unlockedLessonIds: ["zh-pinyin"],
      completedLessonIds: [],
      lessonScores: {}
    },
    en: {
      unlockedLessonIds: [],
      completedLessonIds: [],
      lessonScores: {}
    },
    es: {
      unlockedLessonIds: [],
      completedLessonIds: [],
      lessonScores: {}
    }
  }
};
