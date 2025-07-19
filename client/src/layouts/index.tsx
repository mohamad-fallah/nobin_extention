import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import MainSection from "./MainSection";
import Footer from "./Footer";
import { applyBackground } from "../utils";

export default function MainLayout({ children }: PropsWithChildren) {
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const handleBackgroundChange = (background: string) => {
    setBackgroundStyle(applyBackground(background));
  };

  useEffect(() => {
    // Load background from localStorage
    const savedBackground = localStorage.getItem("selectedBackground");
    const defaultBackground = "linear-gradient(180deg, #be185d 0%, #818cf8 100%)";

    const background = savedBackground || defaultBackground;
    handleBackgroundChange(background);

    // Listen for background changes
    const handleBackgroundChangeEvent = (event: CustomEvent) => {
      handleBackgroundChange(event.detail.background);
    };

    window.addEventListener("backgroundChanged", handleBackgroundChangeEvent as EventListener);

    return () => {
      window.removeEventListener("backgroundChanged", handleBackgroundChangeEvent as EventListener);
    };
  }, []);

  return (
    <>
      {/* Portal container for modals */}
      <Box id="modal-root" />

      <Stack
        sx={{
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
          ...backgroundStyle,
        }}
        data-main-layout
      >
        <Header />

        <MainSection>{children}</MainSection>

        <Footer />
      </Stack>
    </>
  );
}
