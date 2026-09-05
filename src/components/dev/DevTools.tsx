import { useEffect } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

type GrainSettings = {
  frequency: number;
  tileSize: number;
  opacity: number;
  contrast: number;
  octaves: number;
  seed: number;
};

function createNoiseDataUrl(settings: GrainSettings) {
  const octaves = Math.round(settings.octaves);
  const seed = Math.round(settings.seed);
  const intercept = (1 - settings.contrast) / 2;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${settings.tileSize}" height="${settings.tileSize}" viewBox="0 0 ${settings.tileSize} ${settings.tileSize}">
      <filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="${settings.frequency}" numOctaves="${octaves}" seed="${seed}" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="${settings.contrast}" intercept="${intercept}" />
          <feFuncG type="linear" slope="${settings.contrast}" intercept="${intercept}" />
          <feFuncB type="linear" slope="${settings.contrast}" intercept="${intercept}" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="${settings.opacity}" />
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function BackgroundGrainDials() {
  const { grain } = useDialKit(
    "Background grain",
    {
      grain: {
        frequency: [0.72, 0.1, 1.5, 0.01],
        tileSize: [180, 32, 320, 1],
        opacity: [0.28, 0, 0.6, 0.01],
        contrast: [1.55, 0.5, 3, 0.05],
        octaves: [3, 1, 5, 1],
        seed: [8, 1, 100, 1],
      },
    },
    {
      id: "background-grain",
      persist: true,
    },
  );
  const { contrast, frequency, octaves, opacity, seed, tileSize } = grain;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--background-grain-image",
      `url("${createNoiseDataUrl({
        contrast,
        frequency,
        octaves,
        opacity,
        seed,
        tileSize,
      })}")`,
    );
    root.style.setProperty("--background-grain-size", `${tileSize}px`);

    return () => {
      root.style.removeProperty("--background-grain-image");
      root.style.removeProperty("--background-grain-size");
    };
  }, [contrast, frequency, octaves, opacity, seed, tileSize]);

  return null;
}

export default function DevTools() {
  return (
    <>
      <BackgroundGrainDials />
      <DialRoot
        defaultOpen
        position="bottom-right"
        productionEnabled
        theme="dark"
      />
    </>
  );
}
