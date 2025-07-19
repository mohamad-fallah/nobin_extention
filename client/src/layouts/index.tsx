import type { PropsWithChildren } from "react";
import { HeroUIProvider } from "@heroui/react";
import { useEffect, useState } from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import Footer from "./Footer";
import clsx from "clsx";

export default function MainLayout({ children }: PropsWithChildren) {
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const applyBackground = (background: string) => {
    if (background.startsWith("url(")) {
      setBackgroundStyle({
        backgroundImage: background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      });
    } else {
      setBackgroundStyle({
        background: background,
      });
    }
  };

  useEffect(() => {
    // Load background from localStorage
    const savedBackground = localStorage.getItem("selectedBackground");
    const defaultBackground = "linear-gradient(180deg, #be185d 0%, #818cf8 100%)";

    const background = savedBackground || defaultBackground;
    applyBackground(background);

    // Listen for background changes
    const handleBackgroundChange = (event: CustomEvent) => {
      applyBackground(event.detail.background);
    };

    window.addEventListener("backgroundChanged", handleBackgroundChange as EventListener);

    return () => {
      window.removeEventListener("backgroundChanged", handleBackgroundChange as EventListener);
    };
  }, []);

  return (
    <HeroUIProvider>
      <div
        className={clsx(
          // Size & Position
          "min-h-screen w-full relative",
          // Layout
          "flex flex-col",
          // Overflow
          "overflow-hidden",
        )}
        style={backgroundStyle}
        data-main-layout
      >
        <Header />
        <MainSection>{children}</MainSection>
        <Footer />
      </div>
      {/* Portal container for modals */}
      <div id="modal-root"></div>
    </HeroUIProvider>
  );
}
