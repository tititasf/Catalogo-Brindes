import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "./data";
import { Product, PersonalizationTechnique } from "./types";
import { ProductVisualizer } from "./components/ProductVisualizer";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { SilkSimulator } from "./components/SilkSimulator";
import { CurationBrief } from "./components/CurationBrief";
import { AboutUs } from "./components/AboutUs";
import { ServicesPanel } from "./components/ServicesPanel";
import { ContactConcierge } from "./components/ContactConcierge";
import { HomePanel } from "./components/HomePanel";
import { ProductPDP } from "./components/ProductPDP";
import { 
  Briefcase, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Palette, 
  SlidersHorizontal, 
  FolderHeart, 
  Building2, 
  FileCheck2, 
  BookmarkCheck,
  ChevronRight,
  ArrowUpRight,
  Info,
  Ruler,
  PhoneCall,
  Flame,
  Home,
  Upload,
  ImageIcon,
  Moon,
  Sun
} from "lucide-react";

export default function App() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<"home" | "produtos" | "quemsomos" | "servicos" | "contato">("home");

  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Global States for interactive personalization syncing
  const [brandColor, setBrandColor] = useState<string>("#3b82f6");
  const [brandFont, setBrandFont] = useState<string>("font-sans");
  const [logoText, setLogoText] = useState<string>("ACME CORP");
  const [logoType, setLogoType] = useState<"text" | "upload">("text");
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Hover & Modal Active States
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCurationOpen, setIsCurationOpen] = useState<boolean>(false);
  const [selectedCurationProductId, setSelectedCurationProductId] = useState<string | undefined>(undefined);

  // Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      setLogoType("upload");
    }
  };

  // Filters
  const categories = [
    { id: "all", name: "Portfólio Completo", count: PRODUCTS.length },
    { id: "onboarding", name: "Welcome Kits", count: PRODUCTS.filter(p => p.category === "onboarding").length },
    { id: "executivo", name: "Linha Executiva", count: PRODUCTS.filter(p => p.category === "executivo").length },
    { id: "tech", name: "Dispositivos Tech", count: PRODUCTS.filter(p => p.category === "tech").length },
    { id: "lifestyle", name: "Lifestyle & Lazer", count: PRODUCTS.filter(p => p.category === "lifestyle").length },
    { id: "eventos", name: "Eventos & Eco", count: PRODUCTS.filter(p => p.category === "eventos").length },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleOpenCuration = (productId?: string) => {
    setSelectedCurationProductId(productId);
    setIsCurationOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-neutral-200 font-sans antialiased selection:bg-black selection:text-black dark:text-white dark:selection:bg-white dark:selection:text-black pb-12 transition-colors duration-300">
      
      {/* 1. TOP PREMIUM SYNCHRONIZATION BAR */}
      <div className="sticky top-0 z-30 bg-white/85 dark:bg-black/85 backdrop-blur-md border-b border-black/10 dark:border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo / B2B Branding Identity */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-sans font-bold text-sm text-black dark:text-white tracking-[0.3em] uppercase">
              OPUS <span className="text-[10px] font-light text-neutral-600 dark:text-neutral-400 tracking-normal">| Studio</span>
            </span>
          </div>

          {/* Interactive B2B Personalization Bar - The Psychological "Hack" */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto bg-white/90 dark:bg-black/90 p-2.5 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg shadow-gold/5">
            {/* Logo Text Input & Upload */}
            <div className="relative w-full sm:w-64 flex items-center gap-1">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  Logo:
                </span>
                <input
                  type="text"
                  maxLength={18}
                  value={logoText}
                  onChange={(e) => {
                    setLogoText(e.target.value);
                    setLogoType("text");
                  }}
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 rounded-xl py-1.5 pl-12 pr-3 text-[11px] text-black dark:text-white font-mono uppercase tracking-wider"
                  placeholder="DIGITE SUA MARCA"
                />
              </div>
              
              <label className="flex-shrink-0 cursor-pointer bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-gold hover:text-gold text-neutral-600 dark:text-neutral-400 p-2 rounded-xl transition-colors" title="Fazer upload do seu Logo (PNG transparente)">
                <input type="file" accept="image/png, image/svg+xml" className="hidden" onChange={handleLogoUpload} />
                <Upload size={14} />
              </label>
              
              {logoType === "upload" && (
                <button 
                  onClick={() => setLogoType("text")}
                  className="flex-shrink-0 bg-gold/20 text-gold p-2 rounded-xl border border-gold/30 hover:bg-gold/30 transition-colors"
                  title="Voltar para logo em texto"
                >
                  <ImageIcon size={14} />
                </button>
              )}
            </div>

            {/* HEX Color Picker */}
            <div className="flex items-center gap-2 w-full sm:w-auto bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl px-3 py-1.5">
              <Palette size={12} className="text-neutral-500" />
              <span className="text-[9px] font-mono text-neutral-500 uppercase">HEX da Empresa:</span>
              <div className="flex items-center gap-1.5 ml-1">
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-neutral-700 block shrink-0" 
                  style={{ backgroundColor: brandColor }}
                />
                <input
                  type="text"
                  maxLength={7}
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
                  className="bg-transparent text-black dark:text-white font-mono text-[11px] focus:outline-none w-14 uppercase"
                />
              </div>
            </div>

            {/* Theme Toggle EXPLICITO */}
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-[#0c0c0c] border border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-neutral-300 hover:text-gold hover:border-gold dark:hover:text-gold dark:hover:border-gold transition-colors font-mono text-[10px] uppercase tracking-wider font-bold shadow-sm"
              title="Alternar entre visualização Claro e Escuro"
            >
              {isDark ? (
                <><Moon size={14} className="text-gold" /> MODO: ESCURO</>
              ) : (
                <><Sun size={14} className="text-gold" /> MODO: CLARO</>
              )}
            </button>

            {/* Micro Indicator */}
            <div className="hidden lg:flex items-center gap-1 text-[9px] text-neutral-500 font-mono pl-1 uppercase">
              <Sparkles size={10} className="text-gold" />
              <span>Espelhamento Ativo</span>
            </div>
          </div>

          {/* Top Main CTA */}
          <button
            onClick={() => handleOpenCuration()}
            className="w-full md:w-auto bg-gold hover:bg-gold-hover text-black font-sans font-semibold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md shadow-gold/10 active:scale-98"
          >
            Solicitar Curadoria Corporativa
          </button>

        </div>
      </div>

      {/* 1.5 SUB-NAVIGATION TAB STRIP */}
      <div className="sticky top-[73px] md:top-[81px] z-20 bg-white/95 dark:bg-[#070707]/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-3 px-6 shadow-xl no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center sm:justify-start gap-1">
            {[
              { id: "home", label: "Boas-Vindas", count: "Home" },
              { id: "produtos", label: "Mostruário Interativo", count: PRODUCTS.length },
              { id: "quemsomos", label: "Quem Somos", count: null },
              { id: "servicos", label: "Estilos & Serviços", count: "4" },
              { id: "contato", label: "Contato & Concierge", count: "VIP" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-[9.5px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-black border-black dark:border-white font-bold"
                      : "bg-transparent text-neutral-600 dark:text-neutral-400 border-transparent hover:text-black dark:text-white hover:bg-neutral-100/60 dark:bg-neutral-900/60"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[8px] px-1 rounded font-semibold ${isActive ? "bg-white/15 dark:bg-black/15 text-black" : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono text-neutral-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Atendimento Comercial Ativo (Faria Lima, SP)</span>
          </div>
        </div>
      </div>

      {activeTab === "produtos" && (
        <>
          {/* 2. CORE CONTAINER HERO: IMMERSIVE STAGE */}
          <section className="px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-100 dark:border-neutral-900">
        
        {/* Left: Elevating Editorial Pitch */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.2em] bg-gold/10 text-gold border border-gold/25 uppercase font-semibold">
              Galeria de Alta Conversão B2B
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-black dark:text-white leading-tight">
              A Materialização de Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">Cultura Organizacional</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
              Não listamos commodities corporativas. Desenvolvemos o canvas de prestígio no qual a identidade e a honra de sua marca serão seladas sobre matérias-primas nobres. Explore as técnicas e personalize em tempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                const element = document.getElementById("gallery-anchor");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:bg-neutral-900 text-stone-100 py-3 px-5 rounded-xl text-xs font-sans font-medium uppercase tracking-wider border border-black/10 dark:border-white/10 hover:border-gold/45 transition-colors flex items-center justify-center gap-1"
            >
              Explorar Mostruário Completo <ChevronRight size={14} />
            </button>
            <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
              <Building2 size={12} />
              <span>HOMOLOGADO PARA GRANDES EMPRESAS</span>
            </div>
          </div>
        </div>

        {/* Right: Immersive Silk Screen Simulator Component */}
        <div className="lg:col-span-7">
          <SilkSimulator logoText={logoText} brandColor={brandColor} brandFont={brandFont} />
        </div>

      </section>

      {/* 3. CORE CONTAINER MASONRY GRID & SMART FILTERS */}
      <section id="gallery-anchor" className="px-6 py-16 max-w-7xl mx-auto space-y-10">
        
        {/* Filters and Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 dark:border-white/5 pb-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase block">
              Curadoria de Arte Corporativa
            </span>
            <h2 className="text-2xl font-sans font-semibold text-black dark:text-white tracking-tight">
              O Mostruário de Alto Padrão
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Passe o cursor sobre os artefatos para ver seu logotipo e cores aplicados de forma instantânea.
            </p>
          </div>

          {/* Smart Category Tabs (B2B Filters) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[10px] py-2 px-3.5 rounded-xl border font-sans font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-gold text-black border-gold shadow-lg shadow-gold/15"
                    : "bg-white/40 dark:bg-black/40 text-neutral-600 dark:text-neutral-400 border-black/5 dark:border-white/5 hover:text-black dark:text-white hover:border-black/20 dark:border-white/20"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[8px] font-mono px-1 rounded ${selectedCategory === cat.id ? "bg-white/15 dark:bg-black/15 text-black font-semibold" : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The Asymmetric Masonry Product Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              // Dynamic height representation for asymmetric masonry effect
              const heightClass = idx % 3 === 0 ? "h-[380px]" : idx % 2 === 0 ? "h-[420px]" : "h-[390px]";
              const isHovered = hoveredProductId === product.id;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  onClick={() => setActiveProduct(product)}
                  className={`break-inside-avoid w-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/5 hover:border-gold/35 p-5 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer overflow-hidden ${heightClass}`}
                >
                  
                  {/* Subtle hover backlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/20 pointer-events-none" />

                  {/* Top indicators */}
                  <div className="flex justify-between items-center z-10 relative">
                    <span className="text-[9px] font-mono bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 px-2.5 py-0.5 rounded-md border border-black/5 dark:border-white/5 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="text-[9px] font-mono text-gold/80 font-medium">
                      LOTE MÍN: {product.minimumQuantity}UN
                    </span>
                  </div>

                  {/* Graphic Visualizer block - Smooth Crossfade on Hover! */}
                  <div className="flex-1 w-full flex items-center justify-center py-4 relative z-10">
                    <ProductVisualizer
                      product={product}
                      activeTechnique={product.techniques[0]}
                      brandColor={brandColor}
                      brandFont={brandFont}
                      logoText={logoText}
                      logoType={logoType}
                      logoUrl={logoUrl}
                      showCustomized={isHovered} // Hover triggers custom state render!
                      isExploded={false}
                    />

                    {/* Explode icon helper indicator if product is a kit */}
                    {product.isKit && (
                      <div className="absolute bottom-2 right-2 bg-neutral-100/60 dark:bg-neutral-900/60 p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Layers size={10} title="Este item é um Kit" />
                      </div>
                    )}
                  </div>

                  {/* Product Copy Details */}
                  <div className="space-y-2 z-10 relative">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-sans font-medium text-[13px] text-black dark:text-white tracking-tight group-hover:text-black dark:text-white transition-colors">
                        {product.name}
                      </h3>
                      <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-gold transition-colors" />
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-normal line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Footing detail swatches summary */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-900">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">
                        {product.material.split(" ")[0]}
                      </span>
                      <div className="flex gap-1.5">
                        {product.colors.map(col => (
                          <span 
                            key={col} 
                            className="w-2.5 h-2.5 rounded-full border border-neutral-100 dark:border-neutral-900" 
                            style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </section>

      {/* 4. EXECUTIVE SERVICES / B2B BRAND MANIFESTO */}
      <section className="px-6 py-16 bg-white/60 dark:bg-black/60 border-t border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shadow-sm shadow-gold/5">
              <FileCheck2 size={14} />
            </div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 group-hover:text-gold transition-colors">
              Estudo de Viabilidade Técnica
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Cada marca interage de forma única sob substratos orgânicos. Nossos arquitetos analisam a liga de metal, as veias da madeira e as densidades do couro para definir as potências e velocidades ideais do feixe laser.
            </p>
          </div>

          <div className="space-y-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shadow-sm shadow-gold/5">
              <Layers size={14} />
            </div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 group-hover:text-gold transition-colors">
              Welcome Onboarding Customizado
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Criamos berços termomoldados revestidos em EVA de alta densidade sob medida para abrigar múltiplos itens de forma simétrica. A engenharia estrutural garante uma experiência inesquecível de descaixotamento.
            </p>
          </div>

          <div className="space-y-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shadow-sm shadow-gold/5">
              <BookmarkCheck size={14} />
            </div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 group-hover:text-gold transition-colors">
              Atendimento Consultivo Exclusivo
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Não atuamos no varejo. Nossos gerentes de contas VIP fornecem amostras físicas reais e acompanhamento técnico contínuo para garantir conformidade total com as diretrizes do manual de identidade visual corporativa.
            </p>
          </div>
        </div>
      </section>
        </>
      )}

      {/* NEW NAVIGATION TABS SECTIONS */}
      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 max-w-7xl mx-auto"
          >
            <HomePanel
              brandColor={brandColor}
              setBrandColor={setBrandColor}
              brandFont={brandFont}
              setBrandFont={setBrandFont}
              logoText={logoText}
              setLogoText={setLogoText}
              onNavigateToProducts={() => {
                setActiveTab("produtos");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenCuration={() => handleOpenCuration()}
              sampleProducts={PRODUCTS}
            />
          </motion.div>
        )}

        {activeTab === "quemsomos" && (
          <motion.div
            key="quemsomos"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 max-w-7xl mx-auto"
          >
            <AboutUs />
          </motion.div>
        )}

        {activeTab === "servicos" && (
          <motion.div
            key="servicos"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 max-w-7xl mx-auto"
          >
            <ServicesPanel logoText={logoText} brandColor={brandColor} />
          </motion.div>
        )}

        {activeTab === "contato" && (
          <motion.div
            key="contato"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 max-w-7xl mx-auto"
          >
            <ContactConcierge />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. DYNAMIC PDP (MODAL DETAIL) CONTAINER */}
      <AnimatePresence>
        {activeProduct && (
          <ProductPDP
            product={activeProduct}
            brandColor={brandColor}
            brandFont={brandFont}
            logoText={logoText}
            logoType={logoType}
            logoUrl={logoUrl}
            onClose={() => setActiveProduct(null)}
            onOpenCuration={(productId) => {
              setActiveProduct(null);
              handleOpenCuration(productId);
            }}
            onColorChange={(color) => setBrandColor(color)}
            onLogoTextChange={(text) => setLogoText(text)}
          />
        )}
      </AnimatePresence>

      {/* 6. CURATION BRIEF (MODAL PORTAL) CONTAINER */}
      <AnimatePresence>
        {isCurationOpen && (
          <CurationBrief
            onClose={() => setIsCurationOpen(false)}
            selectedProductId={selectedCurationProductId}
            initialBrandColor={brandColor}
            initialLogoText={logoText}
          />
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-black/5 dark:border-white/5 pt-8 px-6 text-center text-neutral-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
          <div>
            © 2026 OPUS PROMOÇÃO E CURADORIA S.A. TODOS OS DIREITOS RESERVADOS.
          </div>
          <div className="flex gap-4">
            <span className="text-neutral-500">CNPJ: 00.000.000/0001-00</span>
            <span>•</span>
            <span className="text-neutral-500">São Paulo, SP - Brasil</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
