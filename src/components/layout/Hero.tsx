import { content } from "../../data/content";
import { PinWall } from "./PinWall";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <img
          className={styles.avatar}
          src="/assets/moby-avatar.png"
          alt="Moby smiling"
        />

        <h1 className={styles.title}>
          <strong>hi</strong>
          <span aria-hidden="true">👋🏾</span>
          <span className={styles.outline}>, i’m mubarak. but you can </span>
          <span className={styles.mobyMark}>
            <strong>call me moby</strong>
            <i className={styles.dot} aria-hidden="true" />
          </span>
        </h1>
      </div>

      <div className={styles.story}>
        <PinWall />

        <div className={styles.copy}>
          <p>
            i design+build products that <strong>feel inevitable</strong>
          </p>
          <p>
            ... what does that even mean? 😂... well, i take ambitious and
            ambiguous problems and design visions of the future (sometimes i
            build them). i see connections no one else sees, connect them and
            lead teams to build that future.
          </p>
          <p>{content.about}</p>
        </div>
      </div>
    </header>
  );
}
