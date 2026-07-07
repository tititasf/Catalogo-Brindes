import React from "react";
import { motion } from "motion/react";
import { Sparkles, Hammer, ShieldCheck, Leaf, Globe, Flame } from "lucide-react";

export function AboutUs() {
  const values = [
    {
      icon: <Hammer className="text-gold" size={20} />,
      title: "Artesanato de Alta Precisão",
      description: "Cada item é selecionado individualmente por nossa curadoria estética e calibrado manualmente sob feixes de laser infravermelho ou matrizes aquecidas a 180°C."
    },
    {
      icon: <ShieldCheck className="text-gold" size={20} />,
      title: "Garantia de Fidelidade de Marca",
      description: "Seguimos rigorosamente os manuais de identidade corporativa (brandbooks), assegurando alinhamento milimétrico e aprovação cromática digital sem distorções."
    },
    {
      icon: <Leaf className="text-gold" size={20} />,
      title: "Plástico Zero & Orgânicos Nobres",
      description: "Nossa linha baseia-se em couro de curtimento vegetal de curtumes certificados, madeiras maciças de reflorestamento, cerâmicas artesanais e ligas metálicas recicláveis."
    },
    {
      icon: <Globe className="text-gold" size={20} />,
      title: "Logística Corporativa Integrada",
      description: "Entregamos kits de boas-vindas diretamente nas residências dos seus novos colaboradores ou em lotes únicos paletizados para os seus maiores eventos de alta diretoria."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 py-8"
    >
      {/* Cinematic Banner / Manifesto */}
      <div className="relative rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 overflow-hidden p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.2em] bg-gold/10 text-gold border border-gold/25 uppercase font-semibold">
            Nosso Manifesto Fundador
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-black dark:text-white tracking-wide">
            OPUS: A união entre a alma do artesão e o rigor da engenharia.
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Fundada em São Paulo com a missão de banir o brinde promocional descartável da cultura de alta governança. Acreditamos que um objeto entregue por uma corporação aos seus líderes e parceiros é um embaixador físico do seu valor intangível. Cada caneta, estojo, bloco de notas ou dispositivo tecnológico em nossa curadoria é feito para durar décadas e contar uma história de prestígio.
          </p>
        </div>

        <div className="bg-neutral-100/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 rounded-2xl p-6 space-y-4 max-w-sm w-full font-mono text-[10px] text-neutral-600 dark:text-neutral-400 relative">
          <div className="flex items-center justify-between text-black dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
            <span>REGISTRO DE ATELIÊ</span>
            <span className="text-gold">SÃO PAULO - BR</span>
          </div>
          <div className="space-y-2 leading-relaxed">
            <p>• <strong className="text-neutral-200">Madeiras Maciças:</strong> Amburana, Cabreúva e Roxinho recuperados.</p>
            <p>• <strong className="text-neutral-200">Metais:</strong> Alumínio aeroespacial 6061 anodizado jateado.</p>
            <p>• <strong className="text-neutral-200">Embalagens:</strong> Estojos rígidos revestidos em papel fine-art italiano.</p>
          </div>
          <div className="text-center pt-2 text-[9px] text-neutral-500 uppercase tracking-widest border-t border-black/5 dark:border-white/5">
            CRAFTED TO LAST A LIFETIME
          </div>
        </div>
      </div>

      {/* Grid of Values */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase block">
            Diferenciais de Prestígio
          </span>
          <h3 className="text-2xl font-sans font-semibold text-black dark:text-white tracking-tight">
            Por que escolher a curadoria OPUS?
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Abordamos a produção de lotes corporativos com a mesma obsessão por detalhes de uma casa de alta costura ou relojoaria suíça.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {values.map((v, idx) => (
            <div 
              key={idx} 
              className="bg-neutral-50/60 dark:bg-neutral-950/60 border border-black/5 dark:border-white/5 hover:border-gold/25 p-6 rounded-2xl transition-all duration-300 space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all group-hover:scale-105">
                {v.icon}
              </div>
              <h4 className="font-sans font-medium text-sm text-black dark:text-white group-hover:text-gold transition-colors">
                {v.title}
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Certification Quote */}
      <div className="border border-teal-500/20 bg-teal-950/10 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center text-teal-400">
          <Globe size={24} />
        </div>
        <h4 className="text-xs font-mono uppercase tracking-widest text-teal-300">
          Selo Carbono Neutro & Cadeia Protegida
        </h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Nossa cadeia de fornecimento é submetida a auditorias anuais para comprovar remuneração justa a cooperativas artesanais, reflorestamento ativo e neutralização completa de carbono nas etapas de frete, garantindo que o prestígio da sua empresa ande de mãos dadas com a responsabilidade climática.
        </p>
      </div>
    </motion.div>
  );
}
