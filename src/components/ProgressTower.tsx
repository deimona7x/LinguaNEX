import { Panel } from "./Panel";

interface ProgressTowerProps {
  currentFloor: number;
}

export function ProgressTower({ currentFloor }: ProgressTowerProps) {
  return (
    <Panel className="rounded-[30px] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl text-cyan-100">Progress Tower</h3>
        <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Current Floor {currentFloor}</span>
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="scene-panel rounded-[26px] border border-cyan-300/20 p-6 text-center">
          <div className="relative z-10">
            <div className="mx-auto w-fit text-[6rem] leading-none">🗼</div>
            <p className="font-display text-3xl text-white">Tower Sync</p>
          </div>
        </div>
        <div className="space-y-4 md:min-w-[92px]">
          {[5, 4, 3, 2, 1].map((floor) => (
            <div key={floor} className="flex items-center gap-3">
              <div className="w-5 text-sm text-slate-400">{floor}</div>
              <div className="h-[2px] flex-1 bg-white/10" />
              <div className="text-xl">{floor <= currentFloor ? "✅" : "🔒"}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
