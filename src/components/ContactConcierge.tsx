import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Calendar, Clock, Send, CheckCircle, Calculator, FileText, Sparkles, Building2 } from "lucide-react";

export function ContactConcierge() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    cnpj: "",
    bracket: "50",
    giftType: "onboarding",
    boxType: "kraft",
    urgency: "standard",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState<string | null>(null);

  // Dynamic Quote Computations based on form selections
  const computeQuote = () => {
    const qty = parseInt(formData.bracket) || 50;
    
    let unitBase = 85.0; // Drinkware / average
    if (formData.giftType === "onboarding") unitBase = 185.0;
    else if (formData.giftType === "executivo") unitBase = 125.0;
    else if (formData.giftType === "tech") unitBase = 240.0;
    else if (formData.giftType === "lifestyle") unitBase = 95.0;

    let boxCost = 12.0;
    if (formData.boxType === "luxury") boxCost = 45.0;
    else if (formData.boxType === "juta") boxCost = 22.0;
    else if (formData.boxType === "none") boxCost = 0;

    // Premium bulk discount scale
    let discount = 1.0;
    if (qty >= 500) discount = 0.82;
    else if (qty >= 250) discount = 0.88;
    else if (qty >= 100) discount = 0.92;

    const setupFee = 250.0; // Laser and matrix setup
    const productsTotal = qty * (unitBase + boxCost) * discount;
    const freight = formData.urgency === "express" ? 450.0 : 150.0;
    const totalEstimate = productsTotal + setupFee + freight;

    return {
      unitPrice: (productsTotal / qty),
      subtotal: productsTotal,
      setupFee,
      freight,
      total: totalEstimate
    };
  };

  const quote = computeQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const availableSlots = [
    { date: "Hoje", time: "14:30" },
    { date: "Amanhã", time: "10:00" },
    { date: "Amanhã", time: "15:00" },
    { date: "Quarta-feira", time: "09:30" },
    { date: "Quarta-feira", time: "16:00" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 py-6 text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Information & Virtual Schedule Calendar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase block">
              CANAL DE ATENDIMENTO VIP
            </span>
            <h3 className="text-2xl font-sans font-semibold text-black dark:text-white tracking-tight">
              Concierge Desk OPUS
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Entre em contato direto com nossos curadores corporativos ou agende uma videoconferência para alinhar as amostras físicas e manuais de marca do seu lote.
            </p>
          </div>

          {/* Core Contacts Card */}
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 text-xs font-mono">
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <Mail className="text-gold" size={14} />
              <span>curadoria@opusateliere.com.br</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <Phone className="text-gold" size={14} />
              <span>+55 (11) 3089-4400 (WhatsApp VIP)</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <MapPin className="text-gold" size={14} />
              <span className="leading-tight text-neutral-600 dark:text-neutral-400">
                Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP
              </span>
            </div>
          </div>

          {/* Virtual Appointment Slot Scheduler */}
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <Calendar className="text-gold" size={12} />
                <span>Video-Call de Curadoria</span>
              </div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">30 MIN</span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-normal">
              Selecione um horário para receber uma demonstração privada das técnicas de gravação e debossing via Teams ou Google Meet:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {availableSlots.map((slot, idx) => {
                const isSelected = selectedMeetingTime === `${slot.date} às ${slot.time}`;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMeetingTime(`${slot.date} às ${slot.time}`)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-gold text-black border-gold font-bold shadow-md shadow-gold/15"
                        : "bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 border-black/5 dark:border-white/5 hover:text-black dark:text-white hover:border-black/10 dark:border-white/10"
                    }`}
                  >
                    <span className="text-[9px] font-mono block leading-none">{slot.date}</span>
                    <span className="text-[10px] font-sans font-bold mt-1 block">{slot.time}</span>
                  </button>
                );
              })}
            </div>

            {selectedMeetingTime && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-xl p-3 text-[10px] font-mono text-center"
              >
                ✓ Reunião solicitada para: <strong className="text-black dark:text-white">{selectedMeetingTime}</strong>. Enviaremos o convite no e-mail corporativo cadastrado ao lado.
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Intake Intake Form with Live Pricing Estimator Panel */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/25 text-gold mx-auto flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-sans font-semibold text-black dark:text-white">
                    Solicitação de Atendimento Registrada!
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Seu dossiê prévio de orçamento foi catalogado sob o código provisório <strong className="text-gold">#OP-{Math.floor(Math.random() * 90000 + 10000)}</strong>. Um curador especializado entrará em contato nas próximas 2 horas comerciais.
                  </p>
                </div>
                {selectedMeetingTime && (
                  <p className="text-[10px] font-mono text-teal-400">
                    O link de videoconferência para {selectedMeetingTime} já foi agendado e reservado.
                  </p>
                )}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 text-stone-200 font-sans text-xs font-medium px-6 py-2.5 rounded-xl border border-black/5 dark:border-white/5 transition-all"
                >
                  Fazer nova simulação de lote
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                  <Calculator size={16} className="text-gold" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                    Calculadora de Orçamento Técnico & Projeto
                  </h4>
                </div>

                {/* Form Group 1: Gift Details & Package Types */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Linha de Brinde Base:
                    </label>
                    <select
                      value={formData.giftType}
                      onChange={(e) => setFormData({ ...formData, giftType: e.target.value })}
                      className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl p-2 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none"
                    >
                      <option value="onboarding">Welcome Kits Executivos</option>
                      <option value="executivo">Linha de Escrita & Cadernos</option>
                      <option value="tech">Acessórios Eletrônicos</option>
                      <option value="lifestyle">Gourmet & Garrafas Térmicas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Estojo / Embalagem:
                    </label>
                    <select
                      value={formData.boxType}
                      onChange={(e) => setFormData({ ...formData, boxType: e.target.value })}
                      className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl p-2 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none"
                    >
                      <option value="kraft">Estojo Kraft Fine-Art (+R$12,00)</option>
                      <option value="luxury">Estojo Rígido Luxo (+R$45,00)</option>
                      <option value="juta">Bolsa Ecológica de Juta (+R$22,00)</option>
                      <option value="none">Sem Estojo Especial</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Quantidade Estimada:
                    </label>
                    <select
                      value={formData.bracket}
                      onChange={(e) => setFormData({ ...formData, bracket: e.target.value })}
                      className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl p-2 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none"
                    >
                      <option value="20">20 unidades (Lote Mínimo)</option>
                      <option value="50">50 unidades (Desconto 3%)</option>
                      <option value="100">100 unidades (Desconto 8%)</option>
                      <option value="250">250 unidades (Desconto 12%)</option>
                      <option value="500">500 unidades (Desconto 18%)</option>
                      <option value="1000">1000+ unidades (Corporativo VIP)</option>
                    </select>
                  </div>
                </div>

                {/* Simulated Live Budget Board */}
                <div className="bg-neutral-100/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between items-center text-neutral-700 dark:text-neutral-300 font-semibold border-b border-black/5 dark:border-white/5 pb-2">
                    <span className="flex items-center gap-1"><FileText size={12} className="text-gold" /> Estudo Prévio Estimado</span>
                    <span className="text-[10px] text-neutral-500">LOTE #{formData.bracket}UN</span>
                  </div>
                  
                  <div className="space-y-1.5 leading-relaxed text-[11px]">
                    <div className="flex justify-between">
                      <span>Valor Unitário Médio (Item + Embalagem):</span>
                      <span className="text-black dark:text-white">R$ {quote.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custo de Setup Técnico Industrial (Fixo):</span>
                      <span className="text-black dark:text-white">R$ {quote.setupFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete Técnico Segurado (Simulação SP):</span>
                      <span className="text-black dark:text-white">R$ {quote.freight.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-black/5 dark:border-white/5 pt-2 text-black dark:text-white font-bold text-sm">
                      <span>VALOR TOTAL DO LOTE:</span>
                      <span className="text-gold border-b border-gold">R$ {quote.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Form Group 2: Corporate Client Data */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 border-t border-black/5 dark:border-white/5 pt-4">
                    <Building2 size={13} className="text-gold" />
                    <span>Dados Cadastrais da Empresa</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        placeholder="Nome do Solicitante / Cargo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl py-2 px-3 text-xs text-black dark:text-white focus:outline-none placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="email"
                        required
                        placeholder="E-mail Corporativo"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl py-2 px-3 text-xs text-black dark:text-white focus:outline-none placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp para Contato"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl py-2 px-3 text-xs text-black dark:text-white focus:outline-none placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="space-y-1 font-mono">
                      <input
                        type="text"
                        required
                        placeholder="Nome da Empresa / CNPJ"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl py-2 px-3 text-xs text-black dark:text-white focus:outline-none placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <textarea
                      rows={3}
                      placeholder="Descreva detalhes específicos do seu projeto (ex: prazo máximo de entrega, necessidade de prova física em couro, etc.)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 focus:border-gold rounded-xl py-2 px-3 text-xs text-black dark:text-white focus:outline-none placeholder:text-neutral-600"
                    />
                  </div>

                  {/* Delivery Urgency Toggles */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
                    <span>Urgência de Entrega:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value="standard"
                        checked={formData.urgency === "standard"}
                        onChange={() => setFormData({ ...formData, urgency: "standard" })}
                        className="accent-gold"
                      />
                      <span>Padrão (15 a 20 dias)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-amber-400">
                      <input
                        type="radio"
                        name="urgency"
                        value="express"
                        checked={formData.urgency === "express"}
                        onChange={() => setFormData({ ...formData, urgency: "express" })}
                        className="accent-gold"
                      />
                      <span>Express Super (+R$300 de frete express)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-hover text-black font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-gold/15 flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send size={13} />
                  {isSubmitting ? "Cadastrando no CRM..." : "Enviar Memorial & Iniciar Orçamento"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
