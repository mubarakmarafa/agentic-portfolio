import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";

const DevTools = import.meta.env.DEV
  ? lazy(() => import("./components/dev/DevTools"))
  : null;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {DevTools ? (
      <Suspense fallback={null}>
        <DevTools />
      </Suspense>
    ) : null}
  </StrictMode>,
);
