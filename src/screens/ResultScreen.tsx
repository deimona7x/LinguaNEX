import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { calculateAccuracy } from "../lib/utils";
import { Panel } from "../components/Panel";

export function ResultScreen() {
  const { lastLessonResult, startLesson, setActiveScreen } = useAppState();

  if (!lastLessonResult) {
    return (
      <Panel className="rounded-[32px] p-8">
        <p className="text-lg text-slate-300">Nenhum resultado recente disponível.</p>
      </Panel>
    );
  }

  const accuracy = calculateAccuracy(lastLessonResult.hits, lastLessonResult.misses);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Panel className="rounded-[36px] p-8 text-center">
        <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full border border-lime-300/40 bg-lime-400/10 text-lime-100">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-lime-200">Mission Complete</p>
        <h2 className="mt-3 font-display text-5xl text-white">Resultado da lição</h2>
        <p className="mt-3 text-xl text-slate-300">Você concluiu a sessão com progresso salvo localmente.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Acertos", value: `${lastLessonResult.hits}` },
            { label: "Erros", value: `${lastLessonResult.misses}` },
            { label: "Precisão", value: `${accuracy}%` },
            { label: "XP", value: `${lastLessonResult.xpEarned}` }
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
              <p className="mt-2 font-display text-4xl text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => startLesson(lastLessonResult.lessonId)}
            className="rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-5 py-3 text-lg text-cyan-100"
          >
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Repetir lição
            </span>
          </button>
          <button
            onClick={() => setActiveScreen("dashboard")}
            className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/10 px-5 py-3 text-lg text-white"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Voltar ao dashboard
            </span>
          </button>
        </div>
      </Panel>
    </div>
  );
}
