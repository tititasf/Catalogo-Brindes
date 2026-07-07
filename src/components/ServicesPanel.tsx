import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Star, Layers, Activity, Sliders, CheckCircle, Info } from "lucide-react";

interface ServicesPanelProps {
  logoText: string;
  brandColor: string;
}

interface PersonalizationType {
  id: string;
  name: string;
  tagline: string;
  description: string;
  recommendedMaterial: string;
  visualEffect: string;
  setupTime: string;
  sampleMaterial: "wood" | "leather" | "metal" | "glass" | "fabric";
  sampleBg: string;
  images?: string[];
}

export function ServicesPanel({ logoText, brandColor }: ServicesPanelProps) {
  const techniques: PersonalizationType[] = [
    {
      id: "laser",
      name: "Gravação Laser Fibra",
      tagline: "Alteração molecular de precisão micrométrica",
      description: "O feixe infravermelho altera a pigmentação original das camadas superficiais do material por meio de abrasão térmica de alta velocidade. Não descasca nem desbota com o tempo, garantindo marcas eternas.",
      recommendedMaterial: "Metais anodizados, Madeiras nobres e Aço inoxidável",
      visualEffect: "Acabamento fosco texturizado de altíssimo contraste",
      setupTime: "48 horas úteis para calibração de arquivo técnico",
      sampleMaterial: "metal",
      sampleBg: "bg-neutral-800",
      images: ["/assets/images/laser_steel.jpg", "/assets/images/laser_wood.jpg"]
    },
    {
      id: "debossing",
      name: "Debossing / Baixo Relevo Cego",
      tagline: "Vinco mecânico sob matriz térmica a vácuo",
      description: "Um clichê metálico de latão esculpido em CNC é aquecido a 140°C e prensado sob pressão hidráulica de 2 toneladas diretamente sobre as fibras do couro de curtimento vegetal, criando uma textura rebaixada tátil maravilhosa.",
      recommendedMaterial: "Couro legítimo, Sintéticos Premium e Papéis de alta gramatura",
      visualEffect: "Efeito tridimensional tátil, sutil e profundamente luxuoso",
      setupTime: "3 dias úteis para fundição do clichê de latão",
      sampleMaterial: "leather",
      sampleBg: "bg-amber-950",
      images: ["/assets/images/debossing_leather.jpg"]
    },
    {
      id: "hotstamping",
      name: "Hot Stamping Foil Ouro / Prata",
      tagline: "Fusão térmica de películas reflexivas de alta liga",
      description: "Utiliza a mesma matriz de debossing térmico, mas intercalando um filme de foil metálico de alta micronagem. O calor transfere as moléculas reflexivas do foil diretamente para os poros do material.",
      recommendedMaterial: "Estojos de papel rígido, Agendas executivas e Cadernos moles",
      visualEffect: "Reflexos espelhados de alto brilho com contornos nítidos",
      setupTime: "3 dias úteis para calibração de matriz e matrizes de teste",
      sampleMaterial: "glass", // simulated dark carbon fiber card
      sampleBg: "bg-neutral-900",
      images: ["/assets/images/hot_stamping_macro.jpg"]
    },
    {
      id: "uv",
      name: "Impressão UV Multi-camada",
      tagline: "Deposição em relevo curada instantaneamente por luz UV",
      description: "Nossa tecnologia de impressão industrial com tinta de cura ultravioleta deposita sucessivas microcamadas de polímeros que endurecem instantaneamente, permitindo relevo texturizado colorido de alta durabilidade mecânica.",
      visualEffect: "Cores vivas e brilhantes, relevo tátil colorido sob medida",
      recommendedMaterial: "Polímeros, Placas de Vidro, Dispositivos Tecnológicos e Garrafas Térmicas",
      setupTime: "24 horas para perfil de cor digital e prova de impressão",
      sampleMaterial: "wood",
      sampleBg: "bg-amber-900",
      images: ["/assets/images/uv_tatil.jpg"]
    },
    {
      id: "silk",
      name: "Silk Screen Premium",
      tagline: "Serigrafia industrial de alta precisão e cobertura",
      description: "Aplicação de tintas ricas e densas através de telas microperfuradas. Ideal para grandes áreas, oferecendo excelente opacidade e cor vibrante sobre substratos variados, com acabamento liso e eterno.",
      visualEffect: "Cobertura de tinta sólida perfeita com cantos nítidos",
      recommendedMaterial: "Ecobags, Canvas, Caixas Kraft e Embalagens",
      setupTime: "48 horas para gravação dos quadros serigráficos",
      sampleMaterial: "fabric",
      sampleBg: "bg-neutral-800",
      images: ["/assets/images/silk_macro.jpg"]
    }
  ];

  const [activeTechId, setActiveTechId] = useState<string>("laser");
  const selectedTech = techniques.find((t) => t.id === activeTechId) || techniques[0];

  // Helper function to render simulated texture markup dynamically based on technique and parameters
  const renderInteractiveChip = () => {
    const safeText = logoText || "OPUS CO.";
    
    switch (selectedTech.id) {
      case "laser":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center overflow-hidden">
            {/* Metal brushed hairline background */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
            <div className="absolute top-2 left-2 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              Amostra: Alumínio Anodizado Anodized-6061
            </div>
            
            {/* The laser mark with engraved styling (brushed look inside, high-precision contrast) */}
            <div className="text-center space-y-1.5 z-10">
              <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 block uppercase">
                OPUS LABORATORY
              </span>
              <h5 
                className="text-xl font-bold tracking-widest font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 drop-shadow-md"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
              >
                {safeText}
              </h5>
              <div className="w-12 h-0.5 bg-neutral-400 mx-auto opacity-40" />
              <span className="text-[7.5px] font-mono text-neutral-500 block uppercase tracking-wider">
                Gravação por Calor Infravermelho
              </span>
            </div>

            {/* Simulated laser path guide overlay lines */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[1px] bg-teal-500/10 pointer-events-none border-dashed" />
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
              <span>FEIXE PRONTO</span>
            </div>
          </div>
        );

      case "debossing":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#2e1d11] border border-[#1f130a] flex flex-col items-center justify-center overflow-hidden">
            {/* Leather fine grain texture background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_2px,transparent_2px)] bg-[size:8px_8px] pointer-events-none" />
            <div className="absolute top-2 left-2 text-[8px] font-mono text-stone-500 uppercase tracking-widest">
              Amostra: Couro Atanado Bovino Legitimo (Ateliê)
            </div>

            {/* Inside leather embossing, text looks pressed down (darker color, drop shadow top-inner, beveled edge look) */}
            <div className="text-center space-y-1 z-10 scale-105">
              <h5 
                className="text-xl font-serif italic font-bold tracking-wide uppercase text-[#140b05] drop-shadow-[0_1.5px_0.5px_rgba(255,255,255,0.06)]"
                style={{ textShadow: "0px -1px 0px rgba(0,0,0,0.6)" }}
              >
                {safeText}
              </h5>
              <div className="w-14 h-[1.5px] bg-[#140b05] mx-auto opacity-30 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
              <span className="text-[7.5px] font-mono text-stone-500 block uppercase tracking-wider">
                Pressed Depth: 1.25mm
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-mono text-amber-500/80">
              <span>MATRIZ 140°C</span>
            </div>
          </div>
        );

      case "hotstamping":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-center overflow-hidden">
            {/* Fine linen background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
            <div className="absolute top-2 left-2 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              Amostra: Papel Rígido Escovado Carbon Black
            </div>

            {/* Luxurious shiny gold reflect text */}
            <div className="text-center space-y-2 z-10">
              <div className="text-[8px] tracking-[0.25em] font-sans text-amber-400/80 font-bold uppercase">
                OPUS EXCLUSIF
              </div>
              <h5 
                className="text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] font-bold uppercase filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                style={{ textShadow: "0 0 2px rgba(252,246,186,0.15)" }}
              >
                {safeText}
              </h5>
              <span className="text-[7.5px] font-mono text-neutral-500 block uppercase tracking-wider">
                Foil Ouro Champagne 24K
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-mono text-gold">
              <span>REFLEXO ESPELHADO</span>
            </div>
          </div>
        );

      case "uv":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#0d0d0d] border border-neutral-900 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-2 left-2 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              Amostra: Polímero Fosco Antiderrapante Matte
            </div>

            {/* Vibrant colorful high precision printed polymer */}
            <div className="text-center space-y-2 z-10">
              <h5 
                className="text-2xl font-sans font-black tracking-tighter uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ color: brandColor }}
              >
                {safeText}
              </h5>
              <div className="flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: brandColor }} />
                <span className="text-[8px] font-mono text-neutral-300 uppercase tracking-widest">
                  PANTONE SIMULATED
                </span>
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: brandColor }} />
              </div>
              <span className="text-[7.5px] font-mono text-neutral-500 block uppercase tracking-wider">
                Verniz Acetinado Curado UV
              </span>
            </div>

            {/* Printing sweep line effect */}
            <motion.div 
              animate={{ left: ["-10%", "110%"] }} 
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-8 bg-teal-500/5 blur-md pointer-events-none rotate-12"
            />
          </div>
        );

      case "silk":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center overflow-hidden">
            {/* Fabric texture background */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNMCAwbDRsNCIgc3Ryb2tlPSIjMjIyIi8+PC9zdmc+')] pointer-events-none" />
            
            <div className="text-center space-y-1.5 z-10 p-4">
              <h5 
                className="text-3xl font-sans font-black tracking-tight uppercase"
                style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
              >
                {safeText}
              </h5>
              <span className="text-[7.5px] font-mono text-neutral-400 block uppercase tracking-wider bg-black/50 px-2 py-1 rounded">
                Serigrafia de Alta Densidade
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Navigation through Personalization techniques */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase block">
              ESTILOS E TECNOLOGIA
            </span>
            <h3 className="text-2xl font-sans font-semibold text-white tracking-tight">
              A Gravação Perfeita
            </h3>
            <p className="text-xs text-neutral-400">
              Nossa fábrica está equipada com maquinário europeu calibrado individualmente por especialistas em materiais finos. Escolha um método abaixo para visualizar a dinâmica:
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {techniques.map((t) => {
              const isActive = t.id === activeTechId;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTechId(t.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-neutral-900 border-gold/45 text-white shadow-lg shadow-gold/5"
                      : "bg-black/30 border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className={`text-xs font-sans font-semibold ${isActive ? "text-gold" : "text-neutral-300"}`}>
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-tight">
                      {t.tagline}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[8px] font-mono bg-neutral-950 text-neutral-500 px-2 py-0.5 rounded border border-neutral-900 group-hover:border-neutral-800 transition-all">
                      SETUP: {t.id === "laser" ? "48H" : "72H"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Simulation Sandbox */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-neutral-950 border border-white/5 p-6 rounded-3xl space-y-6 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Simulador de Amostra Técnica
                </span>
              </div>
              <span className="text-[9px] font-mono text-neutral-600">
                PRODUÇÃO INDUSTRIAL
              </span>
            </div>

            {/* Dynamic Rendering Canvas */}
            {renderInteractiveChip()}

            {/* Specifications Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans pt-2">
              <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-xl space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                  Materiais Recomendados:
                </span>
                <p className="text-neutral-200 font-medium text-[11px]">
                  {selectedTech.recommendedMaterial}
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-xl space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                  Efeito Estético Estimado:
                </span>
                <p className="text-neutral-200 font-medium text-[11px]">
                  {selectedTech.visualEffect}
                </p>
              </div>
            </div>

            {/* Advisory Notice */}
            <div className="flex gap-2.5 bg-gold/5 border border-gold/15 rounded-xl p-3.5 text-[10px] text-neutral-400 leading-normal">
              <Info className="text-gold shrink-0 mt-0.5" size={13} />
              <p>
                <strong>Observação de Tolerância:</strong> Por se tratar de processos termo-químicos em superfícies orgânicas naturais (como couro e madeira), podem ocorrer ligeiras variações de tonalidade e profundidade de gravação entre diferentes unidades. Isso ratifica a exclusividade e natureza rústico-nobre do produto.
              </p>
            </div>

            {/* High Definition Real World Macros */}
            {selectedTech.images && selectedTech.images.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                  <Star size={10} className="text-gold" /> Casos Reais & Acervo (Macros 8K)
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {selectedTech.images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-video relative group bg-black">
                      <img src={img} alt={`${selectedTech.name} amostra ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
