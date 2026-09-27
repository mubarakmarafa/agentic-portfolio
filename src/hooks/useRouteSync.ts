import { useEffect } from "react";
import { getTile } from "../data/tiles";
import { closePage, navigate } from "../lib/viewTransition";
import { routeFromPath, useNavStore } from "../store/navStore";

const BASE_TITLE = "Moby · Mubarak Marafa";

/** Keeps the nav store and the URL in step: Back / Forward, Esc, document title. */
export function useRouteSync() {
  const route = useNavStore((state) => state.route);

  useEffect(() => {
    history.scrollRestoration = "manual";
    if (routeFromPath(location.pathname).name === "home" && location.pathname !== "/") {
      history.replaceState(null, "", "/");
    }

    const onPopState = () => {
      const to = routeFromPath(location.pathname);
      navigate(to, to.name === "home" ? "back" : "open", "none");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (route.name !== "tile") {
      document.title = BASE_TITLE;
      return;
    }
    document.title = `${getTile(route.tileId).label} · ${BASE_TITLE}`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [route]);
}
