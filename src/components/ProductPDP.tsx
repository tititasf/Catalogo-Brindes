import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product, PersonalizationTechnique } from "../types";
import { PERSONALIZATION_OPTIONS } from "../data";
import { ProductVisualizer } from "./ProductVisualizer";
import { X, Ruler, Layers, ShieldCheck, Box, Settings, Sparkles, HelpCircle, Check, Palette, Sliders, Move, RotateCw, Maximize2, Printer, FileText, Calculator, TrendingDown } from "lucide-react";

interface ProductPDPProps {
  product: Product;
  brandColor: string;
  logoText: string;
  logoType: "text" | "upload";
  logoUrl?: string;
  onClose: () => void;
  onOpenCuration: (productId: string) => void;
  onColorChange: (color: string) => void;
  onLogoTextChange: (text: string) => void;
}

export const ProductPDP: React.FC<ProductPDPProps> = ({
  product,
  brandColor,
  logoText,
  logoType,
  logoUrl,
  onClose,
  onOpenCuration,
  onColorChange,
  onLogoTextChange,
}) => {
  const [activeTechnique, setActiveTechnique] = useState<PersonalizationTechnique>(product.techniques[0]);
  const [activePerspective, setActivePerspective] = useState<string>(product.perspectives[0]?.id || "default");
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [showCustomized, setShowCustomized] = useState<boolean>(true);

  // States for real-life photorealistic mockup positioning and customization
  const [viewMode, setViewMode] = useState<"vector" | "photo" | "3d">("photo");
  const [logoSize, setLogoSize] = useState<number>(100); // 40% to 200%
  const [logoRotation, setLogoRotation] = useState<number>(0); // -180deg to 180deg
  const [logoOffsetX, setLogoOffsetX] = useState<number>(0); // -40% to 40%
  const [logoOffsetY, setLogoOffsetY] = useState<number>(0); // -40% to 40%
  const [showTechnicalGrid, setShowTechnicalGrid] = useState<boolean>(false);

  // B2B Quoting & Proposal States
  const [b2bQuantity, setB2bQuantity] = useState<number>(product.minimumQuantity);
  const [b2bColors, setB2bColors] = useState<number>(1);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);

  // Automatically sync minimum quantity when product changes
  useEffect(() => {
    setB2bQuantity(product.minimumQuantity);
  }, [product]);

  // Helper to determine product base price per unit
  const getProductBasePrice = (id: string): number => {
    if (id.includes("kit-welcome")) return 280;
    if (id.includes("kit-churrasco")) return 195;
    if (id.includes("kit-vinho")) return 210;
    if (id.includes("mochila")) return 160;
    if (id.includes("garrafa") || id.includes("squeeze")) return 85;
    if (id.includes("copo-termico")) return 95;
    if (id.includes("powerbank")) return 145;
    if (id.includes("fone-tws")) return 180;
    if (id.includes("caixa-som")) return 165;
    if (id.includes("hub-usbc")) return 120;
    if (id.includes("planner")) return 65;
    if (id.includes("caderno")) return 45;
    if (id.includes("caneta")) return 32;
    if (id.includes("ecobag")) return 24;
    if (id.includes("sacola-juta")) return 38;
    if (id.includes("camiseta-egipcia")) return 55;
    if (id.includes("camisa-polo")) return 75;
    if (id.includes("bone-trucker")) return 45;
    if (id.includes("lanyard")) return 8.5;
    if (id.includes("faixa-cetim")) return 12.5;
    if (id.includes("avental-sarja")) return 68;
    return 75; // default fallback
  };

  const baseUnitPrice = getProductBasePrice(product.id);

  // Volume discount factor based on B2B Quantity
  let volumeDiscountPercentage = 0;
  if (b2bQuantity >= 500) volumeDiscountPercentage = 20;
  else if (b2bQuantity >= 200) volumeDiscountPercentage = 15;
  else if (b2bQuantity >= 100) volumeDiscountPercentage = 10;
  else if (b2bQuantity >= 50) volumeDiscountPercentage = 5;

  const discountedBasePrice = baseUnitPrice * (1 - volumeDiscountPercentage / 100);

  // Calculate customization technique unit cost and setup cliché plate fee
  const getTechniqueCosts = (tech: string, colors: number) => {
    switch (tech) {
      case "laser": return { unitCost: 4.5, setupFee: 80 };
      case "uv": return { unitCost: 7.5, setupFee: 120 };
      case "silk": return { unitCost: 2.5 * colors, setupFee: 60 * colors };
      case "debossing": return { unitCost: 5.5, setupFee: 250 };
      case "hot_stamping": return { unitCost: 7.5, setupFee: 250 };
      case "bordado": return { unitCost: 8.5, setupFee: 90 };
      case "dtg": return { unitCost: 11.0, setupFee: 50 };
      case "tampografia": return { unitCost: 2.0, setupFee: 110 };
      case "resinada": return { unitCost: 6.5, setupFee: 80 };
      case "sublimacao": return { unitCost: 4.0, setupFee: 40 };
      default: return { unitCost: 3.0, setupFee: 50 };
    }
  };

  const { unitCost: techUnitCost, setupFee: techSetupFee } = getTechniqueCosts(activeTechnique, b2bColors);
  
  const finalUnitPrice = discountedBasePrice + techUnitCost;
  const subtotalProducts = finalUnitPrice * b2bQuantity;
  const totalOrderEstimate = subtotalProducts + techSetupFee;

  // Automatically adjust active technique when selecting certain perspectives
  useEffect(() => {
    const selectedPersp = product.perspectives.find((p) => p.id === activePerspective);
    if (selectedPersp) {
      setActiveTechnique(selectedPersp.technique);
    }
  }, [activePerspective, product]);

  const activeTechniqueDetails = PERSONALIZATION_OPTIONS[activeTechnique];

  // Premium Preset Swatches
  const PREMIUM_SWATCHES = [
    { name: "Slate Matte", hex: "#1e293b" },
    { name: "Obsidian", hex: "#0f172a" },
    { name: "Noble Gold", hex: "#d4af37" },
    { name: "Burgundy", hex: "#7c2d12" },
    { name: "Forest", hex: "#064e3b" },
    { name: "Titanium", hex: "#64748b" },
    { name: "Pure White", hex: "#ffffff" },
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4 overflow-y-auto">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative my-8"
      >
        {/* Subtle decorative top lighting bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-65" />

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-black/60 text-neutral-400 hover:text-gold transition-colors z-50 border border-white/10 hover:border-gold/30"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Product Stage Viewer */}
          <div className="lg:col-span-6 bg-black/65 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 min-h-[400px] sm:min-h-[500px]">
            
            {/* Header Brand Badge */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase">
                  Mostruário Atômico B2B
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] font-sans font-medium text-neutral-400 tracking-wider">
                    Estúdio de Visualização Ativo
                  </span>
                </div>
              </div>

              {/* Customized & Technical Grid Toggles */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomized(!showCustomized)}
                  className={`text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                    showCustomized
                      ? "bg-gold text-black border-gold shadow-md shadow-gold/15 font-semibold"
                      : "bg-transparent text-neutral-400 border-white/5 hover:text-white hover:border-white/20"
                  }`}
                  title="Alternar entre visualização com estampa ou produto neutro"
                >
                  {showCustomized ? "Ver Neutro" : "Personalizado"}
                </button>
                <button
                  onClick={() => setShowTechnicalGrid(!showTechnicalGrid)}
                  className={`text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                    showTechnicalGrid
                      ? "bg-teal-500 text-black border-teal-500 shadow-md shadow-teal-500/15 font-semibold"
                      : "bg-transparent text-neutral-400 border-white/5 hover:text-white hover:border-white/20"
                  }`}
                  title="Inspecionar margens de segurança e alinhamento industrial"
                >
                  <Ruler size={10} />
                  Grade Técnica
                </button>
              </div>
            </div>

            {/* Visualizer Frame */}
            <div className="flex-1 flex items-center justify-center py-4 relative">
              <ProductVisualizer
                product={product}
                activeTechnique={activeTechnique}
                brandColor={brandColor}
                logoText={logoText}
                logoType={logoType}
                logoUrl={logoUrl}
                isExploded={isExploded}
                showCustomized={showCustomized}
                perspectiveId={activePerspective}
                viewMode={viewMode}
                logoSizeMultiplier={logoSize / 100}
                logoRotationOffset={logoRotation}
                logoOffsetX={logoOffsetX}
                logoOffsetY={logoOffsetY}
                showTechnicalGrid={showTechnicalGrid}
                onChangeViewMode={setViewMode}
              />

              {/* Subtle background circle alignment matrix */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
                <div className="w-64 h-64 rounded-full border border-dashed border-white" />
                <div className="w-80 h-80 rounded-full border border-dashed border-white absolute" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeDasharray="4,4" className="absolute" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeDasharray="4,4" className="absolute" />
              </div>
            </div>

            {/* Perspectives Selector & Kit Exploded View Toggles */}
            <div className="space-y-4">
              {/* If Kit, Show Exploded Toggle */}
              {product.isKit && (
                <div className="bg-neutral-900/40 p-3 rounded-2xl border border-neutral-900 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                      <Box size={11} className="text-neutral-400" /> Vista Explodida do Kit
                    </span>
                    <p className="text-[9px] text-neutral-500 leading-none">
                      Afaste os componentes internos em perspectiva conceitual.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExploded(!isExploded)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all border ${
                      isExploded
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-transparent text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    {isExploded ? "Agrupar Itens" : "Explodir Kit"}
                  </button>
                </div>
              )}

              {/* Angles / Perspectives Selector */}
              {product.perspectives.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono tracking-wider text-neutral-500">
                    Selecione o Ângulo / Detalhe
                  </label>
                  <div className="flex gap-2">
                    {product.perspectives.map((persp) => (
                      <button
                        key={persp.id}
                        onClick={() => setActivePerspective(persp.id)}
                        className={`text-[9px] font-mono py-2 px-3 rounded-lg border transition-all ${
                          activePerspective === persp.id
                            ? "bg-white/10 text-white border-neutral-600"
                            : "bg-transparent text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-700"
                        }`}
                      >
                        {persp.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Technical Specs & Customizer Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    {/* Spec Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono bg-black text-gold/80 px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider font-semibold">
                  {product.category}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium font-mono">
                  Gramatura / Pureza Superior
                </span>
              </div>
              <h1 className="text-2xl font-sans font-semibold text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-black/45 rounded-2xl border border-white/5 font-mono text-[10px]">
              <div className="space-y-0.5">
                <span className="text-neutral-500 uppercase tracking-wider block">Material Base</span>
                <span className="text-neutral-200 font-sans font-medium text-xs truncate block">{product.material}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-neutral-500 uppercase tracking-wider block">Dimensões Reais</span>
                <span className="text-neutral-200 font-sans font-medium text-xs block">{product.dimensions}</span>
              </div>
              <div className="space-y-0.5 pt-2 border-t border-white/5">
                <span className="text-neutral-500 uppercase tracking-wider block">Lote Mínimo B2B</span>
                <span className="text-neutral-200 font-sans font-semibold text-xs block">
                  {product.minimumQuantity} unidades
                </span>
              </div>
              <div className="space-y-0.5 pt-2 border-t border-white/5">
                <span className="text-neutral-500 uppercase tracking-wider block">Técnicas Permitidas</span>
                <span className="text-neutral-200 font-sans font-medium text-xs block truncate">
                  {product.techniques.map((t) => PERSONALIZATION_OPTIONS[t]?.name.split(" ")[1] || t).join(" • ")}
                </span>
              </div>
            </div>

            {/* Visual Configurator Interactive Panel */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold border-b border-white/5 pb-2 flex items-center gap-1">
                <Settings size={12} /> Ajustes Estéticos de Simulação
              </h3>

              {/* 1. Enter Logo Text */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex justify-between">
                  <span>Inscrição Logomarca (Visualização)</span>
                  <span className="text-[9px] text-neutral-400">Atualiza no mockup</span>
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={logoText}
                  onChange={(e) => onLogoTextChange(e.target.value)}
                  placeholder="EX: GOOGLE CO"
                  className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-gold focus:ring-1 focus:ring-gold/35 focus:outline-none rounded-xl p-3 text-xs text-white transition-all uppercase font-mono tracking-wider"
                />
              </div>

              {/* Sliders for Interactive Position, Rotation, Size on Mockup */}
              {showCustomized && (
                <div className="p-3 bg-neutral-900/45 border border-white/5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gold uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1"><Sliders size={11} /> Ajustes Finos da Estampa</span>
                    <button 
                      onClick={() => {
                        setLogoSize(100);
                        setLogoRotation(0);
                        setLogoOffsetX(0);
                        setLogoOffsetY(0);
                      }}
                      className="text-neutral-500 hover:text-white transition-colors text-[9px]"
                      title="Resetar posição para o centro padrão"
                    >
                      Resetar
                    </button>
                  </div>

                  {/* Preset Placements Buttons */}
                  <div className="space-y-1.5 pt-1 pb-1 border-b border-white/5">
                    <span className="text-[8px] uppercase font-mono tracking-wider text-neutral-500 block">
                      Alinhamento Padrão Industrial
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: "Centralizado", size: 100, rot: 0, x: 0, y: 0 },
                        { label: "Peito Esq.", size: 80, rot: 0, x: -16, y: -10 },
                        { label: "Manga Lateral", size: 75, rot: 0, x: -24, y: 5 },
                        { label: "Bolso / Aba", size: 90, rot: 0, x: 0, y: 14 },
                        { label: "Assinatura Mini", size: 55, rot: 0, x: 18, y: -16 }
                      ].map((preset) => {
                        const isCurrent = logoSize === preset.size && logoRotation === preset.rot && logoOffsetX === preset.x && logoOffsetY === preset.y;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setLogoSize(preset.size);
                              setLogoRotation(preset.rot);
                              setLogoOffsetX(preset.x);
                              setLogoOffsetY(preset.y);
                            }}
                            className={`text-[8.5px] font-mono px-2 py-1 rounded transition-all border ${
                              isCurrent
                                ? "bg-gold text-black border-gold font-bold shadow-sm"
                                : "bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-800"
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Slider: Size */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1"><Maximize2 size={10} /> Escala (Tamanho)</span>
                      <span>{logoSize}%</span>
                    </div>
                    <input 
                      type="range"
                      min="40"
                      max="180"
                      value={logoSize}
                      onChange={(e) => setLogoSize(Number(e.target.value))}
                      className="w-full accent-gold bg-neutral-950 h-1 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Slider: Rotation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1"><RotateCw size={10} /> Ângulo (Rotação)</span>
                      <span>{logoRotation}°</span>
                    </div>
                    <input 
                      type="range"
                      min="-180"
                      max="180"
                      value={logoRotation}
                      onChange={(e) => setLogoRotation(Number(e.target.value))}
                      className="w-full accent-gold bg-neutral-950 h-1 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset X & Y Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1"><Move size={10} /> Deslocar X</span>
                        <span>{logoOffsetX > 0 ? `+${logoOffsetX}` : logoOffsetX}%</span>
                      </div>
                      <input 
                        type="range"
                        min="-40"
                        max="40"
                        value={logoOffsetX}
                        onChange={(e) => setLogoOffsetX(Number(e.target.value))}
                        className="w-full accent-gold bg-neutral-950 h-1 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1"><Move size={10} /> Deslocar Y</span>
                        <span>{logoOffsetY > 0 ? `+${logoOffsetY}` : logoOffsetY}%</span>
                      </div>
                      <input 
                        type="range"
                        min="-40"
                        max="40"
                        value={logoOffsetY}
                        onChange={(e) => setLogoOffsetY(Number(e.target.value))}
                        className="w-full accent-gold bg-neutral-950 h-1 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Swatches of Corporate Colors */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-wider text-gold flex items-center gap-1.5 font-semibold">
                  <Palette size={10} /> Paleta Identidade Visual (Tonalidades)
                </label>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {PREMIUM_SWATCHES.map((sw) => (
                    <button
                       key={sw.hex}
                       onClick={() => onColorChange(sw.hex)}
                       title={sw.name}
                       className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                         brandColor.toLowerCase() === sw.hex.toLowerCase()
                           ? "border-gold scale-110 shadow-lg shadow-gold/20"
                           : "border-neutral-800 hover:border-neutral-600 hover:scale-105"
                       }`}
                       style={{ backgroundColor: sw.hex }}
                    >
                      {brandColor.toLowerCase() === sw.hex.toLowerCase() && (
                        <Check size={10} className={sw.hex === "#ffffff" ? "text-black" : "text-white"} />
                      )}
                    </button>
                  ))}
                  {/* Custom Hex Color field */}
                  <div className="flex items-center bg-black border border-white/5 rounded-lg px-2 py-1 max-w-[100px] focus-within:border-gold transition-colors">
                    <span className="text-neutral-500 text-[10px] font-mono mr-1">#</span>
                    <input
                      type="text"
                      maxLength={6}
                      value={brandColor.replace("#", "")}
                      onChange={(e) => onColorChange(`#${e.target.value}`)}
                      className="bg-transparent text-white font-mono text-[10px] focus:outline-none w-full uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Technique Swatches Selector */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                  Técnica de Marcação Industrial
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.techniques.map((techKey) => {
                    const tech = PERSONALIZATION_OPTIONS[techKey];
                    if (!tech) return null;
                    const isSelected = activeTechnique === techKey;
                    return (
                      <button
                        key={techKey}
                        onClick={() => setActiveTechnique(techKey)}
                        className={`text-[10px] text-left p-2 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-gold text-black border-gold font-semibold shadow-md shadow-gold/10"
                            : "bg-transparent text-neutral-400 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="font-semibold">{tech.name}</div>
                        <div className={`text-[8px] truncate leading-none mt-0.5 ${isSelected ? "text-neutral-800" : "text-neutral-500"}`}>
                          {tech.materialApplied.split(",")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informative description box for selected technique */}
              {activeTechniqueDetails && (
                <motion.div
                  key={activeTechnique}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1"
                >
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold flex items-center gap-1">
                    <HelpCircle size={10} /> Como funciona: {activeTechniqueDetails.name}
                  </span>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    {activeTechniqueDetails.description}
                  </p>
                  <div className="flex gap-2 text-[8.5px] font-mono pt-1 text-neutral-500">
                    <span>Aplica-se em: <strong className="text-neutral-400">{activeTechniqueDetails.materialApplied}</strong></span>
                    <span>•</span>
                    <span>Resultado: <strong className="text-neutral-400">{activeTechniqueDetails.visualEffect}</strong></span>
                  </div>
                </motion.div>
              )}

              {/* B2B Volume Pricing Calculator Card */}
              <div className="p-4 bg-neutral-900/60 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1.5 font-bold">
                    <Calculator size={11} /> Calculadora de Lote B2B
                  </span>
                  {volumeDiscountPercentage > 0 && (
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <TrendingDown size={9} /> -{volumeDiscountPercentage}% Vol.
                    </span>
                  )}
                </div>

                {/* Slider: Quantity Selection */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">Quantidade Desejada</span>
                    <span className="text-white font-bold">{b2bQuantity} unidades</span>
                  </div>
                  <input
                    type="range"
                    min={product.minimumQuantity}
                    max={1000}
                    step={10}
                    value={b2bQuantity}
                    onChange={(e) => setB2bQuantity(Number(e.target.value))}
                    className="w-full accent-gold bg-neutral-950 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                    <span>Mín: {product.minimumQuantity} un</span>
                    <span>1.000 un</span>
                  </div>
                </div>

                {/* Option for silk/colors if silk is selected */}
                {activeTechnique === "silk" && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400">Cores da Estampa (Silk Screen)</span>
                      <span className="text-white font-bold">{b2bColors} {b2bColors === 1 ? "cor" : "cores"}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setB2bColors(num)}
                          className={`text-[10px] font-mono py-1 rounded-md border transition-all ${
                            b2bColors === num
                              ? "bg-gold text-black border-gold font-bold"
                              : "bg-transparent text-neutral-400 border-white/5 hover:border-white/10"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimate Breakdown List */}
                <div className="pt-2 border-t border-white/5 space-y-1.5 text-[10px] font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Preço Unitário Base:</span>
                    <span>R$ {baseUnitPrice.toFixed(2)}</span>
                  </div>
                  {volumeDiscountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Desconto de Volume ({volumeDiscountPercentage}%):</span>
                      <span>- R$ {(baseUnitPrice - discountedBasePrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-400">
                    <span>Personalização ({activeTechniqueDetails?.name}):</span>
                    <span>+ R$ {techUnitCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Custo de Clichê/Matriz (Setup único):</span>
                    <span>R$ {techSetupFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold pt-1 border-t border-white/5 text-xs">
                    <span>Unitário Final Estimado:</span>
                    <span className="text-gold">R$ {finalUnitPrice.toFixed(2)} / un</span>
                  </div>
                </div>

                {/* Total order summary value display */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-mono text-neutral-500 uppercase block tracking-wider">Investimento B2B Estimado</span>
                    <span className="text-sm font-sans font-bold text-white">R$ {totalOrderEstimate.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full block font-bold">
                      Faturamento Faturado
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom B2B Consultative CTA */}
            <div className="pt-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setIsProposalModalOpen(true)}
                  className="bg-neutral-900 text-gold hover:bg-neutral-800 border border-gold/20 hover:border-gold/50 py-3.5 px-4 rounded-xl font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-98"
                >
                  <FileText size={13} /> Gerar PDF Proposta
                </button>
                <button
                  onClick={() => onOpenCuration(product.id)}
                  className="bg-gold text-black hover:bg-gold-hover py-3.5 px-4 rounded-xl font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-gold/15 active:scale-98"
                >
                  Solicitar Curadoria
                </button>
              </div>

              <div className="text-center">
                <span className="text-[9px] text-neutral-500 font-mono tracking-wider block">
                  ATENDIMENTO CORPORATIVO EXCLUSIVO B2B
                </span>
                <p className="text-[9px] text-neutral-500 leading-relaxed mt-0.5">
                  Lote mínimo especial de {product.minimumQuantity} unidades para este modelo. Estudo conceitual e prova digital inclusos sem custo.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Elegant Technical Curation Dossier Modal (Printable/Save-to-PDF) */}
      <AnimatePresence>
        {isProposalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-start p-4 md:p-8 overflow-y-auto no-print"
          >
            {/* Top glassmorphic actions bar */}
            <div className="w-full max-w-4xl bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-xl no-print">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold block font-semibold">
                  OPUS • Curadoria Corporativa B2B
                </span>
                <h2 className="text-sm font-sans font-medium text-white">
                  Dossiê Conceitual e Proposta de Lote Técnico
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-gold hover:bg-gold-hover text-black font-sans font-semibold text-xs px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-lg shadow-gold/15"
                >
                  <Printer size={13} /> Imprimir / Salvar PDF
                </button>
                <button
                  onClick={() => setIsProposalModalOpen(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-sans font-medium text-xs px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 border border-white/5"
                >
                  Fechar Dossiê
                </button>
              </div>
            </div>

            {/* Print style inject overlay */}
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                body {
                  background: white !important;
                  color: black !important;
                }
                .no-print {
                  display: none !important;
                }
                #printable-proposal-card {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  height: auto !important;
                  padding: 1.5cm !important;
                  box-shadow: none !important;
                  border: none !important;
                  background: white !important;
                  color: black !important;
                }
                /* Ensure vector/photo images are visible and print high-quality */
                img, svg {
                  max-width: 100% !important;
                  page-break-inside: avoid;
                }
              }
            `}} />

            {/* Document sheet centered on desktop */}
            <div
              id="printable-proposal-card"
              className="w-full max-w-4xl bg-white text-black p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden font-sans border border-neutral-200"
            >
              {/* Premium Top Letterhead Header */}
              <div className="flex justify-between items-start border-b-2 border-gold/40 pb-6">
                <div>
                  <span className="font-serif italic text-2xl tracking-wide text-neutral-900 block">
                    OPUS
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mt-1">
                    Ateliê de Brindes Finos & Curation Corp
                  </span>
                </div>
                <div className="text-right text-[10px] font-mono text-neutral-500 leading-normal">
                  <div>CÓDIGO #EP-{product.id.slice(0, 4).toUpperCase()}-{Math.floor(Math.random() * 9000 + 1000)}</div>
                  <div>DATA DE SIMULAÇÃO: {new Date().toLocaleDateString("pt-BR")}</div>
                  <div>STATUS: PROPOSTA DE CURADORIA PRIVADA</div>
                </div>
              </div>

              {/* Grid 1: Mockup visualization + description specs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-center justify-center relative shadow-sm h-72">
                  <ProductVisualizer
                    product={product}
                    activeTechnique={activeTechnique}
                    brandColor={brandColor}
                    logoText={logoText}
                    logoType={logoType}
                    logoUrl={logoUrl}
                    isExploded={isExploded}
                    showCustomized={showCustomized}
                    perspectiveId={activePerspective}
                    viewMode={viewMode}
                    logoSizeMultiplier={logoSize / 100}
                    logoRotationOffset={logoRotation}
                    logoOffsetX={logoOffsetX}
                    logoOffsetY={logoOffsetY}
                  />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold bg-black text-white px-2 py-0.5 rounded-full inline-block font-semibold">
                    Especificações do Projeto
                  </span>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-neutral-900 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                      {product.longDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px]">Material Base:</span>
                      <strong className="text-neutral-800">{product.material}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px]">Dimensões do Produto:</span>
                      <strong className="text-neutral-800">{product.dimensions}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px]">Técnica de Gravação:</span>
                      <strong className="text-neutral-800">{activeTechniqueDetails?.name}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px]">Identidade Visual (Hex):</span>
                      <strong className="text-neutral-800">{brandColor}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 2: Cost Breakdown Table */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block font-bold border-b border-neutral-200 pb-1">
                  Estudo de Faturamento e Lote Estimado
                </span>
                <table className="w-full text-left text-xs text-neutral-700 font-sans">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 text-[9px] uppercase tracking-wider">
                      <th className="py-2">Item / Descrição do Lote</th>
                      <th className="py-2 text-center">Quantidade</th>
                      <th className="py-2 text-right">Custo Unitário</th>
                      <th className="py-2 text-right">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-100">
                      <td className="py-2.5 font-medium text-neutral-900">
                        {product.name} <span className="text-[10px] text-neutral-400 block font-normal font-mono">Simulado com estampa personalizada</span>
                      </td>
                      <td className="py-2.5 text-center font-mono">{b2bQuantity} unidades</td>
                      <td className="py-2.5 text-right font-mono">R$ {finalUnitPrice.toFixed(2)}</td>
                      <td className="py-2.5 text-right font-mono">R$ {subtotalProducts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-2.5 text-neutral-600">
                        Taxa de Matriz Técnica e Clichê de Gravação <span className="text-[10px] text-neutral-400 block">Custo fixo de setup industrial</span>
                      </td>
                      <td className="py-2.5 text-center font-mono">1 setup</td>
                      <td className="py-2.5 text-right font-mono">R$ {techSetupFee.toFixed(2)}</td>
                      <td className="py-2.5 text-right font-mono">R$ {techSetupFee.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-neutral-50 font-semibold text-neutral-900">
                      <td className="py-3 px-2 rounded-l-xl text-neutral-900 font-bold" colSpan={2}>
                        TOTAL GERAL DO PROJETO CORPORATIVO:
                      </td>
                      <td className="py-3 text-right font-mono font-bold" colSpan={2}>
                        <span className="text-gold border-b-2 border-gold pb-0.5 text-sm">
                          R$ {totalOrderEstimate.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-[9px] text-neutral-400 leading-relaxed pt-1 flex items-start gap-1">
                  <span className="text-gold">•</span>
                  <span>Este estudo de faturamento é preliminar e não constitui obrigação legal de contratação. Valores válidos por 10 dias úteis e faturamento corporativo sujeito à aprovação de crédito corporativo.</span>
                </div>
              </div>

              {/* Grid 3: Curatorial Letter / Certification signatures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                <div className="space-y-2 text-xs leading-relaxed text-neutral-600">
                  <h4 className="font-bold text-neutral-900 uppercase text-[9px] tracking-wider">
                    Certificado de Excelência OPUS
                  </h4>
                  <p>
                    Garantimos rigidez estética impecável de alta joalheria corporativa. Cada item sob a chancela OPUS passa por verificação de tonalidade cromática digital, precisão milimétrica de laser ou debossing, e acabamento em fibra nobre. Prova física inicial disponível após assinatura de intenção de compra.
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-4 text-center text-[10px] font-mono text-neutral-500 pt-8">
                    <div>
                      <div className="border-b border-neutral-400 pb-2 mb-1 h-8 flex items-end justify-center">
                        <span className="font-serif italic text-xs text-neutral-700">OPUS Curation Team</span>
                      </div>
                      <div>Curador Especialista</div>
                    </div>
                    <div>
                      <div className="border-b border-neutral-400 pb-2 mb-1 h-8 flex items-end justify-center">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">{logoText || "DIRETOR CORPORATIVO"}</span>
                      </div>
                      <div>Aprovação do Cliente</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side accent lines for printed document structure */}
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-gold via-black to-gold" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
