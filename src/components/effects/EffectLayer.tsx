import { useUnlockStore } from "../../store/unlockStore";
import { ConfettiBurst } from "./ConfettiBurst";

export function EffectLayer() {
  const activeOneShots = useUnlockStore((state) => state.activeOneShots);
  const clearOneShot = useUnlockStore((state) => state.clearOneShot);

  return (
    <>
      {activeOneShots.includes("confetti") && (
        <ConfettiBurst onComplete={() => clearOneShot("confetti")} />
      )}
    </>
  );
}
