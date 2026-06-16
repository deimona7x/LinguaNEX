import {
  BookOpen,
  Gift,
  Globe2,
  Home,
  Joystick,
  Trophy,
  UserCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppState } from "../context/AppStateContext";
import { cn } from "../lib/utils";
import { ScreenId } from "../types";
import { Panel } from "./Panel";

const navItems: Array<{ id: ScreenId; label: string; icon: typeof Home }> = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "languages", label: "Idiomas", icon: Globe2 },
  { id: "path", label: "Trilha", icon: BookOpen },
  { id: "games", label: "Mini Games", icon: Joystick },
  { id: "rewards", label: "Recompensas", icon: Gift },
  { id: "profile", label: "Perfil", icon: UserCircle2 }
];

export function Sidebar() {
  const { user, setActiveScreen } = useAppState();

  return (
    <Panel className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[288px] flex-col overflow-hidden p-5 lg:flex">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-fuchsia-400/50 bg-fuchsia-500/10 text-3xl shadow-magenta">
          🦊
        </div>
        <div>
          <p className="font-display text-xl text-white">{user.profileName}</p>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Neon Polyglot</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <div className="mb-4 flex items-end justify-between">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-cyan-200">Level</span>
          <Trophy className="h-4 w-4 text-gold" />
        </div>
        <div className="font-display text-6xl leading-none text-cyan-200">{user.level}</div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan to-lime"
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
          />
        </div>
      </div>

      <nav className="space-y-2 overflow-y-auto pr-1 scrollbar-thin">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = user.activeScreen === id;
          return (
            <button
              key={id}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                active
                  ? "border-cyan-300/60 bg-cyan-400/10 text-white shadow-neon"
                  : "border-white/8 bg-white/5 text-slate-300 hover:border-fuchsia-300/40 hover:text-white"
              )}
              onClick={() => setActiveScreen(id)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-lg">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-5 rounded-[28px] border border-lime-400/20 bg-gradient-to-b from-lime-400/10 to-cyan-500/5 p-4">
        <div className="mb-2 text-5xl">🐈‍⬛</div>
        <p className="text-base text-lime-100">Hoje tambem treinamos reflexo, escuta e escrita.</p>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-cyan-100/70">Companion online</p>
      </div>
    </Panel>
  );
}
