// src/layouts/MainLayout.tsx
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-50">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">© 2025 Telemax</footer>
    </div>
  );
};

export default MainLayout;