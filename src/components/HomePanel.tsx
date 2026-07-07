import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck, Layers, Cpu, Compass, Building2, Paintbrush } from "lucide-react";
import { Product } from "../types";

interface HomePanelProps {
  brandColor: string;
  setBrandColor: (color: string) => void;
  brandFont: string;
  setBrandFont: (font: string) => void;
  logoText: string;
  setLogoText: (text: string) => void;
  onNavigateToProducts: () => void;
  onOpenCuration: () => void;
  sampleProducts: Product[];
}

export function HomePanel({
  brandColor,
  setBrandColor,
  brandFont,
  setBrandFont,
  logoText,
  setLogoText,
  onNavigateToProducts,
  onOpenCuration,
  sampleProducts,
}: HomePanelProps) {
  const [logoScale, setLogoScale] = useState(1);
  const [logoY, setLogoY] = useState(0);

  return (
    <div className="space-y-16 py-6">
      {/* Immersive Welcome Hero */}
      <section className="relative rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden bg-[#030303]">
        {/* Subtle dynamic background glow in sync with brand color */}
        <div 
          className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[120px] opacity-15 pointer-events-none transition-all duration-1000"
          style={{ backgroundColor: brandColor }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-black/90 pointer-events-none" />

        <div className="relative z-10 px-8 py-16 md:py-24 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.25em] bg-gold/10 text-gold border border-gold/25 uppercase font-semibold">
            <Sparkles size={11} />
            Showroom Corporativo de Prestígio
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight text-black dark:text-white leading-[1.1]">
              A Reinvenção do Brinde.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">
                Bem-vindo à Era Opus.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Não oferecemos produtos genéricos. Desenvolvemos o showroom interativo de alta precisão técnica onde a identidade institucional de sua marca é simulada em tempo real sobre matérias-primas nobres.
            </p>
          </div>

          {/* Call-to-Actions & Navigation Hub */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
            <button
              onClick={onNavigateToProducts}
              className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-black font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>Acessar Mostruário</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenCuration}
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-black dark:text-white font-sans font-medium text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-gold/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Solicitar Briefing VIP</span>
            </button>
          </div>

          {/* Quality Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-8 border-t border-black/5 dark:border-white/5 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Building2 size={11} className="text-gold" />
              <span>Direcionado a CNPJs & Compras VIP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={11} className="text-gold" />
              <span>Fidelidade Técnica Homologada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass size={11} className="text-gold" />
              <span>Design de Embalagem Sob Medida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Brand Personalization Gateway (The Smart Tool Setup card) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 bg-[#070707]/90 border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-gold text-[10px] font-mono uppercase tracking-wider">
              <Paintbrush size={12} />
              <span>Ativação Instantânea de Marca</span>
            </div>
            <h2 className="text-lg font-sans font-medium text-black dark:text-white tracking-tight">
              A Inovadora Engenharia "Color Hack"
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
              Insira os dados visuais de sua empresa abaixo. Nosso algoritmo matemático de overlay aplica a assinatura cromática e o logotipo em tempo real por todo o catálogo de produtos e no estúdio WebGL.
            </p>
          </div>

          {/* Quick Config Inputs inside the welcome card */}
          <div className="space-y-4 bg-neutral-50/80 dark:bg-neutral-950/80 p-5 rounded-xl border border-black/5 dark:border-white/5 shadow-2xl">
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 block">
                1. Nome da Empresa (Texto)
              </label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="Ex: OPUS STUDIO"
                className="w-full bg-[#09090b] border border-black/10 dark:border-white/10 focus:border-gold/50 rounded-lg px-4 py-2.5 text-xs text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 block">
                2. Tipografia Institucional
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "font-sans", label: "Moderna", cls: "font-sans" },
                  { id: "font-serif", label: "Clássica", cls: "font-serif" },
                  { id: "font-mono", label: "Técnica", cls: "font-mono" }
                ].map(font => (
                  <button
                    key={font.id}
                    onClick={() => setBrandFont(font.id)}
                    className={`py-2 text-[10px] uppercase rounded-lg border transition-all ${brandFont === font.id ? "bg-white text-black border-black dark:border-white font-bold" : "bg-[#09090b] text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:border-white/30"}`}
                  >
                    <span className={font.cls}>{font.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 block flex items-center justify-between">
                <span>3. Cor de Assinatura</span>
                <span className="text-gold font-mono">{brandColor.toUpperCase()}</span>
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {[
                  "#D4AF37", "#3B82F6", "#EF4444", "#10B981", "#8B5CF6", "#FFFFFF"
                ].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setBrandColor(preset)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${brandColor.toLowerCase() === preset.toLowerCase() ? "border-black dark:border-white scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: preset }}
                  />
                ))}
                <div className="w-[1px] h-6 bg-white/10 mx-1" />
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-7 h-7 rounded border border-black/20 dark:border-white/20 bg-transparent cursor-pointer p-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/5 dark:border-white/5">
              <div className="space-y-2">
                <label className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 block flex justify-between">
                  <span>Escala</span>
                  <span className="text-black dark:text-white">{(logoScale * 100).toFixed(0)}%</span>
                </label>
                <input 
                  type="range" min="0.5" max="2" step="0.1" 
                  value={logoScale} onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                  className="w-full accent-gold h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 block flex justify-between">
                  <span>Posição (Y)</span>
                  <span className="text-black dark:text-white">{logoY > 0 ? `+${logoY}` : logoY}px</span>
                </label>
                <input 
                  type="range" min="-80" max="80" step="5" 
                  value={logoY} onChange={(e) => setLogoY(parseInt(e.target.value))}
                  className="w-full accent-gold h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="text-[9px] text-neutral-500 font-mono leading-relaxed flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sincronização global de marca ativa.</span>
          </div>
        </div>

        {/* Dynamic preview block */}
        <div className="lg:col-span-7 bg-[#050505] border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col space-y-6 overflow-hidden relative">
          
          <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4 z-10 relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
              Galeria de Aplicações Reais
            </span>
            <span className="text-[9px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded uppercase font-semibold border border-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              RENDERIZANDO
            </span>
          </div>

          {/* Showcase of dynamic template branding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 z-10 relative">
            
            {/* Real Image Preview 1: Thermal Bottle (Laser Engraving) */}
            <div 
              onClick={onNavigateToProducts}
              className="group relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-gold/50 transition-all cursor-pointer min-h-[220px]"
            >
              <img src="/assets/images/garrafa_hero.jpg" alt="Garrafa Térmica" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-500">
                 <div 
                   className="mt-8 text-center flex flex-col relative" 
                   style={{ 
                     color: brandColor, 
                     transform: `scale(${logoScale}) translateY(${logoY}px) rotateX(15deg)`,
                     transformStyle: 'preserve-3d'
                   }}
                 >
                   {/* Laser reflection overlay animation */}
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-[shimmer_3s_infinite_linear] bg-[length:100%_200%] mix-blend-overlay" style={{ WebkitBackgroundClip: 'text', color: 'transparent' }}>
                     <span className={`text-xl font-bold tracking-widest ${brandFont}`}>
                       {logoText || "OPUS"}
                     </span>
                   </div>
                   
                   {/* Laser engraved base */}
                   <span 
                     className={`text-xl font-bold tracking-widest opacity-90 ${brandFont}`}
                     style={{ textShadow: "0px 1px 1px rgba(255,255,255,0.4), 0px -1px 2px rgba(0,0,0,0.9)" }}
                   >
                     {logoText || "OPUS"}
                   </span>
                 </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-[8px] font-mono text-black/70 dark:text-white/70 uppercase tracking-wider">Gravação Laser<br/><strong className="text-black dark:text-white">Garrafa LED</strong></span>
                <span className="text-[9px] font-mono text-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Ver Produto <ArrowRight size={10} /></span>
              </div>
            </div>

            {/* Real Image Preview 2: Notebook (Debossing) */}
            <div 
              onClick={onNavigateToProducts}
              className="group relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-gold/50 transition-all cursor-pointer min-h-[220px]"
            >
              <img src="/assets/images/moleskine_hero.jpg" alt="Caderno Moleskine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div 
                   className="mb-4 text-center opacity-85" 
                   style={{ 
                     color: brandColor,
                     transform: `scale(${logoScale}) translateY(${logoY}px)`,
                     mixBlendMode: "multiply"
                   }}
                 >
                   <span 
                     className={`text-2xl font-bold tracking-widest ${brandFont}`}
                     style={{
                       textShadow: "1px 1px 2px rgba(255,255,255,0.1), -1px -1px 2px rgba(0,0,0,0.7), inset 0px 2px 4px rgba(0,0,0,0.8)"
                     }}
                   >
                     {logoText || "OPUS"}
                   </span>
                 </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-[8px] font-mono text-black/70 dark:text-white/70 uppercase tracking-wider">Debossing<br/><strong className="text-black dark:text-white">Moleskine Premium</strong></span>
                <span className="text-[9px] font-mono text-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Ver Produto <ArrowRight size={10} /></span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Features Highlight (Why choose Opus) */}
      <section className="space-y-8">
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold block">
            Os Pilares da Excelência
          </span>
          <h2 className="text-xl font-sans font-semibold text-black dark:text-white tracking-tight">
            Tecnologia de Vanguarda e Curadoria Exclusiva
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#070707]/70 border border-black/5 dark:border-white/5 rounded-xl space-y-3 hover:border-black/10 dark:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <Cpu size={14} />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-200">
              Estúdio de Gravação 3D WebGL
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              Esqueça as imagens de IA alucinadas. Nosso estúdio virtual simula a curvatura de logos em objetos cilíndricos, metalicidade e rugosidade reais em modelos matemáticos PBR.
            </p>
          </div>

          <div className="p-6 bg-[#070707]/70 border border-black/5 dark:border-white/5 rounded-xl space-y-3 hover:border-black/10 dark:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <Layers size={14} />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-200">
              Kits de Onboarding Sob Medida
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              Desenhamos berços termomoldados simétricos revestidos em veludo e EVA de alta densidade. O encaixe milimétrico transforma a recepção de novos talentos em um rito memorável.
            </p>
          </div>

          <div className="p-6 bg-[#070707]/70 border border-black/5 dark:border-white/5 rounded-xl space-y-3 hover:border-black/10 dark:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <ShieldCheck size={14} />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-200">
              Atendimento Consultivo VIP
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              O processo é 100% faturado para CNPJ e conta com envio de amostras reais. Atuamos como extensão do seu time de branding para garantir a precisão de cada Pantone ou gravação laser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
