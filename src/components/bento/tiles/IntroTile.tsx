import styles from "./IntroTile.module.css";

export function IntroTile() {
  return (
    <div className={styles.intro}>
      <img
        className={styles.wordmark}
        src="/assets/intro/call-me-moby.svg"
        width={268}
        height={88}
        alt="call me moby"
      />
      <div className={styles.memoji}>
        <div className={styles.memojiCrop}>
          <img src="/assets/intro/memoji.png" width={720} height={720} alt="" />
        </div>
      </div>
      <img
        className={styles.subtitle}
        src="/assets/intro/staff-design-engineer.svg"
        width={171}
        height={40}
        alt="staff design engineer & dot connector"
      />
      <p className={styles.flags} aria-label="Nigeria, Hong Kong, United Kingdom">
        🇳🇬🇭🇰🇬🇧
      </p>
    </div>
  );
}
