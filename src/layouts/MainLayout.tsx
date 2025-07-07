// src/layouts/MainLayout.tsx
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow  bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;