# Portfolio Lite

A minimal, expandable one-page portfolio for Moby / Mubarak Marafa. Built with Vite, React, and TypeScript.

## Live site

- **Production:** _(add Vercel URL after deploy)_
- **Repository:** _(add GitHub URL after push)_

## Features

- System-aware light/dark theme (`prefers-color-scheme`)
- Draggable sticker easter eggs with secret unlock areas
- Modular effect registry (confetti burst, secret message reveal)
- Reserved slot for a future 3D avatar (React Three Fiber)
- GSAP-ready animation hook (`src/lib/gsap.ts`)

## Easter eggs

| Sticker | Drop zone | Unlock |
|---------|-----------|--------|
| ⭐ Star | Hero / name area | Confetti burst + hero glow |
| ❤️ Heart | Footer area | Secret message reveal |

Progress persists for the current browser session via `sessionStorage`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Customize

- **Copy & links:** [`src/data/content.ts`](src/data/content.ts)
- **Stickers:** [`src/data/stickers.ts`](src/data/stickers.ts) — swap emoji for images in `public/stickers/`
- **Secret zones:** [`src/data/secrets.ts`](src/data/secrets.ts)
- **Theme tokens:** [`src/styles/tokens.css`](src/styles/tokens.css)

## Extend later

### GSAP animations

```bash
npm install gsap @gsap/react
```

Register plugins in [`src/lib/gsap.ts`](src/lib/gsap.ts). Use `useGSAP` with scope refs for cleanup. Gate timelines behind `prefers-reduced-motion`.

### 3D avatar

```bash
npm install three @react-three/fiber @react-three/drei
```

Replace the body of [`src/components/future/AvatarSlot.tsx`](src/components/future/AvatarSlot.tsx) with a `<Canvas>` and your GLB model.

### More effects

1. Add a component under `src/components/effects/`
2. Register it in `EffectLayer.tsx` or wire a persistent unlock in `unlockStore.ts`

## Deploy

Pushes to `main` auto-deploy via Vercel:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Manual deploy:

```bash
npx vercel --prod
```
