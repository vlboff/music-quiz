export function debounce<F extends (...args: any[]) => void>(f: F, ms: number): (...args: Parameters<F>) => void {
  let isCooldown = false;

  return function(this: any, ...args: Parameters<F>) {
    if (isCooldown) return;

    f.apply(this, args);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}