import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Palette, ShoppingCart, Star, Wrench, Eye, Plus, Minus, RotateCcw } from "lucide-react";
import Sidebar from "@/components/Sidebar"; // Adjust path if needed

// Mock data for commercial pipes
const commercialPipes = [
  {
    id: 1,
    name: "Classic Briar Wood",
    category: "Wood",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.8,
    description: "Traditional briar wood pipe with elegant finish"
  },
  {
    id: 2,
    name: "Executive Metal",
    category: "Metal",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.6,
    description: "Premium stainless steel construction"
  },
  {
    id: 3,
    name: "Artisan Hybrid",
    category: "Hybrid",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    rating: 4.9,
    description: "Wood and metal fusion design"
  },
  {
    id: 4,
    name: "Royal Luxury",
    category: "Luxury",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    rating: 5.0,
    description: "Hand-crafted premium materials"
  }
];

// Custom pipe parts data
const pipeHeads = [
  { id: 1, name: "Classic Bowl", material: "Briar Wood", price: 45, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" },
  { id: 2, name: "Deep Chamber", material: "Cherry Wood", price: 55, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" },
  { id: 3, name: "Wide Bowl", material: "Meerschaum", price: 75, image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop" },
  { id: 4, name: "Artisan Bowl", material: "Olive Wood", price: 65, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop" }
];

const pipeRings = [
  { id: 1, name: "Silver Band", material: "Sterling Silver", price: 25, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=150&fit=crop" },
  { id: 2, name: "Gold Ring", material: "14k Gold", price: 95, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" },
  { id: 3, name: "Copper Band", material: "Copper", price: 15, image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop" },
  { id: 4, name: "Titanium Ring", material: "Titanium", price: 65, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop" }
];

const pipeTails = [
  { id: 1, name: "Straight Stem", material: "Ebonite", price: 35, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" },
  { id: 2, name: "Curved Stem", material: "Acrylic", price: 40, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" },
  { id: 3, name: "Bent Stem", material: "Vulcanite", price: 45, image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop" },
  { id: 4, name: "Long Stem", material: "Bamboo", price: 55, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop" }
];

const categoriesList = ["All", "Wood", "Metal", "Hybrid", "Luxury"];

export default function PipeFactoryPage() {
  const { t } = useTranslation();
  
  const [activeSection, setActiveSection] = useState("commercial");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cart, setCart] = useState([]);
  
  // Custom pipe builder state
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedRing, setSelectedRing] = useState(null);
  const [selectedTail, setSelectedTail] = useState(null);
  const [customPipeName, setCustomPipeName] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isHiding = currentY > lastScrollY && currentY > 10;
      setNavbarHidden(isHiding);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredPipes = commercialPipes
    .filter((p) => (selectedCategory === "All" ? true : p.category === selectedCategory))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id && p.type === item.type);
      if (existing) {
        return prev.map(p => p.id === item.id && p.type === item.type 
          ? { ...p, quantity: p.quantity + 1 } 
          : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const getCustomPipeTotal = () => {
    const headPrice = selectedHead?.price || 0;
    const ringPrice = selectedRing?.price || 0;
    const tailPrice = selectedTail?.price || 0;
    return headPrice + ringPrice + tailPrice;
  };

  const addCustomPipeToCart = () => {
    if (!selectedHead || !selectedRing || !selectedTail || !customPipeName.trim()) {
      alert(t("completeYourDesignAlert"));
      return;
    }
    
    const customPipe = {
      id: `custom-${Date.now()}`,
      type: "custom",
      name: customPipeName || t("customPipeDefault"),
      head: selectedHead,
      ring: selectedRing,
      tail: selectedTail,
      price: getCustomPipeTotal(),
      quantity: 1
    };
    
    addToCart(customPipe);
    alert(t("customPipeAddedAlert"));
  };

  const resetCustomPipe = () => {
    setSelectedHead(null);
    setSelectedRing(null);
    setSelectedTail(null);
    setCustomPipeName("");
  };

  return (
    <>
<Sidebar
  isSidebarExpanded={isSidebarExpanded}
  setIsSidebarExpanded={setIsSidebarExpanded}
  navbarHidden={navbarHidden}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  categoriesList={categoriesList}
  setCurrentPage={setCurrentPage}
  activeSection={activeSection}
  setActiveSection={setActiveSection}
  selectedHead={selectedHead}
  selectedRing={selectedRing}
  selectedTail={selectedTail}
  getCustomPipeTotal={getCustomPipeTotal}
  resetCustomPipe={resetCustomPipe}
/>


      {/* Main Content */}
      <main className="relative min-h-screen pt-28 pb-24 flex overflow-auto bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')] bg-cover bg-center text-white font-serif">
        <div className="absolute inset-0 bg-black/70 z-0" />

        <motion.div
          className={`relative z-20 flex-1 px-6 transition-all duration-300 ${
            isSidebarExpanded ? "ml-64" : "ml-10"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-xl">
              {t("premiumTobaccoPipes")}
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              {t("discoverCollection")}
            </p>
          </motion.div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            {activeSection === "commercial" && (
              <motion.div
                key="commercial"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Search and Filters */}
                <motion.section
                  className="max-w-5xl mx-auto bg-[#2a1d13] border border-stone-700 rounded-xl px-6 py-8 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                    <input
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      className="w-full md:flex-1 px-4 py-2.5 text-sm rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </motion.section>

                {/* Commercial Pipes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {filteredPipes.map((pipe, idx) => (
                    <motion.div
                      key={pipe.id}
                      className="bg-[#1a120b] border border-[#2a1d13] rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-[#c9a36a]/50 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <img
                            src={pipe.image}
                            alt={pipe.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{pipe.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{pipe.name}</h3>
                        <p className="text-sm text-stone-400 mb-3">{pipe.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-[#c9a36a]">${pipe.price}</span>
                          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-green-800 text-green-300">
                            {t("inStock")}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({...pipe, type: 'commercial'})}
                        className="bg-[#c9a36a] hover:bg-[#b8915b] px-4 py-2 rounded-md text-black font-medium transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {t("addToCart")}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "custom" && (
              <motion.div
                key="custom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Custom Pipe Builder Header */}
                <motion.div
                  className="max-w-5xl mx-auto bg-[#2a1d13] border border-stone-700 rounded-xl px-6 py-8 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
                      <Wrench className="w-8 h-8 text-[#c9a36a]" />
                      {t("customPipeBuilder")}
                    </h2>
                    <p className="text-stone-300">{t("buildHeader")}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                      type="text"
                      placeholder={t("nameCustomPipe")}
                      className="flex-1 px-4 py-2.5 text-sm rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
                      value={customPipeName}
                      onChange={(e) => setCustomPipeName(e.target.value)}
                    />
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`px-4 py-2.5 rounded-md transition flex items-center gap-2 ${
                        previewMode 
                          ? 'bg-[#c9a36a] text-black' 
                          : 'bg-stone-800 text-white border border-stone-600'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      {previewMode ? t("editMode") : t("previewMode")}
                    </button>
                  </div>

                  {(selectedHead && selectedRing && selectedTail) && (
                    <div className="mt-6 p-4 bg-[#1a120b] rounded-lg border border-[#c9a36a]/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#c9a36a]">{t("yourCustomPipe")}</h4>
                          <p className="text-sm text-stone-400">
                            {selectedHead.name} + {selectedRing.name} + {selectedTail.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#c9a36a]">${getCustomPipeTotal()}</div>
                          <button
                            onClick={addCustomPipeToCart}
                            className="mt-2 bg-[#c9a36a] hover:bg-[#b8915b] px-4 py-2 rounded-md text-black font-medium transition flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            {t("addToCart")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {!previewMode ? (
                  <>
                    {/* Pipe Heads */}
                    <motion.section
                      className="mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-center">
                        {t("step1")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {pipeHeads.map((head) => (
                          <motion.div
                            key={head.id}
                            className={`bg-[#1a120b] border rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                              selectedHead?.id === head.id 
                                ? 'border-[#c9a36a] shadow-lg shadow-[#c9a36a]/20' 
                                : 'border-[#2a1d13] hover:border-[#c9a36a]/50'
                            }`}
                            onClick={() => setSelectedHead(head)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img
                              src={head.image}
                              alt={head.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-semibold mb-1">{head.name}</h4>
                            <p className="text-sm text-stone-400 mb-2">{head.material}</p>
                            <p className="text-lg font-bold text-[#c9a36a]">${head.price}</p>
                            {selectedHead?.id === head.id && (
                              <div className="mt-2 flex items-center justify-center">
                                <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-medium">
                                  {t("selected")}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* Pipe Rings */}
                    <motion.section
                      className="mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-center">
                        {t("step2")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {pipeRings.map((ring) => (
                          <motion.div
                            key={ring.id}
                            className={`bg-[#1a120b] border rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                              selectedRing?.id === ring.id 
                                ? 'border-[#c9a36a] shadow-lg shadow-[#c9a36a]/20' 
                                : 'border-[#2a1d13] hover:border-[#c9a36a]/50'
                            }`}
                            onClick={() => setSelectedRing(ring)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img
                              src={ring.image}
                              alt={ring.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-semibold mb-1">{ring.name}</h4>
                            <p className="text-sm text-stone-400 mb-2">{ring.material}</p>
                            <p className="text-lg font-bold text-[#c9a36a]">${ring.price}</p>
                            {selectedRing?.id === ring.id && (
                              <div className="mt-2 flex items-center justify-center">
                                <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-medium">
                                  {t("selected")}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* Pipe Tails */}
                    <motion.section
                      className="mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-center">
                        {t("step3")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {pipeTails.map((tail) => (
                          <motion.div
                            key={tail.id}
                            className={`bg-[#1a120b] border rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                              selectedTail?.id === tail.id 
                                ? 'border-[#c9a36a] shadow-lg shadow-[#c9a36a]/20' 
                                : 'border-[#2a1d13] hover:border-[#c9a36a]/50'
                            }`}
                            onClick={() => setSelectedTail(tail)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img
                              src={tail.image}
                              alt={tail.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-semibold mb-1">{tail.name}</h4>
                            <p className="text-sm text-stone-400 mb-2">{tail.material}</p>
                            <p className="text-lg font-bold text-[#c9a36a]">${tail.price}</p>
                            {selectedTail?.id === tail.id && (
                              <div className="mt-2 flex items-center justify-center">
                                <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-medium">
                                  {t("selected")}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  </>
                ) : (
                  /* Preview Mode */
                  <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="max-w-4xl mx-auto bg-[#1a120b] border border-[#2a1d13] rounded-2xl p-8">
                      <h3 className="text-3xl font-bold mb-8 text-center">{t("yourCustomPipePreview")}</h3>
                      
                      {(selectedHead && selectedRing && selectedTail) ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Visual Preview */}
                          <div className="space-y-6">
                            <div className="bg-[#2a1d13] rounded-xl p-6">
                              <h4 className="text-xl font-semibold mb-4 text-[#c9a36a]">{t("visualAssembly")}</h4>
                              <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-[#1a120b] rounded-lg">
                                  <img src={selectedHead.image} alt={selectedHead.name} className="w-16 h-16 object-cover rounded-lg" />
                                  <div>
                                    <p className="font-semibold">{selectedHead.name}</p>
                                    <p className="text-sm text-stone-400">{selectedHead.material}</p>
                                  </div>
                                </div>
                                <div className="flex justify-center">
                                  <div className="w-px h-8 bg-[#c9a36a]"></div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-[#1a120b] rounded-lg">
                                  <img src={selectedRing.image} alt={selectedRing.name} className="w-16 h-16 object-cover rounded-lg" />
                                  <div>
                                    <p className="font-semibold">{selectedRing.name}</p>
                                    <p className="text-sm text-stone-400">{selectedRing.material}</p>
                                  </div>
                                </div>
                                <div className="flex justify-center">
                                  <div className="w-px h-8 bg-[#c9a36a]"></div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-[#1a120b] rounded-lg">
                                  <img src={selectedTail.image} alt={selectedTail.name} className="w-16 h-16 object-cover rounded-lg" />
                                  <div>
                                    <p className="font-semibold">{selectedTail.name}</p>
                                    <p className="text-sm text-stone-400">{selectedTail.material}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Details and Pricing */}
                          <div className="space-y-6">
                            <div className="bg-[#2a1d13] rounded-xl p-6">
                              <h4 className="text-xl font-semibold mb-4 text-[#c9a36a]">{t("pipeDetails")}</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("name")}:</span>
                                  <span className="font-medium">{customPipeName || t("unnamedCustomPipe")}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("head")}:</span>
                                  <span className="font-medium">{selectedHead.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("ring")}:</span>
                                  <span className="font-medium">{selectedRing.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("tail")}:</span>
                                  <span className="font-medium">{selectedTail.name}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#2a1d13] rounded-xl p-6">
                              <h4 className="text-xl font-semibold mb-4 text-[#c9a36a]">{t("pricingBreakdown")}</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("head")} ({selectedHead.name}):</span>
                                  <span className="font-medium">${selectedHead.price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("ring")} ({selectedRing.name}):</span>
                                  <span className="font-medium">${selectedRing.price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-300">{t("tail")} ({selectedTail.name}):</span>
                                  <span className="font-medium">${selectedTail.price}</span>
                                </div>
                                <div className="border-t border-stone-600 pt-3 mt-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-[#c9a36a]">{t("total")}:</span>
                                    <span className="text-2xl font-bold text-[#c9a36a]">${getCustomPipeTotal()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#2a1d13] rounded-xl p-6">
                              <h4 className="text-xl font-semibold mb-4 text-[#c9a36a]">{t("specifications")}</h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-stone-400">{t("estimatedWeight")}:</span>
                                  <p className="font-medium">145-180g</p>
                                </div>
                                <div>
                                  <span className="text-stone-400">{t("bowlCapacity")}:</span>
                                  <p className="font-medium">0.8-1.2g</p>
                                </div>
                                <div>
                                  <span className="text-stone-400">{t("length")}:</span>
                                  <p className="font-medium">14-16cm</p>
                                </div>
                                <div>
                                  <span className="text-stone-400">{t("productionTime")}:</span>
                                  <p className="font-medium">7-14 {t("days")}</p>
                                </div>
                              </div>
                            </div>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={addCustomPipeToCart}
                              className="w-full bg-[#c9a36a] hover:bg-[#b8915b] px-6 py-4 rounded-xl text-black font-bold text-lg transition flex items-center justify-center gap-3"
                              disabled={!customPipeName.trim()}
                            >
                              <ShoppingCart className="w-5 h-5" />
                              {t("addCustomPipeToCart")} - ${getCustomPipeTotal()}
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">🚧</div>
                          <h4 className="text-xl font-semibold mb-2">{t("incompleteDesign")}</h4>
                          <p className="text-stone-400 mb-6">{t("completeYourDesign")}</p>
                          <button
                            onClick={() => setPreviewMode(false)}
                            className="bg-[#c9a36a] hover:bg-[#b8915b] px-6 py-3 rounded-lg text-black font-medium transition"
                          >
                            {t("returnToBuilder")}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Cart */}
        {cart.length > 0 && (
          <motion.button
            className="fixed bottom-6 right-6 bg-[#c9a36a] text-black px-6 py-3 rounded-full shadow-lg hover:brightness-110 active:scale-95 z-50 flex items-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert(`${t("cart")}: ${cart.length} ${t("items")}`)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">
              {t("cart")} ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
            <div className="bg-black/20 px-2 py-1 rounded-full text-sm">
              ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
            </div>
          </motion.button>
        )}

        {/* Section Toggle Buttons (Mobile) */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="flex bg-[#1a120b] border border-[#2a1d13] rounded-full p-1">
            <button
              onClick={() => setActiveSection("commercial")}
              className={`py-2 px-4 text-sm rounded-full transition ${
                activeSection === "commercial" 
                  ? "bg-[#c9a36a] text-black font-semibold" 
                  : "text-white hover:bg-[#2a1d13]"
              }`}
            >
              {t("commercial")}
            </button>
            <button
              onClick={() => setActiveSection("custom")}
              className={`py-2 px-4 text-sm rounded-full transition ${
                activeSection === "custom" 
                  ? "bg-[#c9a36a] text-black font-semibold" 
                  : "text-white hover:bg-[#2a1d13]"
              }`}
            >
              {t("customBuilder")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}