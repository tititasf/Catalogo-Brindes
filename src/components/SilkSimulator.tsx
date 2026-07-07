import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Layers, Droplet, CheckCircle } from "lucide-react";

interface SilkSimulatorProps {
  logoText: string;
  brandColor: string;
  brandFont?: string;
}

export const SilkSimulator: React.FC<SilkSimulatorProps> = ({ logoText, brandColor, brandFont = "font-sans" }) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printProgress, setPrintProgress] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const displayLogoText = logoText || "OPUS ECO";

  useEffect(() => {
    setIsPrinting(false);
    setPrintProgress(0);
    setHasFinished(false);
  }, [logoText, brandColor, brandFont]);

  const handleStartPrinting = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setHasFinished(false);
    setPrintProgress(0);

    const duration = 2000;
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setPrintProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsPrinting(false);
        setHasFinished(true);
      }
    }, intervalTime);
  };

  return (
    <div className="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/5 hover:border-gold/25 transition-colors overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 rounded-xl border border-black/5 dark:border-white/5 p-6 min-h-[340px] relative overflow-hidden">
          
          {isPrinting && (
            <div className="absolute inset-0 pointer-events-none z-20 flex justify-center">
              <motion.div
                className="absolute w-40 h-6 flex flex-col items-center z-30"
                style={{ top: `${15 + (printProgress / 100) * 55}%` }}
              >
                <div className="w-24 h-3 bg-white dark:bg-[#8b5a2b] rounded-t-sm shadow-md" />
                <div className="w-40 h-3 bg-white dark:bg-[#d2b48c] border-b-2 border-amber-900/50 shadow-lg flex justify-center relative">
                   <div className="absolute bottom-0 w-32 h-1 blur-[1px]" style={{ backgroundColor: brandColor }} />
                </div>
              </motion.div>
            </div>
          )}

          <div className="relative w-72 h-72 flex items-center justify-center transition-all duration-500">
            <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-2xl">
              <defs>
                <clipPath id="silk-clip">
                  <rect x="0" y="0" width="300" height={isPrinting ? 55 + (printProgress / 100) * 165 : hasFinished ? 300 : 0} />
                </clipPath>
                <pattern id="canvas-texture" patternUnits="userSpaceOnUse" width="4" height="4">
                  <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                  <path d="M1,-1 l-2,2 M4,0 l-4,4 M5,3 l-2,2" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>

              <g>
                <path d="M 110,90 C 110,20 190,20 190,90" fill="none" stroke="#d6c8b3" strokeWidth="8" strokeLinecap="round" className="drop-shadow-md" />
                <path d="M 118,90 C 118,30 182,30 182,90" fill="none" stroke="#c0b29d" strokeWidth="2" strokeLinecap="round" />

                <rect x="70" y="80" width="160" height="180" rx="8" fill="#e5d9c5" className="drop-shadow-xl" />
                <rect x="70" y="80" width="160" height="180" rx="8" fill="url(#canvas-texture)" />
                <rect x="75" y="85" width="150" height="170" rx="6" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" />

                <g clipPath="url(#silk-clip)">
                  <text 
                    x="150" y="170" 
                    textAnchor="middle" 
                    fill={brandColor} 
                    style={{ fontFamily: brandFont === 'font-sans' ? 'Inter, sans-serif' : brandFont === 'font-serif' ? 'serif' : 'JetBrains Mono, monospace', fontSize: "16px", fontWeight: "bold", letterSpacing: "0.15em", mixBlendMode: "multiply" }}
                  >
                    {displayLogoText}
                  </text>
                  
                  <text 
                    x="150" y="170" 
                    textAnchor="middle" 
                    fill="url(#canvas-texture)" 
                    opacity="0.5"
                    style={{ fontFamily: brandFont === 'font-sans' ? 'Inter, sans-serif' : brandFont === 'font-serif' ? 'serif' : 'JetBrains Mono, monospace', fontSize: "16px", fontWeight: "bold", letterSpacing: "0.15em", mixBlendMode: "overlay" }}
                  >
                    {displayLogoText}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-neutral-700 dark:text-neutral-300 bg-white/85 dark:bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
            <span className="flex items-center gap-1.5 font-mono uppercase">
              <Droplet size={12} className={isPrinting ? "text-gold animate-bounce" : "text-neutral-500"} />
              {isPrinting ? "APLICANDO TINTA..." : hasFinished ? "SECAGEM CONCLUÍDA" : "AGUARDANDO RODO"}
            </span>
            <span className="font-mono text-neutral-600 dark:text-neutral-400">
              {isPrinting ? `${Math.round(printProgress)}%` : hasFinished ? "100%" : "0%"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-gold/10 text-gold border border-gold/25 uppercase font-semibold">
              Tecnologia B2B
            </div>
            <h3 className="text-xl font-sans font-semibold tracking-tight text-black dark:text-white">
              Simulador Silk Screen
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Experimente o processo da serigrafia adaptado para brindes ecológicos de alto volume. Digite o logotipo e dispare o rodo para transferir a tinta pelo tecido de canvas.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
              Substrato Selecionado
            </label>
            <div className="bg-gold/10 border border-gold/30 rounded-lg py-2.5 px-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-gold tracking-wide">Ecobag de Algodão (Canvas)</span>
              <Layers size={14} className="text-gold/70" />
            </div>
          </div>

          <button
            onClick={handleStartPrinting}
            disabled={isPrinting}
            className={`w-full mt-4 py-3.5 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              isPrinting
                ? "bg-gold/10 text-gold/50 border border-gold/25 cursor-not-allowed"
                : "bg-gold hover:bg-gold-hover text-black active:scale-98 shadow-lg shadow-gold/15"
            }`}
          >
            {isPrinting ? (
              <>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Droplet size={14} className="text-gold/50" />
                </motion.div>
                Aplicando Tinta...
              </>
            ) : hasFinished ? (
              <>
                <CheckCircle size={14} className="text-green-500" />
                Refazer Silk Screen
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                Puxar Rodo de Tinta
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
