import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { Play, Sparkles, Cpu, Hammer, CheckCircle } from "lucide-react";

interface LaserSimulatorProps {
  logoText: string;
  brandColor: string;
}

export const LaserSimulator: React.FC<LaserSimulatorProps> = ({ logoText, brandColor }) => {
  const laserProducts = PRODUCTS.filter(p => p.techniques.includes("laser"));
  const [selectedProductId, setSelectedProductId] = useState<string>(laserProducts[0].id);
  const [isEngraving, setIsEngraving] = useState<boolean>(false);
  const [engravedProgress, setEngravedProgress] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const activeProduct = PRODUCTS.find(p => p.id === selectedProductId) || laserProducts[0];
  const displayLogoText = logoText || "EXCLUSIVO";

  useEffect(() => {
    // Reset state when product changes
    setIsEngraving(false);
    setEngravedProgress(0);
    setHasFinished(false);
  }, [selectedProductId]);

  const handleStartEngraving = () => {
    if (isEngraving) return;
    setIsEngraving(true);
    setHasFinished(false);
    setEngravedProgress(0);

    const duration = 3000; // 3 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setEngravedProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsEngraving(false);
        setHasFinished(true);
      }
    }, intervalTime);
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-gold/25 transition-colors overflow-hidden shadow-2xl relative">
      {/* Absolute Tech Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.08] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center relative z-10">
        
        {/* Left Side: Visualizer Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-black/60 rounded-xl border border-white/5 p-6 min-h-[340px] relative overflow-hidden">
          
          {/* Laser Head & Beam Indicator */}
          {isEngraving && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Vertical scanning laser line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_20px_#06b6d4]"
                style={{ top: `${15 + (engravedProgress / 100) * 70}%` }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              
              {/* Spark particles around laser node */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24]"
                style={{
                  top: `${15 + (engravedProgress / 100) * 70}%`,
                  left: `${40 + Math.sin(engravedProgress * 10) * 15}%`,
                }}
              />
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                style={{
                  top: `${15 + (engravedProgress / 100) * 70}%`,
                  left: `${60 - Math.sin(engravedProgress * 8) * 12}%`,
                }}
              />
            </div>
          )}

          {/* Glowing Target Crosshairs */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-neutral-800 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-neutral-800 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-neutral-800 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-neutral-800 pointer-events-none" />

          {/* Interactive Dynamic SVG Render of selected item */}
          <div className="relative w-64 h-64 flex items-center justify-center transition-all duration-500">
            {/* The SVG Container */}
            <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-2xl">
              <defs>
                <linearGradient id="laser-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bfdbfe" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="silver-metal-sim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="25%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="75%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Conditionally render simplified but beautiful silhouette of the chosen product */}
              {selectedProductId === "garrafa-termica-led" && (
                <g>
                  {/* Cap */}
                  <rect x="120" y="60" width="60" height="25" rx="3" fill="#18181b" stroke="#3f3f46" />
                  <ellipse cx="150" cy="60" rx="30" ry="8" fill={brandColor || "#06b6d4"} className="animate-pulse" />
                  {/* Neck */}
                  <rect x="130" y="85" width="40" height="15" rx="1" fill="url(#silver-metal-sim)" />
                  {/* Bottle Cylinder */}
                  <path d="M120,100 L180,100 L180,240 C180,248 170,250 150,250 C130,250 120,248 120,240 Z" fill="#0c0a09" />
                  {/* Reflections */}
                  <path d="M122,100 L122,240 C122,244 125,248 132,249" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />

                  {/* Logo Area */}
                  {isEngraving && (
                    <g opacity={engravedProgress / 100}>
                      <text x="150" y="175" textAnchor="middle" fill="#f5f5f5" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.2em", filter: "drop-shadow(0 0 4px rgba(34,211,238,0.5))" }}>
                        {displayLogoText}
                      </text>
                      <text x="150" y="185" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontFamily: "var(--font-sans)", fontSize: "5px", letterSpacing: "0.3em" }}>
                        CO. GRAVADO
                      </text>
                    </g>
                  )}
                  {hasFinished && (
                    <g>
                      <text x="150" y="175" textAnchor="middle" fill="#d4d4d8" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.2em" }}>
                        {displayLogoText}
                      </text>
                      <text x="150" y="185" textAnchor="middle" fill="rgba(212,212,216,0.6)" style={{ fontFamily: "var(--font-sans)", fontSize: "5px", letterSpacing: "0.3em" }}>
                        CO. GRAVADO
                      </text>
                    </g>
                  )}
                </g>
              )}

              {selectedProductId === "caneta-rollerball" && (
                <g transform="translate(10, 50) rotate(-10)">
                  {/* Cap */}
                  <rect x="50" y="90" width="200" height="14" rx="2" fill="#0c0a09" />
                  {/* Steel clips */}
                  <rect x="180" y="86" width="50" height="4" rx="1" fill="url(#silver-metal-sim)" />
                  <rect x="225" y="83" width="6" height="10" rx="1" fill="url(#silver-metal-sim)" />
                  <rect x="130" y="89" width="4" height="16" fill="url(#silver-metal-sim)" />

                  {/* Engraving on the cap barrel */}
                  {isEngraving && (
                    <g opacity={engravedProgress / 100}>
                      <text x="110" y="99" textAnchor="middle" fill="#f5f5f5" style={{ fontFamily: "var(--font-sans)", fontSize: "7px", fontWeight: "bold", letterSpacing: "0.15em", filter: "drop-shadow(0 0 3px rgba(34,211,238,0.5))" }}>
                        {displayLogoText}
                      </text>
                    </g>
                  )}
                  {hasFinished && (
                    <text x="110" y="99" textAnchor="middle" fill="#e4e4e7" style={{ fontFamily: "var(--font-sans)", fontSize: "7px", fontWeight: "bold", letterSpacing: "0.15em" }}>
                      {displayLogoText}
                    </text>
                  )}
                </g>
              )}

              {selectedProductId === "base-wireless-bambu" && (
                <g>
                  {/* Circular pad */}
                  <ellipse cx="150" cy="150" rx="100" ry="70" fill="#e9d5c5" stroke="#78350f" strokeWidth="1" />
                  <ellipse cx="150" cy="150" rx="94" ry="64" fill="none" stroke="#78350f" strokeWidth="0.5" opacity="0.3" />
                  {/* Qi outer groove */}
                  <ellipse cx="150" cy="150" rx="60" ry="40" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />

                  {/* Burned Wood logo */}
                  {isEngraving && (
                    <g opacity={engravedProgress / 100}>
                      <text x="150" y="154" textAnchor="middle" fill="#2d1702" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: "bold", letterSpacing: "0.2em", filter: "drop-shadow(0 0 4px rgba(234,179,8,0.4))" }}>
                        {displayLogoText}
                      </text>
                    </g>
                  )}
                  {hasFinished && (
                    <text x="150" y="154" textAnchor="middle" fill="#3b1d03" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: "bold", letterSpacing: "0.2em" }}>
                      {displayLogoText}
                    </text>
                  )}
                </g>
              )}

              {selectedProductId !== "garrafa-termica-led" && selectedProductId !== "caneta-rollerball" && selectedProductId !== "base-wireless-bambu" && (
                <g>
                  <rect x="100" y="90" width="100" height="120" rx="8" fill="#18181b" stroke="#3f3f46" />
                  <rect x="110" y="100" width="80" height="24" rx="2" fill="url(#silver-metal-sim)" />

                  {isEngraving && (
                    <text x="150" y="160" textAnchor="middle" fill="#fff" style={{ fontFamily: "var(--font-sans)", fontSize: "9px", filter: "drop-shadow(0 0 5px #06b6d4)" }} opacity={engravedProgress / 100}>
                      {displayLogoText}
                    </text>
                  )}
                  {hasFinished && (
                    <text x="150" y="160" textAnchor="middle" fill="#d1d5db" style={{ fontFamily: "var(--font-sans)", fontSize: "9px" }}>
                      {displayLogoText}
                    </text>
                  )}
                </g>
              )}
            </svg>
          </div>

          {/* Status Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-neutral-300 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
            <span className="flex items-center gap-1.5 font-mono">
              <Cpu size={12} className={isEngraving ? "text-gold animate-spin" : "text-neutral-500"} />
              {isEngraving ? "GRAVANDO METAL..." : hasFinished ? "GRAVAÇÃO REALIZADA" : "PRONTO PARA TESTE"}
            </span>
            <span className="font-mono text-neutral-400">
              {isEngraving ? `${Math.round(engravedProgress)}%` : hasFinished ? "100%" : "0%"}
            </span>
          </div>

        </div>

        {/* Right Side: Control Deck */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-gold/10 text-gold border border-gold/25 uppercase font-semibold">
              Tecnologia B2B
            </div>
            <h3 className="text-xl font-sans font-semibold tracking-tight text-white">
              Simulador Fibra Óptica 
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Experimente a precisão cirúrgica de nossa gravação a laser rotativa de CO₂ e fibra. Digite o logotipo ao lado e dispare o feixe para sentir a háptica visual de carbonização ou decapagem metálica.
            </p>
          </div>

          {/* Product Select Tabs */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
              Escolha o Substrato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {laserProducts.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  disabled={isEngraving}
                  className={`text-[10px] font-medium py-2 px-1 text-center rounded-lg border transition-all truncate ${
                    selectedProductId === p.id
                      ? "bg-gold text-black border-gold shadow-md shadow-gold/10"
                      : "bg-black/40 text-neutral-400 border-white/5 hover:text-white hover:border-white/20 disabled:opacity-40"
                  }`}
                >
                  {p.name.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleStartEngraving}
            disabled={isEngraving}
            className={`w-full py-3.5 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              isEngraving
                ? "bg-gold/10 text-gold/50 border border-gold/25 cursor-not-allowed"
                : "bg-gold hover:bg-gold-hover text-black active:scale-98 shadow-lg shadow-gold/15"
            }`}
          >
            {isEngraving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                />
                Calibrando Laser...
              </>
            ) : hasFinished ? (
              <>
                <CheckCircle size={14} className="text-green-500" />
                Refazer Gravação
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                Disparar Feixe Laser
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
