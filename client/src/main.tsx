import React from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./styles/index.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);
