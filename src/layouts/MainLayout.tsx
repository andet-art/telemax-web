// Updated src/layouts/MainLayout.tsx
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-white font-sans">
      <Navbar />
      <main className="flex-grow w-full px-4 sm:px-6 md:px-8 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
