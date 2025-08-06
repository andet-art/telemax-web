import { Layers, X, Menu, ChevronRight, Palette, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

interface PipePart {
  id: number;
  name: string;
  material?: string;
  price: number;
  image?: string;
}

interface SidebarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (state: boolean) => void;
  navbarHidden: boolean;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categoriesList: string[];
  setCurrentPage: (page: number) => void;

  activeSection: string;
  setActiveSection: (section: string) => void;

  selectedHead: PipePart | null;
  selectedRing: PipePart | null;
  selectedTail: PipePart | null;
  getCustomPipeTotal: () => number;
  resetCustomPipe: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  navbarHidden,
  selectedCategory,
  setSelectedCategory,
  categoriesList,
  setCurrentPage,
  activeSection,
  setActiveSection,
  selectedHead,
  selectedRing,
  selectedTail,
  getCustomPipeTotal,
  resetCustomPipe,
}) => {
  const { t } = useTranslation();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarExpanded &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-sidebar-toggle]')
      ) {
        setIsSidebarExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarExpanded, setIsSidebarExpanded]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSidebarExpanded) {
        setIsSidebarExpanded(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSidebarExpanded, setIsSidebarExpanded]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setTimeout(() => setIsSidebarExpanded(false), 200);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isSidebarExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <AnimatePresence>
        {!isSidebarExpanded && (
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setIsSidebarExpanded(true)}
            data-sidebar-toggle
            className="fixed top-4 left-0 z-50 group"
            aria-label="Open sidebar"
          >
            <div className="bg-gradient-to-r from-[#1a120b] to-[#2a1d13] hover:from-[#2a1d13] hover:to-[#3a2d23] border-r border-[#c9a36a]/20 text-white flex items-center justify-center w-10 h-12 cursor-pointer transition-all duration-300 rounded-tr-lg rounded-br-lg shadow-lg hover:shadow-xl">
              <Menu className="w-5 h-5 text-[#c9a36a] group-hover:text-white transition-colors duration-300" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{
          width: isSidebarExpanded ? 280 : 0,
          opacity: isSidebarExpanded ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        className={`
          ${navbarHidden ? "fixed top-0 h-screen" : "fixed top-0 lg:top-16 h-screen lg:h-[calc(100vh-4rem)]"}
          left-0 z-40 bg-gradient-to-b from-[#1a120b] via-[#1f1611] to-[#1a120b] 
          border-r border-[#c9a36a]/30 shadow-2xl overflow-hidden
        `}
        style={{ willChange: 'width, opacity' }}
      >
        <AnimatePresence>
          {isSidebarExpanded && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative text-white h-full flex flex-col"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-[#2a1d13]/50">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 bg-gradient-to-br from-[#c9a36a] to-[#b8915b] rounded-lg shadow-lg">
                      <Layers className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {t("sidebar_categories", "Categories")}
                      </h3>
                      <p className="text-xs text-stone-400">
                        Browse by type
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarExpanded(false)}
                    className="p-2 rounded-lg bg-[#2a1d13] hover:bg-[#3a2d23] text-stone-400 hover:text-[#c9a36a] transition-all duration-200"
                    aria-label="Close sidebar"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Section Toggle */}
              <div className="px-6 mt-4 mb-2">
                <div className="flex bg-[#2a1d13] rounded-lg p-1">
                  <button
                    onClick={() => setActiveSection("commercial")}
                    className={`flex-1 py-2 px-3 text-xs rounded-md transition ${
                      activeSection === "commercial" 
                        ? "bg-[#c9a36a] text-black font-semibold" 
                        : "text-white hover:bg-[#3a2d23]"
                    }`}
                  >
                    Commercial
                  </button>
                  <button
                    onClick={() => setActiveSection("custom")}
                    className={`flex-1 py-2 px-3 text-xs rounded-md transition ${
                      activeSection === "custom" 
                        ? "bg-[#c9a36a] text-black font-semibold" 
                        : "text-white hover:bg-[#3a2d23]"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Category List */}
              {activeSection === "commercial" && (
                <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2 scrollbar-thin scrollbar-thumb-[#c9a36a]/20 scrollbar-track-transparent">
                  {categoriesList.map((cat, index) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <motion.li
                        key={cat}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.3, type: "spring" }}
                        className="list-none"
                      >
                        <motion.button
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategorySelect(cat)}
                          className={`
                            w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                            flex items-center justify-between group relative overflow-hidden
                            ${isSelected
                              ? "bg-gradient-to-r from-[#c9a36a]/20 to-[#c9a36a]/10 text-[#c9a36a] border border-[#c9a36a]/30 shadow-lg"
                              : "text-stone-300 hover:text-white hover:bg-[#2a1d13]/50 border border-transparent hover:border-[#2a1d13]"
                            }
                          `}
                        >
                          <span className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#c9a36a]" : "bg-stone-500 group-hover:bg-[#c9a36a]"}`} />
                            <span className="font-medium">
                              {t(`cat_${cat.toLowerCase()}`, cat)}
                            </span>
                          </span>
                          <ChevronRight className={`w-4 h-4 ${isSelected ? "text-[#c9a36a] translate-x-1" : "text-stone-500 group-hover:text-[#c9a36a] group-hover:translate-x-1"}`} />
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </div>
              )}

              {/* Custom Builder Info */}
              {activeSection === "custom" && (
                <div className="p-4 space-y-4 text-sm">
                  <div className="bg-[#2a1d13] p-3 rounded-lg">
                    <p className="text-[#c9a36a] font-medium mb-2">Progress</p>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 ${selectedHead ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${selectedHead ? 'bg-green-400' : 'bg-gray-400'}`} />
                        Head {selectedHead && `(${selectedHead.name})`}
                      </div>
                      <div className={`flex items-center gap-2 ${selectedRing ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${selectedRing ? 'bg-green-400' : 'bg-gray-400'}`} />
                        Ring {selectedRing && `(${selectedRing.name})`}
                      </div>
                      <div className={`flex items-center gap-2 ${selectedTail ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${selectedTail ? 'bg-green-400' : 'bg-gray-400'}`} />
                        Tail {selectedTail && `(${selectedTail.name})`}
                      </div>
                    </div>
                  </div>
                  {(selectedHead || selectedRing || selectedTail) && (
                    <div className="bg-[#2a1d13] p-3 rounded-lg">
                      <p className="text-[#c9a36a] font-medium mb-2">Total: ${getCustomPipeTotal()}</p>
                      <button
                        onClick={resetCustomPipe}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
};

export default Sidebar;
