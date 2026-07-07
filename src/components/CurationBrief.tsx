import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product, CuratedBrief } from "../types";
import { PRODUCTS } from "../data";
import { Send, CheckCircle2, Copy, FileText, X, Briefcase, Users, Calendar, ArrowRight, Palette, Sliders, Printer } from "lucide-react";

interface CurationBriefProps {
  onClose: () => void;
  selectedProductId?: string;
  initialBrandColor?: string;
  initialLogoText?: string;
}

export const CurationBrief: React.FC<CurationBriefProps> = ({
  onClose,
  selectedProductId,
  initialBrandColor = "#3b82f6",
  initialLogoText = "",
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    companyName: "",
    repName: "",
    email: "",
    phone: "",
    brandColor: initialBrandColor,
    logoText: initialLogoText,
    eventObjective: "onboarding",
    targetAudience: "executive",
    estimatedQuantity: "100",
    selectedProductIds: selectedProductId ? [selectedProductId] : [PRODUCTS[0].id],
    customNotes: "",
  });

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [projectCode, setProjectCode] = useState("");

  const handleProductToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedProductIds.includes(id);
      if (exists) {
        // Don't empty if it's the only one
        if (prev.selectedProductIds.length === 1) return prev;
        return { ...prev, selectedProductIds: prev.selectedProductIds.filter((p) => p !== id) };
      }
      return { ...prev, selectedProductIds: [...prev.selectedProductIds, id] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.repName) {
      alert("Por favor, preencha os campos obrigatórios (Empresa, Nome e E-mail).");
      return;
    }

    setSubmitting(true);
    // Simulate premium server-side calculation
    setTimeout(() => {
      const code = `CRD-${formData.companyName.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setProjectCode(code);
      setSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const copyProposalToClipboard = () => {
    const selectedProductNames = PRODUCTS.filter((p) => formData.selectedProductIds.includes(p.id))
      .map((p) => `• ${p.name}`)
      .join("\n");

    const text = `PROJETO DE CURADORIA CORPORATIVA EXCLUSIVA
Código de Projeto: ${projectCode}
Empresa: ${formData.companyName}
Responsável: ${formData.repName}
Contato: ${formData.email} / ${formData.phone}
Cor da Marca: ${formData.brandColor}
Assinatura Visual / Logo: ${formData.logoText || "Nenhum informado"}
Objetivo: ${formData.eventObjective.toUpperCase()}
Público-Alvo: ${formData.targetAudience.toUpperCase()}
Quantidade Estimada: ${formData.estimatedQuantity} unidades

Produtos Selecionados para Estudo de Viabilidade:
${selectedProductNames}

Instruções Customizadas:
${formData.customNotes || "Nenhuma instrução específica."}

--------------------------------------------------
Status: BRIEFING ENVIADO COM SUCESSO.
Aguardando contato do Arquiteto Corporativo em até 2 horas úteis.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Header bar */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/60">
          <div className="space-y-1">
            <span className="text-[9px] font-mono tracking-[0.25em] text-gold uppercase font-semibold">
              B2B Executive Portal
            </span>
            <h2 className="text-lg font-sans font-medium text-white flex items-center gap-2">
              <Briefcase size={16} className="text-gold" />
              {step === 1 ? "Solicitação de Curadoria Premium" : "Projeto de Curadoria Protocolado"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/60 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form
                key="form-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                {/* Left Form: B2B Information */}
                <div className="md:col-span-7 space-y-5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gold border-b border-white/5 pb-2 font-semibold">
                    01. Informações Corporativas
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                        Nome da Empresa <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Google Brasil"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                        Seu Nome Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Thiago Tasf"
                        value={formData.repName}
                        onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                        E-mail de Contato <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: executivo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: (11) 98888-7777"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors"
                      />
                    </div>
                  </div>

                  <h3 className="text-xs font-mono uppercase tracking-widest text-gold border-b border-white/5 pb-2 pt-2 font-semibold">
                    02. Alinhamento de Escopo e Volume
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1">
                        <Users size={10} /> Objetivo Geral
                      </label>
                      <select
                        value={formData.eventObjective}
                        onChange={(e) => setFormData({ ...formData, eventObjective: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors appearance-none"
                      >
                        <option value="onboarding">Boas-Vindas Onboarding</option>
                        <option value="executivo">Presente C-Level Executivo</option>
                        <option value="eventos">Brindes para Eventos / Convenção</option>
                        <option value="lifestyle">Premiação Fim de Ano / Aniversário</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1">
                        <Calendar size={10} /> Público Target
                      </label>
                      <select
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors appearance-none"
                      >
                        <option value="executive">Diretoria e Liderança Executiva</option>
                        <option value="tech">Equipes Técnicas / Desenvolvedores</option>
                        <option value="general">Colaboradores em Geral (Geral)</option>
                        <option value="esg">Sustentabilidade & ESG</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1">
                        <Sliders size={10} /> Volume Estimado
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors appearance-none"
                      >
                        <option value="15-49">15 a 49 unidades</option>
                        <option value="50">50 a 99 unidades</option>
                        <option value="100">100 a 249 unidades</option>
                        <option value="250">250 a 499 unidades</option>
                        <option value="500">500+ unidades</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                      Observações & Restrições de Material (Ex: Madeira, Sem Plástico, Prazos)
                    </label>
                    <textarea
                      placeholder="Indique datas limite para entrega do projeto, diretrizes ESG ou qualquer preferência conceitual..."
                      rows={3}
                      value={formData.customNotes}
                      onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                      className="w-full bg-black/40 border border-white/5 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none rounded-xl p-3 text-xs text-white transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Right Form: Selection Grid to refine chosen items */}
                <div className="md:col-span-5 flex flex-col space-y-5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gold border-b border-white/5 pb-2 font-semibold">
                    03. Itens do Mostruário Vinculados
                  </h3>

                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Selecione quais itens de nossa galeria de arte corporativa deseja incluir no estudo de viabilidade estética e técnica:
                  </p>

                  <div className="flex-1 bg-black border border-white/5 rounded-2xl p-4 overflow-y-auto max-h-[220px] space-y-2">
                    {PRODUCTS.map((p) => {
                      const isSelected = formData.selectedProductIds.includes(p.id);
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleProductToggle(p.id)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? "bg-gold/10 border-gold/30 text-gold"
                              : "bg-transparent border-white/5 hover:border-white/10 text-neutral-400"
                          }`}
                        >
                          <span className="font-medium truncate pr-4">{p.name}</span>
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              isSelected ? "bg-gold border-gold text-black" : "border-neutral-700"
                            }`}
                          >
                            {isSelected && <span className="text-[9px] font-bold">✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-neutral-500">Cor Identidade (HEX):</span>
                      <span className="font-mono text-neutral-300 font-semibold">{formData.brandColor}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-neutral-500">Assinatura Logotipo:</span>
                      <span className="text-neutral-300 font-semibold max-w-[120px] truncate">
                        {formData.logoText || "Sabor Original"}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] border-t border-white/5 pt-2">
                      <span className="text-neutral-400 font-medium">Total de Peças Curadas:</span>
                      <span className="text-white font-bold">{formData.selectedProductIds.length}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-black hover:bg-gold-hover py-3.5 px-4 rounded-xl font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/10 active:scale-98"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Avaliando Viabilidade...
                      </>
                    ) : (
                      <>
                        Submeter Briefing Corporativo <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Step 2: Protocol Confirmation Blueprint Certificate */
              <motion.div
                key="success-step"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-6 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-2 shadow-md shadow-gold/5">
                  <CheckCircle2 size={32} className="text-gold" />
                </div>

                <div className="space-y-2 max-w-lg">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase font-semibold">
                    Protocolo Corporativo Confirmado
                  </span>
                  <h3 className="text-2xl font-sans font-semibold text-white tracking-tight">
                    Seu Projeto está sob Análise Estética
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Criamos uma folha de estilo e simulação física utilizando as técnicas selecionadas. Um Arquiteto de Produto de nossa equipe foi notificado para validar as amostras com a marca <strong>{formData.companyName}</strong>.
                  </p>
                </div>

                {/* Print Style Injection for Curation Brief Protocol Receipt */}
                <style dangerouslySetInnerHTML={{__html: `
                  @media print {
                    body * {
                      visibility: hidden !important;
                    }
                    #printable-curation-brief-card, #printable-curation-brief-card * {
                      visibility: visible !important;
                    }
                    #printable-curation-brief-card {
                      position: fixed !important;
                      left: 0 !important;
                      top: 0 !important;
                      width: 100% !important;
                      height: auto !important;
                      padding: 2cm !important;
                      background: white !important;
                      color: black !important;
                      border: 2px solid #BF953F !important;
                      box-shadow: none !important;
                      font-family: monospace !important;
                    }
                    #printable-curation-brief-card span {
                      color: #4b5563 !important;
                    }
                    #printable-curation-brief-card div, #printable-curation-brief-card span {
                      color: black !important;
                    }
                  }
                `}} />

                {/* Simulated Certificate Board */}
                <div id="printable-curation-brief-card" className="w-full max-w-2xl bg-[#0a0a0a] border border-gold/25 rounded-2xl p-6 text-left relative overflow-hidden font-mono text-[11px] space-y-4 shadow-lg shadow-gold/5">
                  {/* Subtle diagonal background stamp */}
                  <div className="absolute right-[-40px] bottom-[-20px] text-[72px] font-bold text-gold/5 uppercase select-none tracking-widest rotate-[-12deg]">
                    B2B VIP
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between border-b border-white/5 pb-3">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-neutral-500">CÓDIGO PROTOCOLO</span>
                      <div className="text-xs font-bold text-gold">{projectCode}</div>
                    </div>
                    <div className="space-y-1 mt-2 sm:mt-0 text-left sm:text-right">
                      <span className="text-[9px] uppercase text-neutral-500">DATA SUBMISSÃO</span>
                      <div className="text-xs text-neutral-300">
                        {new Date().toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Empresa</span>
                        <span className="text-neutral-200 font-semibold">{formData.companyName}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Representante</span>
                        <span className="text-neutral-200">{formData.repName}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Canal de Atendimento</span>
                        <span className="text-neutral-200">{formData.email}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Matriz de Cores</span>
                        <span className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-800"
                            style={{ backgroundColor: formData.brandColor }}
                          />
                          <span className="text-neutral-200 font-mono">{formData.brandColor}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Quantidade Curada</span>
                        <span className="text-neutral-200 font-semibold">{formData.estimatedQuantity} unidades</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase text-[9px]">Itens no Portfólio</span>
                        <span className="text-neutral-200">
                          {formData.selectedProductIds.length} produtos premium associados
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-1">
                    <span className="text-neutral-500 block uppercase text-[9px]">Próximas Etapas (Próximas 2 Horas)</span>
                    <ol className="list-decimal list-inside text-neutral-400 space-y-1">
                      <li>Distribuição do brief para Arquiteto de Produto sênior.</li>
                      <li>Simulação computacional de gravação com o logotipo vetorizado.</li>
                      <li>Envio do portfólio físico virtual para aprovação (PDF).</li>
                    </ol>
                  </div>
                </div>

                {/* Options Footer */}
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg pt-2 no-print">
                  <button
                    onClick={copyProposalToClipboard}
                    className="flex-1 bg-black hover:bg-neutral-900 text-stone-100 py-3 px-3 rounded-xl text-[10px] font-sans font-medium uppercase tracking-wider border border-white/10 hover:border-gold/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={11} className="text-green-500" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={11} /> Copiar Memorial
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-stone-100 py-3 px-3 rounded-xl text-[10px] font-sans font-medium uppercase tracking-wider border border-white/10 hover:border-gold/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Printer size={11} /> Imprimir Protocolo
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 bg-gold text-black hover:bg-gold-hover py-3 px-3 rounded-xl text-[10px] font-sans font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-gold/10"
                  >
                    Concluir
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
