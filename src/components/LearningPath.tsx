import { Lock, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Lesson } from "../types";
import { cn } from "../lib/utils";

interface LearningPathProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  unlockedLessonIds: string[];
  onStartLesson: (lessonId: string) => void;
}

const accentStyles = {
  cyan: "border-cyan-300/60 bg-cyan-400/10 text-cyan-100 shadow-neon",
  magenta: "border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-100 shadow-magenta",
  lime: "border-lime-300/60 bg-lime-400/10 text-lime-100",
  gold: "border-amber-300/60 bg-amber-300/10 text-amber-100"
};

export function LearningPath({
  lessons,
  completedLessonIds,
  unlockedLessonIds,
  onStartLesson
}: LearningPathProps) {
  return (
    <div className="scene-panel relative overflow-hidden rounded-[32px] border border-cyan-300/20 p-6 md:p-8">
      <div className="relative z-10 mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-fuchsia-300">Learning Path</p>
          <h2 className="font-display text-3xl text-white md:text-5xl">Mission Grid</h2>
          <p className="mt-2 text-lg text-slate-200">Lições conectadas, desbloqueio progressivo e boss runs.</p>
        </div>
        <div className="glass-panel rounded-2xl border border-cyan-300/30 px-4 py-3 text-right">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/70">Path Status</p>
          <p className="font-display text-2xl text-white">{completedLessonIds.length}/{lessons.length}</p>
        </div>
      </div>

      <div className="relative z-10 overflow-x-auto pb-4 scrollbar-thin">
        <div className="relative flex min-w-max items-end gap-8 px-2 pt-6">
          <div className="absolute left-0 right-0 top-[6.65rem] h-[4px] bg-gradient-to-r from-cyan via-fuchsia-400 to-lime opacity-80" />
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isUnlocked = unlockedLessonIds.includes(lesson.id);
          const offset = index % 2 === 0 ? "translate-y-0" : "translate-y-10";

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={cn("relative w-[240px] shrink-0", offset)}
            >
              <div
                className={cn(
                  "glass-panel rounded-[28px] border p-4 transition",
                  isUnlocked ? accentStyles[lesson.accent] : "border-white/10 bg-slate-950/45 text-slate-500"
                )}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-current/40 bg-black/30 text-4xl">
                    {lesson.icon}
                  </div>
                  {isCompleted ? (
                    <div className="rounded-full border border-lime-300/50 bg-lime-400/10 p-2 text-lime-200">✓</div>
                  ) : isUnlocked ? (
                    <div className="rounded-full border border-cyan-300/40 bg-cyan-400/10 p-2 text-cyan-100">
                      <Play className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <p className="font-display text-xl">{lesson.title}</p>
                <p className="mt-1 text-base opacity-80">{lesson.subtitle}</p>

                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={cn(
                        "h-4 w-4",
                        starIndex < lesson.difficulty ? "fill-current text-gold" : "text-white/20"
                      )}
                    />
                  ))}
                </div>

                <button
                  disabled={!isUnlocked}
                  onClick={() => onStartLesson(lesson.id)}
                  className={cn(
                    "mt-5 w-full rounded-2xl border px-4 py-3 text-lg font-semibold transition",
                    isUnlocked
                      ? "border-current/40 bg-black/20 hover:bg-black/30"
                      : "cursor-not-allowed border-white/10 bg-white/5"
                  )}
                >
                  {isCompleted ? "Repetir missão" : isUnlocked ? "Iniciar missão" : "Bloqueada"}
                </button>
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
