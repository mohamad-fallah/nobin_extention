import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
