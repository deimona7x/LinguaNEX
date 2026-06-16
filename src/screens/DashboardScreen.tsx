import { BookCheck, Shield, Sparkles, Target } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { calculateAccuracy } from "../lib/utils";
import { LearningPath } from "../components/LearningPath";
import { MiniGameCard } from "../components/MiniGameCard";
import { Panel } from "../components/Panel";
import { ProgressTower } from "../components/ProgressTower";
import { StatCard } from "../components/StatCard";

export function DashboardScreen() {
  const { selectedLanguage, user, startLesson, openMiniGames, claimDailyMission } = useAppState();
  const lessons = selectedLanguage.units.flatMap((unit) => unit.lessons);
  const progress = user.languageProgress[selectedLanguage.code];
  const accuracy = calculateAccuracy(user.totalHits, user.totalMisses);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.8fr_0.92fr]">
        <LearningPath
          lessons={lessons}
          completedLessonIds={progress.completedLessonIds}
          unlockedLessonIds={progress.unlockedLessonIds}
          onStartLesson={startLesson}
        />
        <div className="space-y-6">
          <ProgressTower currentFloor={Math.max(1, progress.completedLessonIds.length + 1)} />

          <Panel className="rounded-[30px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl text-lime-100">Daily Challenge</h3>
              <span className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">10:24:35</span>
            </div>
            <p className="text-lg text-slate-300">Aprenda 20 palavras novas e finalize uma missão rápida.</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime to-cyan"
                style={{ width: `${(user.dailyMissionProgress / 20) * 100}%` }}
              />
            </div>
            <div className="mt-5 flex items-center justify-between text-lg text-white">
              <span>{user.dailyMissionProgress} / 20</span>
              <span>300 XP + 150 coins</span>
            </div>
            <button
              onClick={claimDailyMission}
              className="mt-5 w-full rounded-2xl border border-lime-300/40 bg-lime-400/10 px-4 py-3 text-xl text-lime-100 transition hover:bg-lime-400/20"
            >
              Resgatar boost
            </button>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Precisão" value={`${accuracy}%`} icon={Target} note="Taxa geral de acertos nas missões." />
        <StatCard label="Streak" value={`${user.streak} dias`} icon={Sparkles} note="Mantenha a ofensiva para bônus de XP." />
        <StatCard label="Concluídas" value={`${progress.completedLessonIds.length}`} icon={BookCheck} note="Lições finalizadas neste idioma." />
        <StatCard label="Badges" value={`${user.badges.filter((badge) => badge.unlocked).length}`} icon={Shield} note="Conquistas ativas no perfil." />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Mini Games</p>
            <h3 className="font-display text-3xl text-white">Arcade de treino</h3>
          </div>
          <button
            onClick={openMiniGames}
            className="rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-3 text-lg text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Abrir hub completo
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MiniGameCard title="Quiz" subtitle="Escolha a tradução correta." icon={BookCheck} xp={100} onClick={openMiniGames} />
          <MiniGameCard title="Listening" subtitle="Reconheça palavras pelo áudio." icon={Sparkles} xp={120} onClick={openMiniGames} />
          <MiniGameCard title="Glyph Draw" subtitle="Trace kanji e hanzi." icon={Shield} xp={150} onClick={openMiniGames} />
          <MiniGameCard title="Memory Match" subtitle="Combine termo e significado." icon={Target} xp={100} onClick={openMiniGames} />
          <MiniGameCard title="Speed Run" subtitle="Responda contra o tempo." icon={BookCheck} xp={140} onClick={openMiniGames} />
        </div>
      </div>
    </div>
  );
}
