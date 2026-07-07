import { Product, PersonalizationOption } from "./types";

export const PERSONALIZATION_OPTIONS: Record<string, PersonalizationOption> = {
  laser: {
    id: "laser",
    name: "Gravação a Laser",
    description: "Remoção cirúrgica da camada superficial de tinta ou oxidação do metal, expondo a matéria-prima interna com altíssima precisão e durabilidade permanente.",
    materialApplied: "Metais, Alumínio, Bambu, Madeira, Couro, Vidro",
    visualEffect: "Efeito metalizado refinado ou tom carbonizado natural de alta definição."
  },
  uv: {
    id: "uv",
    name: "Impressão UV Digital HD",
    description: "Cura instantânea com luz ultravioleta. Oferece cores vibrantes com fidelidade Pantone completa, textura milimétrica sob relevo e resistência a riscos.",
    materialApplied: "Plásticos, Polímeros, Bambu, Alumínio, Couro",
    visualEffect: "Cores ricas em alta definição (CMYK + Branco) com micro-relevo tátil."
  },
  silk: {
    id: "silk",
    name: "Silk Screen Premium",
    description: "Aplicação direta de tintas especiais através de matriz serigráfica, oferecendo excelente cobertura, espessura tátil e durabilidade de cor.",
    materialApplied: "Tecidos, Ecobags, Nylon, Silicone, Plásticos",
    visualEffect: "Cobertura de tinta sólida, cores Pantone puras com leve textura tátil."
  },
  debossing: {
    id: "debossing",
    name: "Debossing Profundo",
    description: "Gravação em baixo-relevo térmico realizada sob matriz metálica aquecida (clichê), afundando as fibras do material de forma permanente.",
    materialApplied: "Couro, Couro Sintético (PU), Papéis Premium",
    visualEffect: "Relevo tátil sofisticado tridimensional, textura orgânica sutil."
  },
  hot_stamping: {
    id: "hot_stamping",
    name: "Hot Stamping",
    description: "Transferência de películas metálicas (ouro, prata, bronze) sob calor e pressão, fundindo o brilho nobre diretamente ao substrato.",
    materialApplied: "Couro, Papel Cartão Premium, Capas Rígidas",
    visualEffect: "Brilho metálico reluzente, reflexo espelhado de altíssima percepção."
  },
  bordado: {
    id: "bordado",
    name: "Bordado de Alta Densidade",
    description: "Costura computadorizada com linhas premium acetinadas. Cria uma presença física volumosa, corporativa e extremamente resistente.",
    materialApplied: "Nylon, Poliéster, Algodão, Malhas de Alta Gramatura",
    visualEffect: "Volume tridimensional (3D), brilho suave das linhas, acabamento eterno."
  },
  tampografia: {
    id: "tampografia",
    name: "Tampografia Técnica",
    description: "Transferência indireta de tinta através de um tampão de silicone. Perfeito para superfícies curvas ou irregulares com precisão milimétrica.",
    materialApplied: "Plásticos, Polímeros, Pequenos Metais",
    visualEffect: "Traços extremamente finos e nítidos, acabamento fosco e liso."
  },
  dtg: {
    id: "dtg",
    name: "Impressão Direta no Tecido (DTG)",
    description: "Impressão a jato de tinta têxtil que se funde diretamente com as fibras de algodão egípcio, mantendo o toque macio do tecido.",
    materialApplied: "Algodão Egípcio, Malhas Premium",
    visualEffect: "Acabamento zero-toque, gradientes de cores contínuos, conforto extremo."
  },
  resinada: {
    id: "resinada",
    name: "Etiqueta Resinada PU",
    description: "Aplicação de camada de resina poliuretânica sobre impressão digital, criando uma lente transparente protetora contra raios UV e riscos.",
    materialApplied: "Grades de Som, Plásticos, Superfícies Planas",
    visualEffect: "Efeito 'lente' 3D brilhante, flexível e com proteção contra desbotamento."
  },
  sublimacao: {
    id: "sublimacao",
    name: "Sublimação Digital HD",
    description: "Transferência térmica de tintas em estado gasoso diretamente nas fibras moleculares do poliéster, garantindo toque zero e cores sem limite.",
    materialApplied: "Fitas Acetinadas, Poliéster Premium",
    visualEffect: "Toque nulo, resolução fotográfica dupla-face sem falhas."
  }
};

