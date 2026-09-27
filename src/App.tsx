import { Home } from "./components/home/Home";
import { CaseStudyPage } from "./components/pages/CaseStudyPage";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";
import { getTile } from "./data/tiles";
import { useRouteSync } from "./hooks/useRouteSync";
import { useNavStore } from "./store/navStore";

export function App() {
  useRouteSync();
  const route = useNavStore((state) => state.route);

  if (route.name === "home") return <Home />;

  const tile = getTile(route.tileId);
  if (tile.destination.kind === "page" && tile.destination.page === "case-study") {
    return <CaseStudyPage tile={tile} />;
  }
  return <PlaceholderPage tile={tile} />;
}
