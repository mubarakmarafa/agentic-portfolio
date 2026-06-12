import type { SecretZone } from "../data/secrets";

type Point = {
  x: number;
  y: number;
};

type ZoneRects = {
  hero: DOMRect | null;
  footer: DOMRect | null;
};

export function findMatchingSecret(
  point: Point,
  stickerId: string,
  zones: SecretZone[],
  rects: ZoneRects,
): SecretZone | null {
  for (const zone of zones) {
    if (zone.requiredStickerId !== stickerId) continue;

    const rect = rects[zone.anchor];
    if (!rect) continue;

    if (isPointInRect(point, rect)) {
      return zone;
    }
  }

  return null;
}

function isPointInRect(point: Point, rect: DOMRect): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}
