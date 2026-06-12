export type SecretZone = {
  id: string;
  anchor: "hero" | "footer";
  requiredStickerId: string;
  unlocks: string[];
};

export const secretZones: SecretZone[] = [
  {
    id: "name-zone",
    anchor: "hero",
    requiredStickerId: "star",
    unlocks: ["confetti", "hero-glow"],
  },
  {
    id: "footer-zone",
    anchor: "footer",
    requiredStickerId: "heart",
    unlocks: ["secret-message"],
  },
];
