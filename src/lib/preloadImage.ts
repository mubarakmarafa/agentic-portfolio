const decoded = new Map<string, Promise<void>>();

/** Fetches and decodes an image once, so it paints immediately when a page opens. */
export function preloadImage(src: string): Promise<void> {
  let pending = decoded.get(src);
  if (!pending) {
    const img = new Image();
    img.src = src;
    pending = img.decode().catch(() => undefined);
    decoded.set(src, pending);
  }
  return pending;
}
