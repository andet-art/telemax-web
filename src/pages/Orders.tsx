import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { 
  Layers, 
  Palette, 
  ShoppingCart, 
  Star, 
  Wrench, 
  Eye, 
  Plus, 
  Minus, 
  RotateCcw,
  Search,
  Filter,
  Heart,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Gift,
  ShoppingBag,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Crown,
  Flame,
  Package,
  Timer,
  ChevronRight,
  Info,
  CreditCard
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

// Enhanced mock data for commercial pipes with more premium features
const commercialPipes = [
  {
    id: 1,
    name: "Classic Briar Wood",
    category: "Wood",
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    description: "Traditional briar wood pipe with elegant finish and smooth draw",
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
    tags: ["Premium", "Handcrafted", "Traditional"],
    specs: {
      weight: "145g",
      length: "15cm",
      bowlDepth: "2.1cm",
      material: "Italian Briar"
    }
  },
  {
    id: 2,
    name: "Executive Metal Pro",
    category: "Metal",
    price: 149.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    description: "Premium stainless steel construction with thermal regulation",
    inStock: true,
    featured: false,
    isNew: true,
    isBestseller: false,
    tags: ["Durable", "Modern", "Professional"],
    specs: {
      weight: "180g",
      length: "16cm",
      bowlDepth: "2.3cm",
      material: "316L Stainless Steel"
    }
  },
  {
    id: 3,
    name: "Artisan Hybrid Deluxe",
    category: "Hybrid",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    description: "Wood and metal fusion design with precision engineering",
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
    tags: ["Innovative", "Limited Edition", "Award Winner"],
    specs: {
      weight: "165g",
      length: "15.5cm",
      bowlDepth: "2.2cm",
      material: "Briar & Titanium"
    }
  },
  {
    id: 4,
    name: "Royal Luxury Collection",
    category: "Luxury",
    price: 349.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    rating: 5.0,
    reviewCount: 67,
    description: "Hand-crafted premium materials with gold accents",
    inStock: false,
    featured: true,
    isNew: false,
    isBestseller: false,
    tags: ["Luxury", "Hand-crafted", "Limited"],
    specs: {
      weight: "190g",
      length: "17cm",
      bowlDepth: "2.4cm",
      material: "Premium Briar & Gold"
    }
  },
  {
    id: 5,
    name: "Vintage Oak Classic",
    category: "Wood",
    price: 79.99,
    originalPrice: 95.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 203,
    description: "Authentic oak construction with vintage charm",
    inStock: true,
    featured: false,
    isNew: false,
    isBestseller: true,
    tags: ["Vintage", "Classic", "Popular"],
    specs: {
      weight: "130g",
      length: "14.5cm",
      bowlDepth: "2.0cm",
      material: "Aged Oak"
    }
  },
  {
    id: 6,
    name: "Modern Titanium Edge",
    category: "Metal",
    price: 299.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 45,
    description: "Cutting-edge titanium alloy with aerospace engineering",
    inStock: true,
    featured: true,
    isNew: true,
    isBestseller: false,
    tags: ["Innovative", "Lightweight", "Tech"],
    specs: {
      weight: "95g",
      length: "16.2cm",
      bowlDepth: "2.1cm",
      material: "Grade 2 Titanium"
    }
  }
];

// Enhanced custom pipe parts data
const pipeHeads = [
  { 
    id: 1, 
    name: "Classic Bowl", 
    material: "Italian Briar Wood", 
    price: 45, 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
    description: "Traditional deep bowl design perfect for extended sessions",
    features: ["Heat Resistant", "Natural Grain", "Hand Polished"]
  },
  { 
    id: 2, 
    name: "Deep Chamber Pro", 
    material: "Premium Cherry Wood", 
    price: 55, 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    description: "Extra deep chamber for enhanced flavor development",
    features: ["Extended Capacity", "Smooth Draw", "Premium Finish"]
  },
  { 
    id: 3, 
    name: "Wide Bowl Elite", 
    material: "Authentic Meerschaum", 
    price: 75, 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop",
    description: "Wide bowl design for optimal air flow and cooling",
    features: ["Superior Cooling", "Easy Pack", "Natural Filter"]
  },
  { 
    id: 4, 
    name: "Artisan Bowl Master", 
    material: "Rare Olive Wood", 
    price: 65, 
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop",
    description: "Master craftsman design with unique grain patterns",
    features: ["Unique Grain", "Artisan Made", "Limited Edition"]
  }
];

const pipeRings = [
  { 
    id: 1, 
    name: "Silver Band Classic", 
    material: "925 Sterling Silver", 
    price: 25, 
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=150&fit=crop",
    description: "Elegant sterling silver band with anti-tarnish coating",
    features: ["Tarnish Resistant", "Polished Finish", "Lifetime Warranty"]
  },
  { 
    id: 2, 
    name: "Gold Ring Luxury", 
    material: "14k Solid Gold", 
    price: 95, 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    description: "Solid gold ring with intricate engraving options",
    features: ["Solid Gold", "Custom Engraving", "Luxury Box"]
  },
  { 
    id: 3, 
    name: "Copper Band Vintage", 
    material: "Pure Copper", 
    price: 15, 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop",
    description: "Vintage copper band that develops beautiful patina over time",
    features: ["Natural Patina", "Antimicrobial", "Vintage Style"]
  },
  { 
    id: 4, 
    name: "Titanium Ring Pro", 
    material: "Grade 5 Titanium", 
    price: 65, 
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop",
    description: "Aerospace-grade titanium with brushed finish",
    features: ["Ultra Light", "Corrosion Proof", "Space Grade"]
  }
];

const pipeTails = [
  { 
    id: 1, 
    name: "Straight Stem Classic", 
    material: "Premium Ebonite", 
    price: 35, 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
    description: "Traditional straight stem with comfortable mouthpiece",
    features: ["Comfortable Bite", "Easy Clean", "Classic Design"]
  },
  { 
    id: 2, 
    name: "Curved Stem Pro", 
    material: "High-Grade Acrylic", 
    price: 40, 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    description: "Ergonomic curved design for natural smoking position",
    features: ["Ergonomic Curve", "Balanced Weight", "Smooth Draw"]
  },
  { 
    id: 3, 
    name: "Bent Stem Master", 
    material: "Premium Vulcanite", 
    price: 45, 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop",
    description: "Master-crafted bent stem with perfect balance point",
    features: ["Perfect Balance", "Natural Grip", "Professional Grade"]
  },
  { 
    id: 4, 
    name: "Long Stem Elite", 
    material: "Sustainable Bamboo", 
    price: 55, 
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop",
    description: "Extended length bamboo stem for cooler smoking experience",
    features: ["Extra Cooling", "Eco Friendly", "Unique Texture"]
  }
];

const categoriesList = ["All", "Wood", "Metal", "Hybrid", "Luxury"];
const sortOptions = [
  { value: "featured", label: "Featured First", icon: Star },
  { value: "price-low", label: "Price: Low to High", icon: ArrowUp },
  { value: "price-high", label: "Price: High to Low", icon: ArrowDown },
  { value: "rating", label: "Highest Rated", icon: Award },
  { value: "newest", label: "Newest First", icon: Sparkles },
  { value: "bestseller", label: "Best Sellers", icon: TrendingUp }
];

// Toast notification component
const Toast = ({ message, type = "success", onClose }) => (
  <motion.div
    className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[70] flex items-center gap-3 ${
      type === "success" 
        ? "bg-gradient-to-r from-green-800 to-green-700 text-green-100" 
        : "bg-gradient-to-r from-red-800 to-red-700 text-red-100"
    }`}
    initial={{ opacity: 0, y: -20, x: 20 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, y: -20, x: 20 }}
    transition={{ type: "spring", damping: 20, stiffness: 300 }}
  >
    <CheckCircle className="w-5 h-5" />
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function EnhancedOrdersPage() {
  const { t } = useTranslation();
  
  // Core state
  const [activeSection, setActiveSection] = useState("commercial");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // UI state - mobile optimized
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedPipe, setSelectedPipe] = useState(null);
  const [toast, setToast] = useState(null);

  // Custom pipe builder state
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedRing, setSelectedRing] = useState(null);
  const [selectedTail, setSelectedTail] = useState(null);
  const [customPipeName, setCustomPipeName] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [buildStep, setBuildStep] = useState(1);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarExpanded(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const showNavbar = currentScroll < lastScrollY || currentScroll < 10;
          setNavbarHidden(!showNavbar);
          setLastScrollY(currentScroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Enhanced filtered and sorted pipes
  const filteredAndSortedPipes = useMemo(() => {
    let filtered = commercialPipes
      .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
      .filter((p) => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "newest":
        return filtered.sort((a, b) => b.isNew - a.isNew);
      case "bestseller":
        return filtered.sort((a, b) => b.isBestseller - a.isBestseller);
      case "featured":
      default:
        return filtered.sort((a, b) => b.featured - a.featured);
    }
  }, [selectedCategory, searchTerm, sortBy]);

  // Toast system
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Enhanced cart functions
  const addToCart = useCallback((item) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id && p.type === item.type);
      if (existing) {
        const updated = prev.map(p => p.id === item.id && p.type === item.type 
          ? { ...p, quantity: p.quantity + 1 } 
          : p);
        showToast(`Updated ${item.name} quantity in cart!`);
        return updated;
      }
      showToast(`${item.name} added to cart!`);
      return [...prev, { ...item, quantity: 1 }];
    });
    
    if (isMobile) {
      setTimeout(() => setCartVisible(true), 500);
      setTimeout(() => setCartVisible(false), 2500);
    }
  }, [isMobile, showToast]);

  const removeFromCart = useCallback((itemId, itemType) => {
    setCart(prev => {
      const item = prev.find(item => item.id === itemId && item.type === itemType);
      if (item) {
        showToast(`${item.name} removed from cart`, "success");
      }
      return prev.filter(item => !(item.id === itemId && item.type === itemType));
    });
  }, [showToast]);

  const updateCartQuantity = useCallback((itemId, itemType, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, itemType);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.id === itemId && item.type === itemType 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  }, [removeFromCart]);

  // Enhanced favorites functionality
  const toggleFavorite = useCallback((pipeId) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(pipeId);
      const pipe = commercialPipes.find(p => p.id === pipeId);
      if (pipe) {
        showToast(
          isAdding ? `${pipe.name} added to favorites!` : `${pipe.name} removed from favorites`,
          "success"
        );
      }
      return isAdding 
        ? [...prev, pipeId]
        : prev.filter(id => id !== pipeId);
    });
  }, [showToast]);

  // Recently viewed functionality
  const addToRecentlyViewed = useCallback((pipe) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== pipe.id);
      return [pipe, ...filtered].slice(0, 5);
    });
  }, []);

  // Custom pipe functions
  const getCustomPipeTotal = useCallback(() => {
    const headPrice = selectedHead?.price || 0;
    const ringPrice = selectedRing?.price || 0;
    const tailPrice = selectedTail?.price || 0;
    return headPrice + ringPrice + tailPrice;
  }, [selectedHead, selectedRing, selectedTail]);

  const addCustomPipeToCart = useCallback(() => {
    if (!selectedHead || !selectedRing || !selectedTail || !customPipeName.trim()) {
      showToast("Please complete your design before adding to cart!", "error");
      return;
    }
    
    const customPipe = {
      id: `custom-${Date.now()}`,
      type: "custom",
      name: customPipeName || "Custom Pipe",
      head: selectedHead,
      ring: selectedRing,
      tail: selectedTail,
      price: getCustomPipeTotal(),
      quantity: 1,
      image: selectedHead.image
    };
    
    addToCart(customPipe);
    showToast("Custom pipe added to cart! 🎉");
  }, [selectedHead, selectedRing, selectedTail, customPipeName, getCustomPipeTotal, addToCart, showToast]);

  const resetCustomPipe = useCallback(() => {
    setSelectedHead(null);
    setSelectedRing(null);
    setSelectedTail(null);
    setCustomPipeName("");
    setBuildStep(1);
    showToast("Custom pipe design reset!");
  }, [showToast]);

  // Mobile step navigation
  const nextStep = useCallback(() => {
    if (buildStep < 3) {
      setBuildStep(buildStep + 1);
    }
  }, [buildStep]);

  const prevStep = useCallback(() => {
    if (buildStep > 1) {
      setBuildStep(buildStep - 1);
    }
  }, [buildStep]);

  // Cart totals
  const cartTotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  , [cart]);

  const cartItemCount = useMemo(() => 
    cart.reduce((acc, item) => acc + item.quantity, 0)
  , [cart]);

  const cartSavings = useMemo(() => 
    cart.reduce((acc, item) => {
      if (item.originalPrice) {
        return acc + ((item.originalPrice - item.price) * item.quantity);
      }
      return acc;
    }, 0)
  , [cart]);

  // Enhanced pipe selection with recently viewed
  const handlePipeSelect = useCallback((pipe) => {
    setSelectedPipe(pipe);
    addToRecentlyViewed(pipe);
  }, [addToRecentlyViewed]);

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
        isMobile={isMobile}
      />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative min-h-screen pt-20 sm:pt-28 pb-24 flex overflow-auto bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')] bg-cover bg-center text-white font-serif">
        <div className="absolute inset-0 bg-black/70 z-0" />

        <motion.div
          className={`relative z-20 flex-1 px-3 sm:px-6 transition-all duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-xl bg-gradient-to-r from-white via-[#c9a36a] to-white bg-clip-text text-transparent"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(201, 163, 106, 0.3)",
                  "0 0 30px rgba(201, 163, 106, 0.5)",
                  "0 0 20px rgba(201, 163, 106, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Premium Tobacco Pipes ✨
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl mx-auto px-4">
              Discover our exquisite collection of handcrafted pipes and create your perfect custom piece
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
                {/* Enhanced Search and Filters */}
                <motion.section
                  className="max-w-6xl mx-auto bg-gradient-to-br from-[#2a1d13]/95 via-[#2a1d13]/90 to-[#1a120b]/95 backdrop-blur-lg border border-[#c9a36a]/20 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 mb-8 sm:mb-12 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    {/* Enhanced Search Bar */}
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c9a36a]/70 group-focus-within:text-[#c9a36a] transition-colors" />
                      <input
                        type="text"
                        placeholder="Search premium pipes, materials, or features..."
                        className="w-full pl-12 pr-4 py-4 text-sm rounded-xl bg-gradient-to-r from-stone-900/50 to-stone-800/50 text-white border border-stone-600/50 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] focus:border-transparent backdrop-blur-sm transition-all duration-300 touch-manipulation"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Enhanced Controls Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Mobile Filter Toggle */}
                      {isMobile && (
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className="flex items-center justify-center gap-3 bg-gradient-to-r from-stone-800/80 to-stone-700/80 border border-[#c9a36a]/30 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:from-stone-700/80 hover:to-stone-600/80 touch-manipulation backdrop-blur-sm"
                        >
                          <Filter className="w-4 h-4" />
                          Filters & Sort
                          <motion.div
                            animate={{ rotate: showFilters ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.div>
                        </button>
                      )}

                      {/* Sort Dropdown - Always visible on desktop */}
                      {!isMobile && (
                        <div className="flex items-center gap-3">
                          <ArrowUpDown className="w-4 h-4 text-[#c9a36a]" />
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gradient-to-r from-stone-800/80 to-stone-700/80 border border-[#c9a36a]/30 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] text-white backdrop-blur-sm cursor-pointer"
                          >
                            {sortOptions.map((option) => (
                              <option key={option.value} value={option.value} className="bg-stone-800 text-white">
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Category Filters & Sort - Mobile Collapsible */}
                    <AnimatePresence>
                      {(!isMobile || showFilters) && (
                        <motion.div
                          initial={isMobile ? { opacity: 0, height: 0 } : { opacity: 1 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {/* Mobile Sort Options */}
                          {isMobile && (
                            <div>
                              <label className="block text-sm font-medium text-[#c9a36a] mb-2">Sort By</label>
                              <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-gradient-to-r from-stone-800/80 to-stone-700/80 border border-[#c9a36a]/30 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] text-white backdrop-blur-sm"
                              >
                                {sortOptions.map((option) => (
                                  <option key={option.value} value={option.value} className="bg-stone-800 text-white">
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Category Filters */}
                          <div>
                            <label className="block text-sm font-medium text-[#c9a36a] mb-3">Categories</label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              {categoriesList.map((category) => (
                                <motion.button
                                  key={category}
                                  whileTap={{ scale: 0.95 }}
                                  whileHover={{ scale: 1.02 }}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                    if (isMobile) setShowFilters(false);
                                  }}
                                  className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 touch-manipulation font-medium backdrop-blur-sm ${
                                    selectedCategory === category
                                      ? "bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black shadow-lg shadow-[#c9a36a]/25 scale-105"
                                      : "bg-gradient-to-r from-stone-800/60 to-stone-700/60 border border-[#c9a36a]/20 text-white hover:border-[#c9a36a]/40 hover:shadow-lg"
                                  }`}
                                >
                                  {category === "All" ? "🏪 All" : 
                                   category === "Wood" ? "🌳 Wood" :
                                   category === "Metal" ? "⚡ Metal" :
                                   category === "Hybrid" ? "🔥 Hybrid" :
                                   "👑 Luxury"}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Results Summary */}
                    <div className="flex items-center justify-between text-sm text-stone-400">
                      <span>{filteredAndSortedPipes.length} pipes found</span>
                      {searchTerm && (
                        <span>for "{searchTerm}"</span>
                      )}
                    </div>
                  </div>
                </motion.section>

                {/* Recently Viewed Section */}
                {recentlyViewed.length > 0 && (
                  <motion.section
                    className="max-w-6xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4 px-4 sm:px-0">
                      <Clock className="w-5 h-5 text-[#c9a36a]" />
                      <h3 className="text-lg font-semibold">Recently Viewed</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 px-4 sm:px-0">
                      {recentlyViewed.map((pipe) => (
                        <motion.button
                          key={`recent-${pipe.id}`}
                          onClick={() => handlePipeSelect(pipe)}
                          className="flex-shrink-0 bg-gradient-to-br from-[#1a120b]/90 to-[#2a1d13]/90 border border-[#c9a36a]/20 rounded-xl p-3 w-32 hover:border-[#c9a36a]/40 transition-all duration-300 backdrop-blur-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img 
                            src={pipe.image} 
                            alt={pipe.name} 
                            className="w-full h-16 object-cover rounded-lg mb-2" 
                          />
                          <p className="text-xs font-medium truncate">{pipe.name}</p>
                          <p className="text-xs text-[#c9a36a]">${pipe.price}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Enhanced Commercial Pipes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                  {filteredAndSortedPipes.map((pipe, idx) => (
                    <motion.div
                      key={pipe.id}
                      className="group bg-gradient-to-br from-[#1a120b]/95 via-[#1a120b]/90 to-[#2a1d13]/95 backdrop-blur-lg border border-[#2a1d13]/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#c9a36a]/10 transition-all duration-500 touch-manipulation overflow-hidden relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -5, 
                        borderColor: "rgba(201, 163, 106, 0.4)",
                        boxShadow: "0 20px 40px rgba(201, 163, 106, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a36a]/0 via-[#c9a36a]/5 to-[#c9a36a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      
                      <div className="relative z-10">
                        <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={pipe.image}
                            alt={pipe.name}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          
                          {/* Enhanced Overlay badges */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                              {pipe.featured && (
                                <motion.span 
                                  className="bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: idx * 0.1 + 0.2 }}
                                >
                                  <Star className="w-3 h-3 fill-current" />
                                  Featured
                                </motion.span>
                              )}
                              {pipe.isNew && (
                                <motion.span 
                                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: idx * 0.1 + 0.3 }}
                                >
                                  <Sparkles className="w-3 h-3" />
                                  New
                                </motion.span>
                              )}
                              {pipe.isBestseller && (
                                <motion.span 
                                  className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: idx * 0.1 + 0.4 }}
                                >
                                  <Crown className="w-3 h-3" />
                                  Best Seller
                                </motion.span>
                              )}
                              {pipe.discount > 0 && (
                                <motion.span 
                                  className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: idx * 0.1 + 0.5 }}
                                >
                                  <Flame className="w-3 h-3" />
                                  -{pipe.discount}%
                                </motion.span>
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-2 items-end">
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(pipe.id);
                                }}
                                className="bg-black/70 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:bg-black/80 touch-manipulation"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Heart 
                                  className={`w-4 h-4 transition-all duration-300 ${
                                    favorites.includes(pipe.id) 
                                      ? 'text-red-500 fill-current scale-110' 
                                      : 'text-white hover:text-red-400'
                                  }`}
                                />
                              </motion.button>
                              
                              <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs font-medium">{pipe.rating}</span>
                                <span className="text-xs text-stone-400">({pipe.reviewCount})</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick View Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.button
                              onClick={() => handlePipeSelect(pipe)}
                              className="bg-[#c9a36a] hover:bg-[#d4b173] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4" />
                              Quick View
                            </motion.button>
                          </div>
                        </div>
                        
                        {/* Enhanced Product Info */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-1 line-clamp-1 group-hover:text-[#c9a36a] transition-colors duration-300">
                              {pipe.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-400 mb-2 line-clamp-2 leading-relaxed">
                              {pipe.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {pipe.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-[#c9a36a]/10 text-[#c9a36a] px-2 py-1 rounded-full border border-[#c9a36a]/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Enhanced Pricing */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl sm:text-2xl font-bold text-[#c9a36a]">
                                ${pipe.price}
                              </span>
                              {pipe.originalPrice && (
                                <span className="text-sm text-stone-500 line-through">
                                  ${pipe.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full ${
                              pipe.inStock 
                                ? 'bg-green-800/30 text-green-300 border border-green-700/30' 
                                : 'bg-red-800/30 text-red-300 border border-red-700/30'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                pipe.inStock ? 'bg-green-400' : 'bg-red-400'
                              }`} />
                              {pipe.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="relative z-10 flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart({...pipe, type: 'commercial'})}
                          disabled={!pipe.inStock}
                          className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation shadow-lg ${
                            pipe.inStock
                              ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173] hover:from-[#d4b173] hover:to-[#e5c584] text-black shadow-[#c9a36a]/25'
                              : 'bg-stone-700/50 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">
                            {pipe.inStock ? "Add to Cart" : "Sold Out"}
                          </span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePipeSelect(pipe)}
                          className="bg-gradient-to-r from-stone-800/80 to-stone-700/80 hover:from-stone-700/80 hover:to-stone-600/80 px-4 py-3 rounded-xl transition-all duration-300 touch-manipulation backdrop-blur-sm border border-[#c9a36a]/20 hover:border-[#c9a36a]/40 shadow-lg"
                        >
                          <Eye className="w-4 h-4 text-[#c9a36a]" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced No Results */}
                {filteredAndSortedPipes.length === 0 && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-6xl sm:text-8xl mb-6">🔍</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#c9a36a]">
                      No pipes found
                    </h3>
                    <p className="text-stone-400 mb-8 max-w-md mx-auto px-4">
                      We couldn't find any pipes matching your criteria. Try adjusting your search or filters.
                    </p>
                    <div className="space-y-4">
                      <motion.button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                          setSortBy("featured");
                        }}
                        className="bg-gradient-to-r from-[#c9a36a] to-[#d4b173] hover:from-[#d4b173] hover:to-[#e5c584] px-8 py-3 rounded-xl text-black font-bold transition-all duration-300 touch-manipulation shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear All Filters
                      </motion.button>
                      <div className="text-sm text-stone-500">
                        Or try searching for: "briar", "metal", "luxury", "handcrafted"
                      </div>
                    </div>
                  </motion.div>
                )}
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
                {/* Enhanced Custom Pipe Builder Header */}
                <motion.div
                  className="max-w-6xl mx-auto bg-gradient-to-br from-[#2a1d13]/95 via-[#2a1d13]/90 to-[#1a120b]/95 backdrop-blur-lg border border-[#c9a36a]/20 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 mb-8 sm:mb-12 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center mb-8">
                    <motion.h2 
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 flex items-center justify-center gap-3 bg-gradient-to-r from-white via-[#c9a36a] to-white bg-clip-text text-transparent"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(201, 163, 106, 0.3)",
                          "0 0 20px rgba(201, 163, 106, 0.5)",
                          "0 0 10px rgba(201, 163, 106, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Wrench className="w-6 h-6 md:w-8 md:h-8 text-[#c9a36a]" />
                      🛠️ Custom Pipe Builder
                    </motion.h2>
                    <p className="text-sm sm:text-base text-stone-300 px-4 max-w-2xl mx-auto">
                      Design your perfect pipe by selecting premium components. Each piece is carefully crafted to your specifications.
                    </p>
                  </div>

                  {/* Enhanced Step Indicator for Mobile */}
                  {isMobile && !previewMode && (
                    <div className="flex items-center justify-center mb-8">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              buildStep >= step 
                                ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black shadow-lg shadow-[#c9a36a]/25' 
                                : 'bg-stone-700/50 text-stone-300 border border-stone-600'
                            }`}
                            animate={buildStep >= step ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {buildStep > step ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              step
                            )}
                          </motion.div>
                          {step < 3 && (
                            <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                              buildStep > step ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173]' : 'bg-stone-700/50'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Enhanced Control Panel */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative flex-1 w-full">
                        <input
                          type="text"
                          placeholder="Name your masterpiece..."
                          className="w-full px-4 py-3 text-sm rounded-xl bg-gradient-to-r from-stone-900/50 to-stone-800/50 text-white border border-[#c9a36a]/30 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] focus:border-transparent backdrop-blur-sm transition-all duration-300 touch-manipulation"
                          value={customPipeName}
                          onChange={(e) => setCustomPipeName(e.target.value)}
                        />
                        {customPipeName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        <motion.button
                          onClick={() => setPreviewMode(!previewMode)}
                          className={`flex-1 sm:flex-none px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation backdrop-blur-sm font-medium ${
                            previewMode 
                              ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black shadow-lg shadow-[#c9a36a]/25' 
                              : 'bg-gradient-to-r from-stone-800/60 to-stone-700/60 text-white border border-[#c9a36a]/30 hover:border-[#c9a36a]/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">
                            {previewMode ? "✏️ Edit" : "👁️ Preview"}
                          </span>
                        </motion.button>
                        
                        <motion.button
                          onClick={resetCustomPipe}
                          className="flex-1 sm:flex-none bg-gradient-to-r from-red-800/60 to-red-700/60 hover:from-red-700/60 hover:to-red-600/60 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation backdrop-blur-sm border border-red-700/30 text-white font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span className="text-sm">Reset</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Enhanced Custom Pipe Progress Summary */}
                    {(selectedHead || selectedRing || selectedTail) && (
                      <motion.div 
                        className="p-6 bg-gradient-to-r from-[#1a120b]/80 to-[#2a1d13]/80 rounded-xl border border-[#c9a36a]/30 backdrop-blur-sm shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="space-y-2">
                            <h4 className="font-bold text-[#c9a36a] flex items-center gap-2">
                              <Package className="w-5 h-5" />
                              Your Custom Creation
                            </h4>
                            <div className="grid grid-cols-3 gap-4 text-xs text-stone-400">
                              <div className={`p-2 rounded-lg transition-all duration-300 ${selectedHead ? 'bg-green-800/20 border border-green-700/30' : 'bg-stone-800/30 border border-stone-700/30'}`}>
                                <div className="font-medium text-white">Head</div>
                                {selectedHead ? selectedHead.name : "Not selected"}
                              </div>
                              <div className={`p-2 rounded-lg transition-all duration-300 ${selectedRing ? 'bg-green-800/20 border border-green-700/30' : 'bg-stone-800/30 border border-stone-700/30'}`}>
                                <div className="font-medium text-white">Ring</div>
                                {selectedRing ? selectedRing.name : "Not selected"}
                              </div>
                              <div className={`p-2 rounded-lg transition-all duration-300 ${selectedTail ? 'bg-green-800/20 border border-green-700/30' : 'bg-stone-800/30 border border-stone-700/30'}`}>
                                <div className="font-medium text-white">Tail</div>
                                {selectedTail ? selectedTail.name : "Not selected"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center lg:text-right space-y-3">
                            <div className="space-y-1">
                              <div className="text-2xl lg:text-3xl font-bold text-[#c9a36a]">
                                ${getCustomPipeTotal()}
                              </div>
                              {getCustomPipeTotal() > 0 && (
                                <div className="text-xs text-stone-400">
                                  Estimated build time: 7-14 days
                                </div>
                              )}
                            </div>
                            {selectedHead && selectedRing && selectedTail && (
                              <motion.button
                                onClick={addCustomPipeToCart}
                                disabled={!customPipeName.trim()}
                                className={`w-full lg:w-auto px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation shadow-lg ${
                                  customPipeName.trim()
                                    ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173] hover:from-[#d4b173] hover:to-[#e5c584] text-black shadow-[#c9a36a]/25'
                                    : 'bg-stone-700/50 text-stone-400 cursor-not-allowed'
                                }`}
                                whileHover={customPipeName.trim() ? { scale: 1.02 } : {}}
                                whileTap={customPipeName.trim() ? { scale: 0.98 } : {}}
                              >
                                <ShoppingBag className="w-4 h-4" />
                                <span className="text-sm">Add to Cart</span>
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {!previewMode ? (
                  <div className="space-y-12">
                    {/* Mobile Navigation Controls */}
                    {isMobile && (
                      <div className="flex justify-between items-center px-4">
                        <motion.button
                          onClick={prevStep}
                          disabled={buildStep === 1}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 touch-manipulation ${
                            buildStep === 1
                              ? 'text-stone-500 cursor-not-allowed'
                              : 'text-[#c9a36a] hover:bg-[#c9a36a]/10 border border-[#c9a36a]/30'
                          }`}
                          whileHover={buildStep > 1 ? { scale: 1.02 } : {}}
                          whileTap={buildStep > 1 ? { scale: 0.98 } : {}}
                        >
                          ← Previous
                        </motion.button>
                        
                        <div className="text-center">
                          <div className="text-sm text-stone-400">Step {buildStep} of 3</div>
                          <div className="text-xs text-[#c9a36a] font-medium">
                            {buildStep === 1 ? "Select Head" : buildStep === 2 ? "Choose Ring" : "Pick Tail"}
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={nextStep}
                          disabled={buildStep === 3}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 touch-manipulation ${
                            buildStep === 3
                              ? 'text-stone-500 cursor-not-allowed'
                              : 'text-[#c9a36a] hover:bg-[#c9a36a]/10 border border-[#c9a36a]/30'
                          }`}
                          whileHover={buildStep < 3 ? { scale: 1.02 } : {}}
                          whileTap={buildStep < 3 ? { scale: 0.98 } : {}}
                        >
                          Next →
                        </motion.button>
                      </div>
                    )}

                    {/* Enhanced Pipe Heads - Step 1 */}
                    {(!isMobile || buildStep === 1) && (
                      <motion.section
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className="text-center">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black flex items-center justify-center font-bold">
                              1
                            </div>
                            🏺 {isMobile ? "Select Your Head" : "Choose Your Pipe Head"}
                          </h3>
                          <p className="text-stone-400 text-sm max-w-md mx-auto">
                            The heart of your pipe - select from premium materials and craftsmanship styles
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-0">
                          {pipeHeads.map((head) => (
                            <motion.div
                              key={head.id}
                              className={`group bg-gradient-to-br from-[#1a120b]/95 to-[#2a1d13]/95 backdrop-blur-lg border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-500 touch-manipulation relative overflow-hidden ${
                                selectedHead?.id === head.id 
                                  ? 'border-[#c9a36a] shadow-2xl shadow-[#c9a36a]/20 scale-[1.02]' 
                                  : 'border-[#2a1d13]/50 hover:border-[#c9a36a]/50 hover:shadow-xl'
                              }`}
                              onClick={() => {
                                setSelectedHead(head);
                                if (isMobile) nextStep();
                              }}
                              whileHover={{ scale: isMobile ? 1 : 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: head.id * 0.1 }}
                            >
                              {/* Selection Glow Effect */}
                              {selectedHead?.id === head.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a36a]/10 via-[#c9a36a]/5 to-[#c9a36a]/10 rounded-2xl" />
                              )}
                              
                              <div className="relative z-10">
                                <div className="relative overflow-hidden rounded-xl mb-3">
                                  <img
                                    src={head.image}
                                    alt={head.name}
                                    className="w-full h-28 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  {selectedHead?.id === head.id && (
                                    <div className="absolute inset-0 bg-[#c9a36a]/20 flex items-center justify-center rounded-xl">
                                      <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Selected
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-bold text-sm sm:text-base group-hover:text-[#c9a36a] transition-colors duration-300">
                                    {head.name}
                                  </h4>
                                  <p className="text-xs text-stone-400 line-clamp-2">
                                    {head.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-stone-500">
                                      {head.material}
                                    </span>
                                    <span className="text-lg font-bold text-[#c9a36a]">
                                      ${head.price}
                                    </span>
                                  </div>
                                  
                                  {/* Features */}
                                  <div className="flex flex-wrap gap-1 pt-2">
                                    {head.features.slice(0, 2).map((feature) => (
                                      <span
                                        key={feature}
                                        className="text-xs bg-[#c9a36a]/10 text-[#c9a36a] px-2 py-1 rounded-full border border-[#c9a36a]/20"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    )}

                    {/* Enhanced Pipe Rings - Step 2 */}
                    {(!isMobile || buildStep === 2) && (
                      <motion.section
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <div className="text-center">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black flex items-center justify-center font-bold">
                              2
                            </div>
                            💍 {isMobile ? "Select Your Ring" : "Choose Your Accent Ring"}
                          </h3>
                          <p className="text-stone-400 text-sm max-w-md mx-auto">
                            The perfect accent - select from precious metals to complement your design
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-0">
                          {pipeRings.map((ring) => (
                            <motion.div
                              key={ring.id}
                              className={`group bg-gradient-to-br from-[#1a120b]/95 to-[#2a1d13]/95 backdrop-blur-lg border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-500 touch-manipulation relative overflow-hidden ${
                                selectedRing?.id === ring.id 
                                  ? 'border-[#c9a36a] shadow-2xl shadow-[#c9a36a]/20 scale-[1.02]' 
                                  : 'border-[#2a1d13]/50 hover:border-[#c9a36a]/50 hover:shadow-xl'
                              }`}
                              onClick={() => {
                                setSelectedRing(ring);
                                if (isMobile) nextStep();
                              }}
                              whileHover={{ scale: isMobile ? 1 : 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: ring.id * 0.1 }}
                            >
                              {/* Selection Glow Effect */}
                              {selectedRing?.id === ring.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a36a]/10 via-[#c9a36a]/5 to-[#c9a36a]/10 rounded-2xl" />
                              )}
                              
                              <div className="relative z-10">
                                <div className="relative overflow-hidden rounded-xl mb-3">
                                  <img
                                    src={ring.image}
                                    alt={ring.name}
                                    className="w-full h-28 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  {selectedRing?.id === ring.id && (
                                    <div className="absolute inset-0 bg-[#c9a36a]/20 flex items-center justify-center rounded-xl">
                                      <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Selected
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-bold text-sm sm:text-base group-hover:text-[#c9a36a] transition-colors duration-300">
                                    {ring.name}
                                  </h4>
                                  <p className="text-xs text-stone-400 line-clamp-2">
                                    {ring.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-stone-500">
                                      {ring.material}
                                    </span>
                                    <span className="text-lg font-bold text-[#c9a36a]">
                                      ${ring.price}
                                    </span>
                                  </div>
                                  
                                  {/* Features */}
                                  <div className="flex flex-wrap gap-1 pt-2">
                                    {ring.features.slice(0, 2).map((feature) => (
                                      <span
                                        key={feature}
                                        className="text-xs bg-[#c9a36a]/10 text-[#c9a36a] px-2 py-1 rounded-full border border-[#c9a36a]/20"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    )}

                    {/* Enhanced Pipe Tails - Step 3 */}
                    {(!isMobile || buildStep === 3) && (
                      <motion.section
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <div className="text-center">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c9a36a] to-[#d4b173] text-black flex items-center justify-center font-bold">
                              3
                            </div>
                            🎯 {isMobile ? "Select Your Tail" : "Choose Your Stem Design"}
                          </h3>
                          <p className="text-stone-400 text-sm max-w-md mx-auto">
                            The finishing touch - select the perfect stem for comfort and style
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-0">
                          {pipeTails.map((tail) => (
                            <motion.div
                              key={tail.id}
                              className={`group bg-gradient-to-br from-[#1a120b]/95 to-[#2a1d13]/95 backdrop-blur-lg border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-500 touch-manipulation relative overflow-hidden ${
                                selectedTail?.id === tail.id 
                                  ? 'border-[#c9a36a] shadow-2xl shadow-[#c9a36a]/20 scale-[1.02]' 
                                  : 'border-[#2a1d13]/50 hover:border-[#c9a36a]/50 hover:shadow-xl'
                              }`}
                              onClick={() => setSelectedTail(tail)}
                              whileHover={{ scale: isMobile ? 1 : 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: tail.id * 0.1 }}
                            >
                              {/* Selection Glow Effect */}
                              {selectedTail?.id === tail.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a36a]/10 via-[#c9a36a]/5 to-[#c9a36a]/10 rounded-2xl" />
                              )}
                              
                              <div className="relative z-10">
                                <div className="relative overflow-hidden rounded-xl mb-3">
                                  <img
                                    src={tail.image}
                                    alt={tail.name}
                                    className="w-full h-28 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  {selectedTail?.id === tail.id && (
                                    <div className="absolute inset-0 bg-[#c9a36a]/20 flex items-center justify-center rounded-xl">
                                      <div className="bg-[#c9a36a] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Selected
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-bold text-sm sm:text-base group-hover:text-[#c9a36a] transition-colors duration-300">
                                    {tail.name}
                                  </h4>
                                  <p className="text-xs text-stone-400 line-clamp-2">
                                    {tail.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-stone-500">
                                      {tail.material}
                                    </span>
                                    <span className="text-lg font-bold text-[#c9a36a]">
                                      ${tail.price}
                                    </span>
                                  </div>
                                  
                                  {/* Features */}
                                  <div className="flex flex-wrap gap-1 pt-2">
                                    {tail.features.slice(0, 2).map((feature) => (
                                      <span
                                        key={feature}
                                        className="text-xs bg-[#c9a36a]/10 text-[#c9a36a] px-2 py-1 rounded-full border border-[#c9a36a]/20"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    )}
                  </div>
                ) : (
                  /* Enhanced Preview Mode */
                  <motion.section
                    className="space-y-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1a120b]/95 to-[#2a1d13]/95 backdrop-blur-lg border border-[#c9a36a]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                      <motion.h3 
                        className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white via-[#c9a36a] to-white bg-clip-text text-transparent"
                        animate={{ 
                          textShadow: [
                            "0 0 10px rgba(201, 163, 106, 0.3)",
                            "0 0 20px rgba(201, 163, 106, 0.5)",
                            "0 0 10px rgba(201, 163, 106, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🎨 Your Masterpiece Preview
                      </motion.h3>
                      
                      {(selectedHead && selectedRing && selectedTail) ? (
                        <div className="space-y-8">
                          {/* Enhanced Visual Assembly */}
                          <div className="bg-gradient-to-r from-[#2a1d13]/60 to-[#1a120b]/60 rounded-2xl p-6 backdrop-blur-sm border border-[#c9a36a]/20">
                            <h4 className="text-xl font-bold mb-6 text-[#c9a36a] text-center flex items-center justify-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              Component Assembly
                            </h4>
                            <div className="space-y-4">
                              {[
                                { item: selectedHead, label: "Head", icon: "🏺", step: 1 },
                                { item: selectedRing, label: "Ring", icon: "💍", step: 2 },
                                { item: selectedTail, label: "Tail", icon: "🎯", step: 3 }
                              ].map(({ item, label, icon, step }, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.2 }}
                                >
                                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#1a120b]/70 to-[#2a1d13]/70 rounded-xl border border-[#c9a36a]/10 hover:border-[#c9a36a]/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a36a] to-[#d4b173] flex items-center justify-center text-black font-bold">
                                      {step}
                                    </div>
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-16 h-16 object-cover rounded-xl border border-[#c9a36a]/20" 
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg">{icon}</span>
                                        <h5 className="font-bold text-white truncate">{item.name}</h5>
                                      </div>
                                      <p className="text-sm text-stone-400 mb-1">{item.material}</p>
                                      <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-[#c9a36a]">${item.price}</div>
                                      <div className="text-xs text-stone-500 uppercase tracking-wide">{label}</div>
                                    </div>
                                  </div>
                                  {index < 2 && (
                                    <div className="flex justify-center py-2">
                                      <ChevronRight className="w-6 h-6 text-[#c9a36a] rotate-90" />
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Enhanced Details Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pipe Information */}
                            <div className="bg-gradient-to-br from-[#2a1d13]/60 to-[#1a120b]/60 rounded-2xl p-6 backdrop-blur-sm border border-[#c9a36a]/20">
                              <h4 className="text-xl font-bold mb-6 text-[#c9a36a] flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                Pipe Information
                              </h4>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 font-medium">Name:</span>
                                  <span className="font-bold text-white truncate ml-2">
                                    {customPipeName || "Unnamed Custom Pipe"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 font-medium">Head:</span>
                                  <span className="font-medium text-white truncate ml-2">{selectedHead.name}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 font-medium">Ring:</span>
                                  <span className="font-medium text-white truncate ml-2">{selectedRing.name}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 font-medium">Stem:</span>
                                  <span className="font-medium text-white truncate ml-2">{selectedTail.name}</span>
                                </div>
                              </div>
                            </div>

                            {/* Enhanced Pricing Breakdown */}
                            <div className="bg-gradient-to-br from-[#2a1d13]/60 to-[#1a120b]/60 rounded-2xl p-6 backdrop-blur-sm border border-[#c9a36a]/20">
                              <h4 className="text-xl font-bold mb-6 text-[#c9a36a] flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Pricing Breakdown
                              </h4>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 truncate">{selectedHead.name}:</span>
                                  <span className="font-bold text-[#c9a36a] ml-2">${selectedHead.price}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 truncate">{selectedRing.name}:</span>
                                  <span className="font-bold text-[#c9a36a] ml-2">${selectedRing.price}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#1a120b]/50 rounded-lg">
                                  <span className="text-stone-300 truncate">{selectedTail.name}:</span>
                                  <span className="font-bold text-[#c9a36a] ml-2">${selectedTail.price}</span>
                                </div>
                                <div className="border-t border-[#c9a36a]/30 pt-4 mt-4">
                                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#c9a36a]/20 to-[#d4b173]/20 rounded-lg border border-[#c9a36a]/30">
                                    <span className="text-xl font-bold text-[#c9a36a]">Total:</span>
                                    <span className="text-2xl font-bold text-[#c9a36a]">${getCustomPipeTotal()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                                                    {/* Enhanced Specifications */}
                                                    {/* Enhanced Specifications */}
                          <div className="bg-gradient-to-br from-[#2a1d13]/60 to-[#1a120b]/60 rounded-2xl p-6 backdrop-blur-sm border border-[#c9a36a]/20">
                            <h4 className="text-xl font-bold mb-6 text-[#c9a36a] flex items-center gap-2">
                              <Package className="w-5 h-5" />
                              Specifications
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                { label: "Head", specs: selectedHead?.features },
                                { label: "Ring", specs: selectedRing?.features },
                                { label: "Tail", specs: selectedTail?.features },
                              ].map(({ label, specs }, i) => (
                                <div
                                  key={i}
                                  className="p-4 bg-[#1a120b]/50 rounded-xl border border-[#c9a36a]/10 space-y-2"
                                >
                                  <h5 className="text-[#c9a36a] font-semibold">
                                    {label} Features
                                  </h5>
                                  <ul className="text-sm text-stone-300 list-disc list-inside space-y-1">
                                    {specs?.map((feature, idx) => (
                                      <li key={idx}>{feature}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Confirm Button */}
                          <div className="text-center mt-10">
                            <motion.button
                              onClick={addCustomPipeToCart}
                              
                              disabled={!customPipeName.trim()}
                              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation shadow-xl ${
                                customPipeName.trim()
                                  ? 'bg-gradient-to-r from-[#c9a36a] to-[#d4b173] hover:from-[#d4b173] hover:to-[#e5c584] text-black shadow-[#c9a36a]/25'
                                  : 'bg-stone-700/50 text-stone-400 cursor-not-allowed'
                              }`}
                              whileHover={customPipeName.trim() ? { scale: 1.02 } : {}}
                              whileTap={customPipeName.trim() ? { scale: 0.98 } : {}}
                            >
                              <ShoppingBag className="w-5 h-5" />
                              <span className="text-sm">Confirm & Add to Cart</span>
                            </motion.button>

                            
  {/* View Cart Button */}
{/* Always show cart button */}
<Link
  to="/cart"
  className="inline-flex items-center justify-center gap-2 mt-4 text-sm text-[#c9a36a] hover:text-[#e5c584] transition"
>
  <ShoppingCart className="w-4 h-4" />
  View Cart
</Link>


                            

                            {/* Back to Edit */}
                            <button
                              onClick={() => setPreviewMode(false)}
                              className="mt-6 text-sm text-stone-400 hover:text-[#c9a36a] transition"
                            >
                              ← Back to Edit Mode
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-stone-400">
                          <p>Please complete your custom pipe design to preview.</p>
                        </div>
                      )}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}
