import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

interface PanelProps extends PropsWithChildren {
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <section className={cn("glass-panel panel-outline rounded-[24px]", className)}>
      {children}
    </section>
  );
}
