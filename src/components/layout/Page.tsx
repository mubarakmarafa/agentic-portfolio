import { useRef } from "react";
import { AvatarSlot } from "../future/AvatarSlot";
import { EffectLayer } from "../effects/EffectLayer";
import { StickerLayer } from "../stickers/StickerLayer";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import styles from "./Page.module.css";

export function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <Hero zoneRef={heroRef} />
          <AvatarSlot />
          <Footer zoneRef={footerRef} />
        </div>
      </main>

      <StickerLayer heroRef={heroRef} footerRef={footerRef} />
      <EffectLayer />
    </div>
  );
}
