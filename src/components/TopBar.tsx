import { Bolt, Flame, Gem, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useAppState } from "../context/AppStateContext";
import { cn, xpForNextLevel } from "../lib/utils";

export function TopBar() {
  const { user, languages, setSelectedLanguage } = useAppState();
  const xpTarget = xpForNextLevel(user.level);
  const xpProgress = Math.min(100, Math.round((user.xp / xpTarget) * 100));

  return (
    <div className="space-y-5">
      <div className="scene-panel rounded-[34px] border border-cyan-300/15 p-6 md:p-7">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-200/70">LinguaNEX</p>
              <h1 className="font-display text-4xl text-white md:text-6xl">Training Grid</h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-200 md:text-xl">
                Missões, XP, escuta, memória e escrita num fluxo gamificado para evoluir no Japonês e Chinês.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:min-w-[640px]">
              {[
                { label: "Coins", value: user.coins.toLocaleString("pt-BR"), icon: Coins, glow: "text-gold" },
                { label: "Gems", value: user.gems.toLocaleString("pt-BR"), icon: Gem, glow: "text-fuchsia-300" },
                { label: "Energy", value: `${user.energy}/50`, icon: Bolt, glow: "text-cyan-300" },
                { label: "Streak", value: `${user.streak}`, icon: Flame, glow: "text-orange-300" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-panel rounded-[22px] border border-white/10 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-5 w-5", item.glow)} />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                      <p className="font-display text-xl text-white">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => {
                const active = user.selectedLanguage === language.code;
                return (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={cn(
                      "rounded-[22px] border px-5 py-3 text-left transition",
                      active
                        ? "border-fuchsia-400/70 bg-fuchsia-500/20 shadow-magenta"
                        : "glass-panel border-white/10 bg-white/5 hover:border-cyan-300/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.icon}</span>
                      <div>
                        <p className="font-display text-lg text-white">{language.name}</p>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">{language.atmosphere}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="glass-panel xp-pulse min-w-[300px] rounded-[22px] p-4">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">XP corrente</span>
                <span className="font-display text-lg text-white">
                  {user.xp.toLocaleString("pt-BR")} / {xpTarget.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-fuchsia-400 to-lime"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
