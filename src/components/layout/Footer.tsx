import { content } from "../../data/content";
import { useUnlockStore } from "../../store/unlockStore";
import styles from "./Footer.module.css";

type FooterProps = {
  zoneRef: React.RefObject<HTMLElement | null>;
};

export function Footer({ zoneRef }: FooterProps) {
  const showSecret = useUnlockStore((state) =>
    state.hasEffect("secret-message"),
  );

  return (
    <footer
      ref={zoneRef}
      className={styles.footer}
      data-secret-zone="footer"
    >
      {showSecret && (
        <p className={styles.secret} aria-live="polite">
          {content.secretMessage}
        </p>
      )}

      <nav className={styles.links} aria-label="Contact links">
        {content.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            {...("external" in link && link.external
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
