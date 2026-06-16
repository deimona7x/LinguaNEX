import { LucideIcon } from "lucide-react";
import { Panel } from "./Panel";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  note: string;
}

export function StatCard({ label, value, icon: Icon, note }: StatCardProps) {
  return (
    <Panel className="rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">{label}</span>
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div className="font-display text-4xl text-white">{value}</div>
      <p className="mt-2 text-base text-slate-400">{note}</p>
    </Panel>
  );
}
