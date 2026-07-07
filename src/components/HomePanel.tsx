import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck, Layers, Cpu, Compass, Building2, Paintbrush } from "lucide-react";
import { Product } from "../types";

interface HomePanelProps {
  brandColor: string;
  setBrandColor: (color: string) => void;
  logoText: string;
  setLogoText: (text: string) => void;
  onNavigateToProducts: () => void;
  onOpenCuration: () => void;
  sampleProducts: Product[];
}

export function HomePanel({
  brandColor,
  setBrandColor,
  logoText,
  setLogoText,
  onNavigateToProducts,
  onOpenCuration,
  sampleProducts,
}: HomePanelProps) {
  return (
    <div className="space-y-16 py-6">
      {/* Immersive Welcome Hero */}
      <section className="relative rounded-3xl border border-white/5 overflow-hidden bg-[#030303]">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight text-white leading-[1.1]">
              A Reinvenção do Brinde.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">
                Bem-vindo à Era Opus.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
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
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white font-sans font-medium text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-white/10 hover:border-gold/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Solicitar Briefing VIP</span>
            </button>
          </div>

          {/* Quality Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-8 border-t border-white/5 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
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
        <div className="lg:col-span-5 bg-[#070707]/90 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-gold text-[10px] font-mono uppercase tracking-wider">
              <Paintbrush size={12} />
              <span>Ativação Instantânea de Marca</span>
            </div>
            <h2 className="text-lg font-sans font-medium text-white tracking-tight">
              A Inovadora Engenharia "Color Hack"
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Insira os dados visuais de sua empresa abaixo. Nosso algoritmo matemático de overlay aplica a assinatura cromática e o logotipo em tempo real por todo o catálogo de produtos e no estúdio WebGL.
            </p>
          </div>

          {/* Quick Config Inputs inside the welcome card */}
          <div className="space-y-4 bg-neutral-950/60 p-4 rounded-xl border border-white/5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Nome da sua Empresa (Gravação)
              </label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="Insira o texto do logo"
                className="w-full bg-[#0d0d0f] border border-white/10 focus:border-gold/40 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder-neutral-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Cor Institucional (HEX / Seletor)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-9 h-9 rounded border border-neutral-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  maxLength={7}
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
                  className="flex-1 bg-[#0d0d0f] border border-white/10 focus:border-gold/40 rounded-lg px-3 py-2 text-xs text-stone-100 font-mono uppercase focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 font-mono leading-relaxed flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>Sincronização global de marca ativa.</span>
          </div>
        </div>

        {/* Dynamic preview block */}
        <div className="lg:col-span-7 bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Visualização Preliminar da Marca
            </span>
            <span className="text-[9px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded uppercase font-semibold">
              SISTEMA ATIVO
            </span>
          </div>

          {/* Showcase of dynamic template branding */}
          <div className="grid grid-cols-2 gap-4 my-auto">
            {sampleProducts.slice(0, 2).map((prod) => (
              <div 
                key={prod.id} 
                onClick={onNavigateToProducts}
                className="group relative bg-[#09090b]/80 border border-white/5 hover:border-gold/30 rounded-xl p-4 flex flex-col items-center justify-between min-h-[180px] transition-all cursor-pointer"
              >
                <span className="text-[8px] font-mono text-neutral-500 self-start uppercase">
                  {prod.name}
                </span>

                {/* Simulated high-fidelity customized branding on product item */}
                <div className="w-16 h-16 rounded-full border border-dashed border-white/10 flex items-center justify-center relative my-2">
                  <div 
                    className="absolute inset-0 rounded-full opacity-25 blur-sm"
                    style={{ backgroundColor: brandColor }}
                  />
                  <span 
                    className="text-[9px] font-mono font-bold uppercase tracking-wider text-center max-w-[50px] truncate"
                    style={{ color: brandColor }}
                  >
                    {logoText || "OPUS"}
                  </span>
                </div>

                <span className="text-[8px] font-mono text-neutral-400 group-hover:text-gold transition-colors uppercase tracking-widest flex items-center gap-1">
                  <span>Visualizar</span>
                  <ArrowRight size={10} />
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal text-center">
            Passe pelo catálogo interativo para inspecionar cada detalhe em <strong>alta fidelidade com fotos reais de estúdio</strong>, esquemas vetoriais e visualizadores 3D PBR WebGL completos.
          </p>
        </div>
      </section>

      {/* Corporate Features Highlight (Why choose Opus) */}
      <section className="space-y-8">
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold block">
            Os Pilares da Excelência
          </span>
          <h2 className="text-xl font-sans font-semibold text-white tracking-tight">
            Tecnologia de Vanguarda e Curadoria Exclusiva
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#070707]/70 border border-white/5 rounded-xl space-y-3 hover:border-white/10 transition-colors">
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

          <div className="p-6 bg-[#070707]/70 border border-white/5 rounded-xl space-y-3 hover:border-white/10 transition-colors">
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

          <div className="p-6 bg-[#070707]/70 border border-white/5 rounded-xl space-y-3 hover:border-white/10 transition-colors">
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
