import { BookOpen, Gift, Home, Joystick, UserCircle2 } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { cn } from "../lib/utils";
import { ScreenId } from "../types";

const items: Array<{ id: ScreenId; label: string; icon: typeof Home }> = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "path", label: "Trilha", icon: BookOpen },
  { id: "games", label: "Games", icon: Joystick },
  { id: "rewards", label: "Loot", icon: Gift },
  { id: "profile", label: "Perfil", icon: UserCircle2 }
];

export function BottomNav() {
  const { user, setActiveScreen } = useAppState();

  return (
    <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-20px)] max-w-xl -translate-x-1/2 rounded-3xl border border-cyan-300/20 bg-slate-950/80 px-3 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-2">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveScreen(id)}
            className={cn(
              "rounded-2xl px-2 py-3 text-center text-xs uppercase tracking-[0.18em]",
              user.activeScreen === id ? "bg-cyan-400/10 text-cyan-200" : "text-slate-400"
            )}
          >
            <Icon className="mx-auto mb-1 h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
