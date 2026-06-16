import { useMemo, useState } from "react";
import { Ear, Grid2x2, Languages, PenSquare, Timer } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { speakText } from "../lib/speech";
import { Exercise } from "../types";
import { MiniGameCard } from "../components/MiniGameCard";
import { Panel } from "../components/Panel";

type ArcadeMode = "translation" | "listening" | "memory" | "draw" | "speed";

const modeMap = {
  translation: { title: "Quiz de tradução", subtitle: "Escolha o significado correto.", icon: Languages, xp: 100 },
  listening: { title: "Escuta/pronúncia", subtitle: "Ouça e identifique o item.", icon: Ear, xp: 120 },
  memory: { title: "Memory match", subtitle: "Combine termo e significado.", icon: Grid2x2, xp: 100 },
  draw: { title: "Glyph draw", subtitle: "Tente desenhar o caractere.", icon: PenSquare, xp: 150 },
  speed: { title: "Speed run", subtitle: "Responda no limite do tempo.", icon: Timer, xp: 140 }
};

export function MiniGamesScreen() {
  const { selectedLanguage, user } = useAppState();
  const [activeMode, setActiveMode] = useState<ArcadeMode>("translation");

  const exercises = useMemo(
    () =>
      selectedLanguage.units
        .flatMap((unit) => unit.lessons)
        .flatMap((lesson) => lesson.exercises)
        .filter((exercise) => exercise.type === activeMode),
    [activeMode, selectedLanguage]
  );

  const activeExercise: Exercise | undefined = exercises[0];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Arcade Hub</p>
        <h2 className="font-display text-4xl text-white">Mini games funcionais</h2>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {(Object.keys(modeMap) as ArcadeMode[]).map((mode) => {
          const item = modeMap[mode];
          return (
            <MiniGameCard
              key={mode}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              xp={item.xp}
              active={activeMode === mode}
              onClick={() => setActiveMode(mode)}
            />
          );
        })}
      </div>

      <Panel className="rounded-[32px] p-6 md:p-7">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.26em] text-fuchsia-300">{selectedLanguage.name}</p>
            <h3 className="break-words font-display text-3xl leading-none text-white md:text-4xl">
              {modeMap[activeMode].title}
            </h3>
          </div>
          <div className="w-fit shrink-0 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-lg text-cyan-100">
            Accuracy {Math.round((user.totalHits / Math.max(1, user.totalHits + user.totalMisses)) * 100)}%
          </div>
        </div>

        {activeExercise ? (
          <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Prompt</p>
              <h4 className="mt-4 font-display text-[2.15rem] leading-[1.02] text-white md:text-[2.7rem]">
                {activeExercise.prompt}
              </h4>
              {activeExercise.clue ? (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{activeExercise.clue}</p>
              ) : null}
              {activeExercise.audioText ? (
                <button
                  onClick={() => speakText(selectedLanguage.code, activeExercise.audioText!)}
                  className="mt-6 rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-5 py-3 text-lg text-cyan-100"
                >
                  Ouvir
                </button>
              ) : null}
            </div>

            <div className="space-y-4">
              {activeExercise.options?.map((option) => (
                <div
                  key={option.id}
                  className="flex min-h-[76px] items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg leading-7 text-white"
                >
                  {option.label}
                </div>
              ))}
              {activeExercise.type === "memory" ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {activeExercise.pairs?.map((pair) => (
                    <div
                      key={pair.id}
                      className="flex min-h-[88px] items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 px-4 py-4 text-center text-2xl text-white"
                    >
                      {pair.label}
                    </div>
                  ))}
                </div>
              ) : null}
              {activeExercise.type === "draw" ? (
                <div className="rounded-[24px] border border-lime-300/20 bg-lime-400/10 p-6 text-center">
                  <div className="font-display text-8xl text-white">{activeExercise.content}</div>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    No modo lição você já pode desenhar de verdade no canvas.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-lg text-slate-300">Ainda não há exercício para este modo.</p>
        )}
      </Panel>
    </div>
  );
}
