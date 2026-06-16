export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function xpForNextLevel(level: number) {
  return 1200 + level * 300;
}

export function calculateAccuracy(hits: number, misses: number) {
  const total = hits + misses;
  if (total === 0) return 0;
  return Math.round((hits / total) * 100);
}