export const PRODUCTS: Product[] = [
  {
    id: "mochila-executiva",
    name: "Mochila Executiva Antifurto",
    category: "executivo",
    description: "Confeccionada em poliéster texturizado impermeável com design minimalista, zíperes ocultos, bolso com proteção RFID e porta USB integrada.",
    longDescription: "Uma obra-prima da engenharia de acessórios corporativos. Desenvolvida para profissionais que transitam entre aeroportos e salas de conselho. A estrutura rígida impede deformações, mantendo a silhueta sofisticada do produto independente do peso interno. O material texturizado gera uma rica experiência tátil de robustez e elegância.",
    material: "Poliéster Balístico Impermeável 1680D",
    dimensions: "45 x 32 x 15 cm (Capacidade: 22L)",
    minimumQuantity: 20,
    techniques: ["bordado", "laser"],
    colors: ["#1C1C1C", "#2D3748", "#1E3A8A"],
    perspectives: [
      { id: "front", name: "Vista Frontal (Logo Aplicado)", technique: "bordado", description: "Bordado de alta definição computadorizado aplicado no painel frontal." },
      { id: "tag", name: "Tag Metálica Lateral", technique: "laser", description: "Placa de metal escovado rebitada com gravação a laser profunda." }
    ]
  },
  {
    id: "garrafa-termica-led",
    name: "Garrafa Térmica com Display LED",
    category: "tech",
    description: "Garrafa térmica de vácuo duplo em aço cirúrgico com sensor tátil na tampa que exibe a temperatura exata da bebida em tempo real.",
    longDescription: "A fusão perfeita entre sofisticação e tecnologia. A parede dupla de aço inoxidável 316 (aço cirúrgico, superior ao convencional 304) garante conservação térmica de líquidos quentes por até 12 horas e frios por 24 horas. O revestimento externo em acabamento fosco (Powder Coating) convida ao toque e garante aderência impecável.",
    material: "Aço Inoxidável Cirúrgico 316 de Parede Dupla",
    dimensions: "Ø 6,5 x 22,5 cm (Capacidade: 500ml)",
    minimumQuantity: 50,
    techniques: ["laser", "uv"],
    colors: ["#0F0F10", "#FFFFFF", "#334155", "#14532D"],
    perspectives: [
      { id: "body", name: "Corpo Completo 360º", technique: "laser", description: "Gravação a laser removendo a tinta fosca externa, expondo o brilho prateado do aço." },
      { id: "detail", name: "Close-up Relevo UV", technique: "uv", description: "Impressão UV de alto relevo tátil localizada para destacar elementos gráficos da marca." }
    ]
  },
  {
    id: "caderno-moleskine",
    name: "Caderno Moleskine Premium",
    category: "onboarding",
    description: "Caderno de anotações com capa dura em couro PU ecológico, folhas pautadas em papel pólen de alta gramatura e lombada costurada.",
    longDescription: "O clássico das mentes criativas e executivas. Com folhas na tonalidade marfim (papel pólen acid-free) que evitam a fadiga visual, fita marcadora em cetim e bolso interno expansível para cartões. A capa em couro PU de textura suave e macia (Soft Touch) oferece o suporte perfeito para receber relevos profundos e duradouros.",
    material: "Couro PU Soft Touch e Papel Pólen Marfim 90g/m²",
    dimensions: "14 x 21 cm (80 folhas)",
    minimumQuantity: 100,
    techniques: ["debossing", "hot_stamping"],
    colors: ["#111827", "#7C2D12", "#1E3A8A", "#064E3B", "#F3F4F6"],
    perspectives: [
      { id: "cover-deboss", name: "Capa Inteira (Debossing)", technique: "debossing", description: "Gravação em baixo relevo térmico com afundamento elegante de 1mm das fibras do couro." },
      { id: "cover-gold", name: "Canto Inferior (Hot Stamping)", technique: "hot_stamping", description: "Aplicação de fita metálica dourada de alto brilho em área localizada." }
    ]
  },
  {
    id: "kit-welcome-onboarding",
    name: "Kit Welcome Onboarding",
    category: "onboarding",
    description: "Conjunto corporativo de luxo contendo caixa rígida sob medida, berço de EVA cortado a laser, caneca cerâmica, caderno e caneta.",
    longDescription: "O primeiro contato do colaborador em uma experiência memorável de pertencimento. Uma caixa de altíssima gramatura com fechamento magnético abriga os itens principais cuidadosamente protegidos em um berço de EVA de alta densidade texturizado. O design integrado transmite respeito, organização e o peso institucional da marca.",
    material: "Papel Cartonagem Rígido 1200g com Revestimento Fosco e EVA",
    dimensions: "35 x 30 x 10 cm",
    minimumQuantity: 15,
    techniques: ["hot_stamping", "uv", "laser"],
    colors: ["#09090B", "#1E293B", "#FFFFFF"],
    isKit: true,
    kitItems: [
      { name: "Caixa Cartonada Rígida", icon: "Box", description: "Caixa externa ultra-firme com fechamento por imã de neodímio.", offset: { x: 0, y: 0 } },
      { name: "Caneca de Cerâmica Matte", icon: "Coffee", description: "Caneca cerâmica fosca com interior esmaltado combinando.", offset: { x: -80, y: 60 } },
      { name: "Caderno de Bolso Soft Touch", icon: "BookOpen", description: "Caderno para anotações rápidas com costura de alto padrão.", offset: { x: 80, y: -40 } },
      { name: "Caneta Rollerball Minimalista", icon: "PenTool", description: "Caneta metálica pesada que encaixa no elástico do caderno.", offset: { x: 90, y: 70 } }
    ],
    perspectives: [
      { id: "exploded", name: "Visão Explodida do Kit", technique: "hot_stamping", description: "Itens flutuando levemente fora da caixa de forma conceitual para exibir a ergonomia." },
      { id: "closed", name: "Caixa Fechada com Imã", technique: "hot_stamping", description: "Efeito de Hot Stamping prateado refletindo a luz na tampa rígida." }
    ]
  },
  {
    id: "powerbank-magsafe",
    name: "Power Bank Magnético MagSafe",
    category: "tech",
    description: "Bateria portátil de indução com imãs de alta fixação compatíveis com MagSafe, corpo emborrachado e display digital de carga.",
    longDescription: "Energia sem fio instantânea para profissionais dinâmicos. Fixa-se magneticamente com força ao smartphone, transmitindo recarga por indução ultra-rápida (15W) com o máximo de eficiência energética. A carcaça traseira possui acabamento fosco suave antideslizante, ideal para grandes layouts de impressão colorida de alta resolução.",
    material: "Polímero ABS Termoplástico Emborrachado e Alumínio",
    dimensions: "9,6 x 6,4 x 1,4 cm (Capacidade: 10.000 mAh)",
    minimumQuantity: 30,
    techniques: ["uv", "laser"],
    colors: ["#000000", "#E2E8F0", "#1E3A8A"],
    perspectives: [
      { id: "front-uv", name: "Painel Frontal UV", technique: "uv", description: "Impressão digital de altíssima definição que cobre toda a área com verniz localizado." },
      { id: "back-laser", name: "Lateral Escovada Laser", technique: "laser", description: "Marcação permanente sobre o aro de alumínio traseiro." }
    ]
  },
  {
    id: "copo-termico-stanley",
    name: "Copo Térmico 473ml",
    category: "lifestyle",
    description: "Copo térmico de alta resistência em aço 18/8 com parede dupla isolada a vácuo, preservando a temperatura ideal por horas.",
    longDescription: "O clássico de confraternização corporativa e bem-estar. Projetado para suportar uso contínuo e quedas leves sem amassar. O isolamento a vácuo impede a transpiração de umidade externa no copo. Oferece uma enorme área de impressão para marcas que desejam visibilidade cotidiana e orgânica no home-office e lazer.",
    material: "Aço Inoxidável 18/8 com Acabamento Rugoso Anti-suor",
    dimensions: "Ø 8,7 x 14,6 cm",
    minimumQuantity: 50,
    techniques: ["silk", "laser"],
    colors: ["#1E293B", "#10B981", "#EF4444", "#3B82F6", "#FFFFFF"],
    perspectives: [
      { id: "body-laser", name: "Corpo Central (Laser)", technique: "laser", description: "Logomarca gravada verticalmente por laser rotativo retirando o verniz fosco." },
      { id: "body-silk", name: "Contorno Completo (Silk)", technique: "silk", description: "Impressão circular em Silk Screen com pigmentos de alto brilho e fixação extrema." }
    ]
  },
  {
    id: "fone-tws-pro",
    name: "Fone de Ouvido TWS Premium",
    category: "tech",
    description: "Fones intra-auriculares sem fio com cancelamento ativo de ruído (ANC), Bluetooth 5.3 e estojo carregador inteligente.",
    longDescription: "A pureza acústica em um design ultra-compacto. Os microfones integrados filtram ruídos indesejados para chamadas executivas em áudio cristalino. O estojo de carregamento com design elíptico possui uma textura acetinada extremamente luxuosa, perfeita para aplicações gráficas sutis e de alta definição.",
    material: "Polímero Acrílico com Revestimento Acetinado Micro-texturizado",
    dimensions: "6,0 x 4,8 x 2,2 cm (Estojo)",
    minimumQuantity: 40,
    techniques: ["tampografia", "uv"],
    colors: ["#0B0B0C", "#F8FAFC"],
    perspectives: [
      { id: "case-front", name: "Frente da Case TWS", technique: "tampografia", description: "Tampografia técnica de alta resolução com alinhamento absoluto." },
      { id: "case-back", name: "Traseira da Case (UV)", technique: "uv", description: "Impressão UV colorida com proteção contra desgaste e toque sutil." }
    ]
  },
  {
    id: "caneta-rollerball",
    name: "Caneta Rollerball Metálica Premium",
    category: "executivo",
    description: "Caneta executiva com corpo pesado em latão cromado, ponta agulha de tungstênio, escrita fluida e estojo em alumínio fosco.",
    longDescription: "O instrumento perfeito para assinar os contratos mais importantes. O peso balanceado na mão e a fricção calculada da ponta contra o papel criam uma sensação de prazer indescritível ao escrever. A carcaça preta fosca esconde uma alma metálica que, ao ser atingida pelo laser, brilha em dourado ou prata rica.",
    material: "Corpo em Latão Anodizado e Clipe em Aço Inox",
    dimensions: "13,8 cm de comprimento (Peso: 38g)",
    minimumQuantity: 50,
    techniques: ["laser"],
    colors: ["#1E293B", "#0F172A", "#FFFFFF"],
    perspectives: [
      { id: "clip", name: "Gravação no Clipe", technique: "laser", description: "Laser cirúrgico em área micrométrica do clipe metálico." },
      { id: "body-laser", name: "Gravação no Corpo", technique: "laser", description: "Gravação a laser circular de alta definição removendo o revestimento soft-touch." }
    ]
  },
  {
    id: "ecobag-heavy",
    name: "Ecobag de Algodão Cru 300g",
    category: "eventos",
    description: "Sacola ecológica estruturada confeccionada em lona de algodão cru super resistente, costuras reforçadas em 'X' e alças de ombro largas.",
    longDescription: "Um manifesto de sustentabilidade com presença física impactante. Diferente das ecobags comuns, esta peça utiliza uma lona encorpada de 300g/m² que se assemelha a uma obra têxtil utilitária. O algodão cru retém a textura original das sementes da planta, gerando uma háptica orgânica, autêntica e rústica de alta costura.",
    material: "Algodão Cru Ecológico Reciclado de Alta Gramatura (300g)",
    dimensions: "40 x 38 x 10 cm (Alça: 60 cm)",
    minimumQuantity: 150,
    techniques: ["silk"],
    colors: ["#E6DFD3"],
    perspectives: [
      { id: "front-silk", name: "Vista Frontal da Ecobag", technique: "silk", description: "Silk Screen até 4 cores com tintas orgânicas à base de água perfeitamente absorvidas." }
    ]
  },
  {
    id: "kit-churrasco-couro",
    name: "Kit Churrasco em Estojo de Couro",
    category: "lifestyle",
    description: "Conjunto gastronômico contendo faca e garfo de lâminas forjadas em aço inox escovado e estojo de couro legítimo estruturado.",
    longDescription: "A celebração do convívio no mais alto padrão de acabamento. O estojo em couro natural rígido, costurado manualmente com pespontos contrastantes, oferece um aroma característico de luxo. Os talheres possuem cabos anatômicos em madeira tratada que resistem a intempéries e lavagens constantes.",
    material: "Aço Inox 420 Escovado, Madeira de Lei e Couro Bovino Legítimo",
    dimensions: "38 x 12 x 5 cm (Estojo)",
    minimumQuantity: 10,
    isKit: true,
    kitItems: [
      { name: "Estojo de Couro Legítimo", icon: "Bookmark", description: "Estojo robusto estruturado com costuras reforçadas.", offset: { x: 0, y: 0 } },
      { name: "Fila de Churrasco Profissional", icon: "Scissors", description: "Faca com tratamento térmico e afiação artesanal.", offset: { x: -30, y: -50 } },
      { name: "Garfo Trinchante Pesado", icon: "Flame", description: "Garfo de longo alcance em aço temperado.", offset: { x: 40, y: 50 } }
    ],
    techniques: ["debossing", "laser"],
    colors: ["#542C13", "#2C1E14"],
    perspectives: [
      { id: "leather-emboss", name: "Relevo no Estojo", technique: "debossing", description: "Gravação profunda em baixo relevo térmico no couro do estojo." },
      { id: "blade-laser", name: "Laser nas Lâminas", technique: "laser", description: "Logomarca gravada a laser escurecido na superfície de aço das facas." }
    ]
  },
  {
    id: "necessaire-viagem",
    name: "Necessaire de Viagem Impermeável",
    category: "lifestyle",
    description: "Organizador de pertences com design de abertura total, zíperes selados resistentes à água e revestimento interno em nylon resinado.",
    longDescription: "Organização implacável para o executivo em movimento. O tecido externo de ripstop repele umidade e óleos, mantendo uma aparência impecável sob quaisquer condições. A aba principal se abre 180º, oferecendo visibilidade e acesso imediato a todas as divisórias internas acolchoadas.",
    material: "Tecido Ripstop Oxford Impermeável de Alta Resistência",
    dimensions: "24 x 14 x 10 cm",
    minimumQuantity: 50,
    techniques: ["debossing", "silk"],
    colors: ["#1E293B", "#111827", "#1E3A8A", "#D1D5DB"],
    perspectives: [
      { id: "tag-emboss", name: "Etiqueta de Couro Sintético", technique: "debossing", description: "Aplicação de etiqueta termogravada em baixo relevo costurada ao corpo." },
      { id: "body-silk", name: "Gravação Silk Frontal", technique: "silk", description: "Estampa minimalista de alta resistência tátil aplicada no centro." }
    ]
  },
  {
    id: "hub-usbc-multi",
    name: "Hub USB-C Multiportas de Alumínio",
    category: "tech",
    description: "Estação de conexões metálica com saída HDMI 4K, portas USB 3.0, leitores de cartão SD/TF e entrada USB-C Power Delivery 100W.",
    longDescription: "A expansão definitiva de conectividade para notebooks modernos. Com carcaça em liga de alumínio anodizado que otimiza a dissipação de calor, evitando aquecimento nos componentes eletrônicos. O acabamento cinza espacial (Space Gray) se integra perfeitamente à linguagem de design da Apple e notebooks premium.",
    material: "Carcaça Monobloco em Liga de Alumínio Anodizado",
    dimensions: "11,5 x 3,0 x 1,0 cm",
    minimumQuantity: 30,
    techniques: ["laser"],
    colors: ["#475569", "#1E293B"],
    perspectives: [
      { id: "center-laser", name: "Corpo em Alumínio (Laser)", technique: "laser", description: "Gravação a laser cinza-clara fosca contrastando delicadamente no alumínio cinza-escuro." }
    ]
  },
  {
    id: "guarda-chuva-portatil",
    name: "Guarda-Chuva Portátil Automático",
    category: "lifestyle",
    description: "Guarda-chuva compacto de abertura e fechamento por botão acionador, varetas de fibra de vidro à prova de vento e tecido Teflon repelente.",
    longDescription: "A elegância intocada em dias de tempestade. Desenvolvido com varetas flexíveis em polímero reforçado que evitam o rompimento ou dobramento com rajadas de vento fortes. O tecido impermeável seca instantaneamente com um leve sacudir, e o cabo possui empunhadura anatômica emborrachada de altíssima aderência.",
    material: "Tecido Poliéster Pongee com Proteção UV e Hastes de Fibra de Vidro",
    dimensions: "Ø 100 cm (Aberto) / 30 cm (Fechado)",
    minimumQuantity: 50,
    techniques: ["silk"],
    colors: ["#0F172A", "#1E3A8A", "#FFFFFF"],
    perspectives: [
      { id: "gomo-silk", name: "Silk no Gomo", technique: "silk", description: "Impressão serigráfica em grande escala centralizada em um dos gomos." },
      { id: "cover-silk", name: "Bainha da Capa de Proteção", technique: "silk", description: "Logo sutil aplicado na capa portátil de transporte rápida." }
    ]
  },
  {
    id: "camiseta-egipcia",
    name: "Camiseta Algodão Egípcio",
    category: "eventos",
    description: "Camiseta casual de modelagem alfaiataria confeccionada com o legítimo fio de algodão egípcio de fibra extra-longa e toque sedoso.",
    longDescription: "A expressão máxima do conforto e do vestuário corporativo de alta costura. O algodão egípcio possui fibras extremamente longas, o que garante a ausência de pilling (bolinhas no tecido), uma durabilidade de cor inigualável após dezenas de lavagens e uma maciez térmica que se adapta à temperatura do corpo.",
    material: "Algodão Egípcio Certificado Penteado 180g/m²",
    dimensions: "Tamanhos: PP ao XXG",
    minimumQuantity: 40,
    techniques: ["dtg", "silk"],
    colors: ["#FFFFFF", "#000000", "#475569", "#1E3A8A"],
    perspectives: [
      { id: "chest-dtg", name: "Impressão Peitoral (DTG)", technique: "dtg", description: "Impressão digital ultra-macia que respira junto com o algodão." },
      { id: "neck-silk", name: "Silk Interno na Gola", technique: "silk", description: "Etiqueta estampada na gola interna sem costura para zero atrito físico." }
    ]
  },
  {
    id: "caixa-som-waterproof",
    name: "Caixa de Som Bluetooth Impermeável",
    category: "tech",
    description: "Alto-falante portátil resistente à água IPX7, com radiador acústico passivo traseiro, bateria para 15 horas de reprodução contínua.",
    longDescription: "Sonorização rica de alta fidelidade que desafia os elementos. Ideal para ambientes de piscina, praia ou chuveiro. A grade metálica protetora frontal dispersa o áudio em 180º de forma envolvente, enquanto o acabamento emborrachado do corpo absorve impactos de quedas sem danificar o driver de áudio de alta potência.",
    material: "Poliéster Trançado Balístico e Carcaça em Polímero Antichoque",
    dimensions: "18,0 x 7,5 x 7,5 cm",
    minimumQuantity: 30,
    techniques: ["resinada", "uv"],
    colors: ["#0F172A", "#EF4444", "#1E3A8A"],
    perspectives: [
      { id: "grid-resin", name: "Etiqueta Resinada Central", technique: "resinada", description: "Aplicação central de brasão resinado flexível PU sobre a grade têxtil." },
      { id: "bottom-uv", name: "Silicone Traseiro (UV)", technique: "uv", description: "Cura UV de altíssima fixação aplicada nos comandos emborrachados." }
    ]
  },
  {
    id: "lanyard-acetinado",
    name: "Cordão Lanyard Acetinado",
    category: "eventos",
    description: "Cordão de identificação premium com toque acetinado suave, presilha jacaré reforçada, trava de segurança de rompimento rápido.",
    longDescription: "A primeira impressão de profissionalismo em convenções corporativas mundiais. Feito em poliéster acetinado duplo que desliza confortavelmente no pescoço sem provocar alergias ou pinicadas. A impressão por sublimação garante nitidez fotográfica e total fidelidade aos detalhes gráficos de texturas e logotipos complexos.",
    material: "Poliéster Acetinado Soft Premium Duplo Sólido",
    dimensions: "85 x 2 cm",
    minimumQuantity: 500,
    techniques: ["sublimacao"],
    colors: ["#F1F5F9"], // Sublimação total
    perspectives: [
      { id: "full-subli", name: "Dupla Face Digital HD", technique: "sublimacao", description: "Sublimação total frente e verso sem limite de cores ou repetições de padrão." }
    ]
  },
  {
    id: "planner-anual",
    name: "Planner Corporativo Anual",
    category: "onboarding",
    description: "Organizador anual de metas e tarefas com calendário de visão mensal, capa dura resistente em laminação fosca e wire-o metálico oculto.",
    longDescription: "O arquiteto da produtividade corporativa diária. Com divisórias mensais em papel couchê de alta gramatura com abas plastificadas, miolo completo focado em cronogramas de projetos e metas anuais. A encadernação de Wire-o oculto traz elegância ao produto, permitindo abertura estável de 360 graus.",
    material: "Capa Dura 1400g, Laminação BOPP Fosca e Papel Offset 90g",
    dimensions: "17 x 24 cm (120 folhas)",
    minimumQuantity: 80,
    techniques: ["hot_stamping", "uv"],
    colors: ["#0F172A", "#FFFFFF", "#1E293B"],
    perspectives: [
      { id: "cover-silver", name: "Capa Central (Hot Stamping)", technique: "hot_stamping", description: "Aplicação metálica prata de altíssimo contraste sobre a capa fosca." },
      { id: "inside-uv", name: "Divisória Interna (UV)", technique: "uv", description: "Verniz UV localizado brilhante sob as abas das divisórias mensais." }
    ]
  },
  {
    id: "squeeze-silicone",
    name: "Squeeze de Vidro com Luva",
    category: "lifestyle",
    description: "Garrafa de vidro borossilicato resistente a choques térmicos, tampa hermética em bambu natural com alça de transporte e luva protetora de silicone.",
    longDescription: "A pureza da hidratação sem retenção de sabor ou odores. O vidro borossilicato é extremamente durável e imune a rachaduras térmicas de choques bruscos de temperatura. A luva de silicone de alta gramatura garante proteção contra atrito e impactos laterais, além de fornecer uma pegada firme e isolamento físico.",
    material: "Vidro Borossilicato, Luva de Silicone Atóxico e Tampa de Bambu",
    dimensions: "Ø 6,8 x 23,5 cm (Capacidade: 600ml)",
    minimumQuantity: 60,
    techniques: ["laser", "silk"],
    colors: ["#09090B", "#F1F5F9", "#A855F7", "#10B981"],
    perspectives: [
      { id: "bamboo-laser", name: "Gravação na Tampa de Bambu", technique: "laser", description: "Gravação profunda queimando os veios do bambu, revelando contraste orgânico." },
      { id: "silicone-silk", name: "Impressão na Luva de Silicone", technique: "silk", description: "Silk Screen com aditivo elastômero que impede rachaduras ou descasques no silicone." }
    ]
  },
  {
    id: "base-wireless-bambu",
    name: "Base Carregadora de Bambu",
    category: "tech",
    description: "Estação de carregamento por indução (Qi Wireless) de mesa, feita inteiramente em bambu natural sustentável com cabo USB-C integrado.",
    longDescription: "A fusão perfeita da tecnologia eco-responsável com a estética escandinava. Uma peça decorativa funcional para qualquer mesa de trabalho. Os veios orgânicos do bambu tornam cada base inteiramente única no mundo. A gravação a laser queima de forma rica as fibras naturais da madeira, conferindo um cheiro leve amadeirado e aspecto artesanal impecável.",
    material: "Estrutura Externa em Bambu de Manejo Sustentável Certificado",
    dimensions: "Ø 9,0 x 0,9 cm",
    minimumQuantity: 50,
    techniques: ["laser"],
    colors: ["#E2D4B7"],
    perspectives: [
      { id: "bamboo-face", name: "Gravação Laser Orgânica", technique: "laser", description: "Laser incidindo diretamente nas fibras de madeira, criando gradações e queimas rústicas e nobres." }
    ]
  },
  {
    id: "kit-vinho-eletrico",
    name: "Kit Vinho e Saca-Rolhas Elétrico",
    category: "lifestyle",
    description: "Estojo de luxo em pinus contendo saca-rolhas elétrico recarregável por USB, cortador de lacre, bico dosador e tampa de vácuo aeradora.",
    longDescription: "Uma experiência de etiqueta e requinte corporativo. O saca-rolhas retira a rolha em menos de 8 segundos com apenas o apertar de um botão silencioso, sem necessitar de esforço ou risco de quebrar a cortiça. A caixa de madeira rústica confere um peso e solenidade imbatíveis ao presente, elevando o valor percebido de forma instantânea.",
    material: "Pinus Maciço, Aço Carbono, Polímeros e Alumínio",
    dimensions: "30 x 18 x 7 cm (Estojo)",
    minimumQuantity: 15,
    isKit: true,
    kitItems: [
      { name: "Estojo Rústico de Pinus", icon: "Box", description: "Estojo em madeira natural com dobradiças em latão envelhecido.", offset: { x: 0, y: 0 } },
      { name: "Saca-Rolhas Elétrico Recarregável", icon: "Zap", description: "Saca-rolhas in alumínio anodizado cilíndrico.", offset: { x: -60, y: 40 } },
      { name: "Bico Aerador Dosador", icon: "Flame", description: "Bico injetor que oxigena o vinho ao servir.", offset: { x: 70, y: -30 } }
    ],
    techniques: ["laser"],
    colors: ["#E7D5B8"],
    perspectives: [
      { id: "box-laser", name: "Laser na Caixa de Madeira", technique: "laser", description: "Gravação profunda carbonizando as fibras de pinus da tampa do estojo." }
    ]
  },
  {
    id: "camisa-polo-piquet",
    name: "Camisa Polo Piquet Premium",
    category: "eventos",
    description: "Camisa polo de alfaiataria em piquet de algodão com elastano, gola estruturada, peitilho duplo reforçado e acabamento anti-pilling.",
    longDescription: "O padrão definitivo para uniformização corporativa e eventos institucionais C-Level. Confeccionada com a malha piquet encorpada que preserva a estrutura e elegância ao longo do dia. O percentual sutil de elastano garante conforto físico de movimentos, enquanto o acabamento premium da malha previne encolhimento e desbotamento precoce.",
    material: "95% Algodão Penteado Premium, 5% Elastano (Piquet 220g/m²)",
    dimensions: "Tamanhos: PP ao GGG (Feminino/Masculino)",
    minimumQuantity: 30,
    techniques: ["bordado", "silk"],
    colors: ["#0F172A", "#FFFFFF", "#1E3A8A", "#15803D"],
    perspectives: [
      { id: "chest-embroidery", name: "Bordado no Peito (Alta Definição)", technique: "bordado", description: "Bordado computadorizado com linhas de alta densidade e brilho acetinado aplicado na lateral esquerda do peitoral." },
      { id: "sleeve-silk", name: "Manga Direita (Silk)", technique: "silk", description: "Estampa serigráfica minimalista de alta definição na manga." }
    ]
  },
  {
    id: "sacola-juta-premium",
    name: "Sacola de Juta com Bolso de Algodão",
    category: "lifestyle",
    description: "Sacola de feira elegante feita de juta natural biodegradável de trama fechada, bolso frontal em lona de algodão de alta gramatura e alças tubulares de algodão macio.",
    longDescription: "Uma ecobag rústica e extremamente sofisticada. A textura natural e dourada das fibras de juta contrasta com o bolso frontal liso de algodão alvejado, gerando uma háptica rica e um visual contemporâneo sustentável. Ideal para kits gourmet, eventos de prestígio ao ar livre e presentes executivos de verão.",
    material: "Fibras de Juta Natural 100% Biodegradável e Lona de Algodão Cru 280g/m²",
    dimensions: "38 x 32 x 12 cm (Bolso frontal: 24 x 20 cm)",
    minimumQuantity: 50,
    techniques: ["silk", "bordado"],
    colors: ["#E7D5B8"],
    perspectives: [
      { id: "pocket-silk", name: "Estampa no Bolso (Silk)", technique: "silk", description: "Impressão de alta textura sobre a lona lisa do bolso frontal." },
      { id: "body-embroidery", name: "Bordado na Juta", technique: "bordado", description: "Bordado de alta gramatura aplicado sobre as fibras rústicas da juta." }
    ]
  },
  {
    id: "bone-trucker-premium",
    name: "Boné Trucker Premium Estruturado",
    category: "lifestyle",
    description: "Boné estilo americano com painel frontal espumado estruturado, aba curva pespontada, traseira em tela respirável de poliéster e fecho regulador snapback.",
    longDescription: "A fusão do streetwear contemporâneo com o prestígio corporativo. Apresenta costuras internas reforçadas com viés personalizado e entretela de memória inteligente que evita amassamentos da copa. O bordado frontal tridimensional confere um relevo físico robusto e elegante de alta durabilidade.",
    material: "Frente em Sarja de Algodão 100%, Traseira em Tela de Poliéster e Snapback Regulável",
    dimensions: "Tamanho Único Regulável (Circunferência: 54 a 60 cm)",
    minimumQuantity: 40,
    techniques: ["bordado"],
    colors: ["#09090B", "#1E293B", "#1E3A8A", "#7C2D12"],
    perspectives: [
      { id: "front-embroidery", name: "Bordado Frontal 3D", technique: "bordado", description: "Bordado em alto relevo tridimensional no centro do painel frontal estruturado." }
    ]
  },
  {
    id: "faixa-cetim-decorativa",
    name: "Fita e Faixa de Cetim Corporativa",
    category: "eventos",
    description: "Rolo de fita decorativa em cetim de poliéster de altíssimo brilho com bordas seladas termicamente, perfeita para fechamento de embalagens de luxo.",
    longDescription: "O detalhe definitivo que transforma um simples pacote em uma cerimônia de desempacotamento de luxo. A fita possui toque sedoso, brilho dupla-face espetacular e altíssima estabilidade dimensional. Ideal para amarrar briefs de curadoria, caixas de onboarding, garrafas de vinho ou mimos especiais.",
    material: "Poliéster Acetinado Premium com Acabamento Calandrado de Alto Brilho",
    dimensions: "Largura: 2,5 cm (Rolo com 50 metros)",
    minimumQuantity: 10,
    techniques: ["hot_stamping", "sublimacao"],
    colors: ["#FFFFFF", "#000000", "#1E3A8A", "#B45309"],
    perspectives: [
      { id: "ribbon-stamping", name: "Hot Stamping Dourado", technique: "hot_stamping", description: "Logomarca gravada em películas douradas brilhantes repetidas a cada 20cm ao longo do rolo." }
    ]
  },
  {
    id: "avental-sarja-gourmet",
    name: "Avental Gourmet de Sarja e Couro",
    category: "lifestyle",
    description: "Avental gastronômico estilo barista em sarja de algodão encorpada, alças cruzadas nas costas com regulagem em metal envelhecido, bolso utilitário duplo e detalhes em couro legítimo.",
    longDescription: "Design refinado para ações de hospitalidade, churrascos executivos e eventos gastronômicos. O sistema de alças cruzadas (cross-back) distribui o peso igualmente nos ombros, evitando fadiga na nuca. Os reforços de costuras em pontos de estresse com rebites metálicos envelhecidos conferem uma estética industrial luxuosa e eterna.",
    material: "Sarja 100% Algodão de Alta Gramatura (280g/m²) e Couro Bovino Legítimo",
    dimensions: "85 x 68 cm (Ajustável)",
    minimumQuantity: 20,
    techniques: ["bordado", "laser"],
    colors: ["#27272A", "#451A03", "#0F172A"],
    perspectives: [
      { id: "apron-pocket", name: "Bordado no Bolso", technique: "bordado", description: "Logomarca bordada com alta contagem de pontos no bolso utilitário." },
      { id: "leather-patch", name: "Laser no Aplique de Couro", technique: "laser", description: "Gravação permanente por laser em tag de couro bovino natural rebitada no peito do avental." }
    ]
  }
];
