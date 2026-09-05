import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DevTools } from "./components/dev/DevTools";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV ? <DevTools /> : null}
  </StrictMode>,
);
