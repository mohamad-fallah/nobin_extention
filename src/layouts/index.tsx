import type { PropsWithChildren } from "react";
import { HeroUIProvider } from "@heroui/react";
import Header from "./Header";
import MainSection from "./MainSection";
import Footer from "./Footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      <div
        className="min-h-screen w-full relative overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(180deg, #be185d 0%, #818cf8 100%)",
        }}
      >
        <Header />
        <MainSection>{children}</MainSection>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
