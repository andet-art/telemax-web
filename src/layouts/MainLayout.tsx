// src/layouts/MainLayout.tsx
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useActivityPing from "../hooks/useActivePing";

const MainLayout = ({ children }: { children: ReactNode }) => {
  useActivityPing(); // ✅ Pings backend every 2 min to update last_active

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
