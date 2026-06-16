import { Crown, Gift, Lock } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { Panel } from "../components/Panel";

export function RewardsScreen() {
  const { user } = useAppState();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-gold/70">Rewards Vault</p>
              <h2 className="font-display text-4xl text-white">Baú de recompensas</h2>
            </div>
            <Gift className="h-8 w-8 text-gold" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-gold/30 bg-gold/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Coins</p>
              <p className="mt-2 font-display text-4xl text-white">{user.coins.toLocaleString("pt-BR")}</p>
            </div>
            <div className="rounded-[24px] border border-fuchsia-300/30 bg-fuchsia-500/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-200">Gems</p>
              <p className="mt-2 font-display text-4xl text-white">{user.gems.toLocaleString("pt-BR")}</p>
            </div>
            <div className="rounded-[24px] border border-cyan-300/30 bg-cyan-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Weekly</p>
              <p className="mt-2 font-display text-4xl text-white">{user.weeklyProgress}%</p>
            </div>
          </div>
        </Panel>

        <Panel className="rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-fuchsia-300">Next chest</p>
          <div className="my-5 text-center text-[7rem] leading-none">🧰</div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan to-fuchsia-400" style={{ width: "67%" }} />
          </div>
          <p className="mt-4 text-center text-lg text-slate-300">3.250 / 4.800 XP para abrir o próximo baú.</p>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {user.badges.map((badge) => (
          <Panel key={badge.id} className="rounded-[28px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-5xl">{badge.icon}</div>
              {badge.unlocked ? <Crown className="h-5 w-5 text-gold" /> : <Lock className="h-5 w-5 text-slate-500" />}
            </div>
            <h3 className="font-display text-2xl text-white">{badge.title}</h3>
            <p className="mt-2 text-lg text-slate-300">{badge.description}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
