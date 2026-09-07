export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
