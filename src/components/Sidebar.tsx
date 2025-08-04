import { Layers } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (state: boolean) => void;
  navbarHidden: boolean;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categoriesList: string[];
  setCurrentPage: (page: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  navbarHidden,
  selectedCategory,
  setSelectedCategory,
  categoriesList,
  setCurrentPage,
}) => {
  return (
    <>
      {/* Toggle Button */}
      {!isSidebarExpanded && (
        <div
          onClick={() => setIsSidebarExpanded(true)}
          className="fixed top-4 left-0 z-50 bg-[#1a120b] hover:bg-[#2a1d13] border-r border-[#2a1d13] text-white flex items-center justify-center w-8 h-10 cursor-pointer transition duration-300 rounded-tr-md rounded-br-md shadow-md"
        >
          ☰
        </div>
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          ${isSidebarExpanded ? "w-64" : "w-0"}
          ${navbarHidden ? "fixed top-0 h-screen" : "absolute top-16 h-[calc(100%-4rem)]"}
          left-0 z-40 bg-[#1a120b] border-r border-[#2a1d13] shadow-lg transition-all duration-500 ease-in-out overflow-y-auto
        `}
      >
        {isSidebarExpanded && (
          <div className="relative text-white h-full flex flex-col px-6 pt-16 pb-6">
            {/* Close */}
            <button
              onClick={() => setIsSidebarExpanded(false)}
              className="absolute top-4 right-4 text-white hover:text-[#c9a36a] text-lg transition"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-6 mt-2 flex items-center gap-2 border-b border-[#2a1d13] pb-3">
              <Layers className="w-5 h-5 text-[#c9a36a]" />
              <span className="tracking-wide">Categories</span>
            </h3>

            <ul className="space-y-4 text-sm pb-8">
              {categoriesList.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                    setIsSidebarExpanded(false);
                  }}
                  className={`group cursor-pointer px-3 py-2 rounded-md transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[#2a1d13] text-[#c9a36a] font-semibold shadow-inner"
                      : "text-white hover:bg-[#2a1d13] hover:text-[#c9a36a]"
                  }`}
                >
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    • {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
