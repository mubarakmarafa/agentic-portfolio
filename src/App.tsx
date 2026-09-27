import { Home } from "./components/home/Home";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";
import { getTile } from "./data/tiles";
import { useRouteSync } from "./hooks/useRouteSync";
import { useNavStore } from "./store/navStore";

export function App() {
  useRouteSync();
  const route = useNavStore((state) => state.route);

  if (route.name === "home") return <Home />;
  return <PlaceholderPage tile={getTile(route.tileId)} />;
}
