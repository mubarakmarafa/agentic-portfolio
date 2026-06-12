import { content } from "../../data/content";
import { useUnlockStore } from "../../store/unlockStore";
import styles from "./Hero.module.css";

type HeroProps = {
  zoneRef: React.RefObject<HTMLElement | null>;
};

export function Hero({ zoneRef }: HeroProps) {
  const hasGlow = useUnlockStore((state) => state.hasEffect("hero-glow"));

  return (
    <header
      ref={zoneRef}
      className={`${styles.hero} ${hasGlow ? styles.glow : ""}`}
      data-secret-zone="hero"
    >
      <h1 className={styles.title}>
        {content.name} <span className={styles.alias}>/ {content.alias}</span>
      </h1>
      <p className={styles.role}>{content.role}</p>

      {content.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </header>
  );
}
