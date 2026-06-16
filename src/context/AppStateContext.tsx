import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from "react";
import { defaultUserState } from "../data/defaultState";
import { languages } from "../data/languages";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { xpForNextLevel } from "../lib/utils";
import { Language, Lesson, ScreenId, UserState } from "../types";

interface LessonResultPayload {
  lessonId: string;
  hits: number;
  misses: number;
  xpEarned: number;
}

interface AppStateContextValue {
  user: UserState;
  languages: Language[];
  selectedLanguage: Language;
  selectedLesson: Lesson | null;
  lastLessonResult: LessonResultPayload | null;
  setSelectedLanguage: (code: UserState["selectedLanguage"]) => void;
  setActiveScreen: (screen: ScreenId) => void;
  startLesson: (lessonId: string) => void;
  openMiniGames: () => void;
  submitLessonResult: (payload: LessonResultPayload) => void;
  claimDailyMission: () => void;
  resetProgress: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

function findLessonById(lessonId: string) {
  for (const language of languages) {
    for (const unit of language.units) {
      const lesson = unit.lessons.find((entry) => entry.id === lessonId);
      if (lesson) return lesson;
    }
  }

  return null;
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorageState<UserState>("linguanex-user-state-local-v1", defaultUserState);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lastLessonResult, setLastLessonResult] = useState<LessonResultPayload | null>(null);

  const selectedLanguage =
    languages.find((language) => language.code === user.selectedLanguage) ?? languages[0];
  const selectedLesson = selectedLessonId ? findLessonById(selectedLessonId) : null;

  const value = useMemo<AppStateContextValue>(
    () => ({
      user,
      languages,
      selectedLanguage,
      selectedLesson,
      lastLessonResult,
      setSelectedLanguage: (code) => {
        setUser((current) => ({ ...current, selectedLanguage: code, activeScreen: "dashboard" }));
      },
      setActiveScreen: (screen) => {
        setUser((current) => ({ ...current, activeScreen: screen }));
      },
      startLesson: (lessonId) => {
        setSelectedLessonId(lessonId);
        setUser((current) => ({ ...current, activeScreen: "lesson" }));
      },
      openMiniGames: () => {
        setSelectedLessonId(null);
        setUser((current) => ({ ...current, activeScreen: "games" }));
      },
      submitLessonResult: ({ lessonId, hits, misses, xpEarned }) => {
        const lesson = findLessonById(lessonId);
        if (!lesson) return;
        setLastLessonResult({ lessonId, hits, misses, xpEarned });

        const languageCode = lessonId.slice(0, 2) as UserState["selectedLanguage"];

        setUser((current) => {
          const languageProgress = current.languageProgress[languageCode];
          const completedLessonIds = Array.from(new Set([...languageProgress.completedLessonIds, lessonId]));
          const unlockedLessonIds = new Set([...languageProgress.unlockedLessonIds, lessonId]);

          const currentLanguage = languages.find((language) => language.code === languageCode);
          currentLanguage?.units.forEach((unit) => {
            unit.lessons.forEach((candidate) => {
              const requirementsMet = candidate.requiredLessonIds.every((requiredId) =>
                completedLessonIds.includes(requiredId)
              );

              if (requirementsMet) {
                unlockedLessonIds.add(candidate.id);
              }
            });
          });

          const totalXp = current.xp + xpEarned;
          const nextLevelTarget = xpForNextLevel(current.level);
          const leveledUp = totalXp >= nextLevelTarget;
          const updatedBadges = current.badges.map((badge) =>
            badge.id === "scribe" && lesson.exercises.some((exercise) => exercise.type === "draw")
              ? { ...badge, unlocked: true }
              : badge
          );

          return {
            ...current,
            xp: totalXp,
            level: leveledUp ? current.level + 1 : current.level,
            coins: current.coins + Math.round(xpEarned * 1.5),
            gems: current.gems + (hits >= misses ? 20 : 10),
            streak: current.streak + 1,
            dailyMissionProgress: Math.min(20, current.dailyMissionProgress + Math.max(1, hits)),
            weeklyProgress: Math.min(100, current.weeklyProgress + Math.round(xpEarned / 10)),
            totalHits: current.totalHits + hits,
            totalMisses: current.totalMisses + misses,
            activeScreen: "result",
            badges: updatedBadges,
            languageProgress: {
              ...current.languageProgress,
              [languageCode]: {
                unlockedLessonIds: Array.from(unlockedLessonIds),
                completedLessonIds,
                lessonScores: {
                  ...languageProgress.lessonScores,
                  [lessonId]: { hits, misses, xpEarned }
                }
              }
            }
          };
        });
      },
      claimDailyMission: () => {
        setUser((current) => ({
          ...current,
          coins: current.coins + 150,
          gems: current.gems + 30,
          xp: current.xp + 300,
          dailyMissionProgress: 0
        }));
      },
      resetProgress: () => {
        setSelectedLessonId(null);
        setUser(defaultUserState);
      }
    }),
    [lastLessonResult, selectedLanguage, selectedLesson, setUser, user]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
