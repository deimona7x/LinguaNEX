import { LucideIcon, Zap } from "lucide-react";
import { Panel } from "./Panel";

interface MiniGameCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  xp: number;
  active?: boolean;
  onClick: () => void;
}

export function MiniGameCard({ title, subtitle, icon: Icon, xp, active = false, onClick }: MiniGameCardProps) {
  return (
    <Panel
      className={`min-w-0 rounded-[28px] p-5 transition ${
        active ? "border-fuchsia-400/60 bg-fuchsia-500/10 shadow-magenta" : ""
      }`}
    >
      <div className="flex h-full min-h-[320px] flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
            <Icon className="h-7 w-7" />
          </div>
          <div className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-sm text-gold">
            {xp} XP
          </div>
        </div>

        <h3 className="min-w-0 min-h-[5.8rem] max-w-full overflow-hidden text-balance break-words font-display text-[1.85rem] leading-[0.92] text-white [word-break:break-word] md:text-[1.95rem]">
          {title}
        </h3>
        <p className="mt-3 min-h-[5.5rem] text-lg leading-8 text-slate-300">{subtitle}</p>
        <button
          onClick={onClick}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/10 px-4 py-3 text-lg text-white transition hover:bg-fuchsia-500/20"
        >
          <Zap className="h-4 w-4" />
          Jogar agora
        </button>
      </div>
    </Panel>
  );
}
