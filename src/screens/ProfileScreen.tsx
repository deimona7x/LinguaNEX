import { Flame, Gem, Shield, Target } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { calculateAccuracy } from "../lib/utils";
import { Panel } from "../components/Panel";

export function ProfileScreen() {
  const { user, resetProgress } = useAppState();
  const accuracy = calculateAccuracy(user.totalHits, user.totalMisses);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Panel className="rounded-[32px] p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[24px] border border-fuchsia-400/50 bg-fuchsia-500/10 text-4xl">
            🧠
          </div>
          <div>
            <h2 className="font-display text-4xl text-white">{user.profileName}</h2>
            <p className="text-xl text-slate-300">Neon Polyglot • Level {user.level}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Precisão", value: `${accuracy}%`, icon: Target },
            { label: "Streak", value: `${user.streak} dias`, icon: Flame },
            { label: "Gems", value: user.gems.toLocaleString("pt-BR"), icon: Gem },
            { label: "Badges", value: `${user.badges.filter((badge) => badge.unlocked).length}`, icon: Shield }
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">{label}</span>
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <p className="font-display text-3xl text-white">{value}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="rounded-[32px] p-6">
        <h3 className="font-display text-3xl text-white">Configuração rápida</h3>
        <p className="mt-2 text-lg text-slate-300">
          Protótipo local com persistência no navegador. Você pode reiniciar tudo a qualquer momento.
        </p>
        <button
          onClick={resetProgress}
          className="mt-6 w-full rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-lg text-red-100 transition hover:bg-red-500/20"
        >
          Resetar progresso local
        </button>
      </Panel>
    </div>
  );
}
