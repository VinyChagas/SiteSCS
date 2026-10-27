/**
 * Configuração centralizada — SCS Contabilidade
 * Altere os flags e conteúdos aqui para publicar seções quando validados.
 */
window.SCS_CONFIG = {
  showTeamSection: false,
  showTestimonials: false,
  showEnglish: false,
  /** Seção do app removida das páginas; links/assets mantidos para reativação futura. */
  showAppSection: false,

  whatsapp: {
    number: "5541997512925",
    defaultText: "Olá, gostaria de atendimento sobre serviços contábeis!",
  },

  phone: {
    display: "(41) 3015-9480",
    href: "tel:+554130159480",
  },

  login: {
    url: "https://vip.acessorias.com/scsassessoriaempresarial",
    label: "Login",
  },

  app: {
    googlePlay: "https://play.google.com/store/apps/details?id=com.scsassessoriaempresarial",
    appStore: "https://linktr.ee/scscontabilidade",
    qrCode: "images/qrcode.png",
    screenshot: "images/app.png",
  },

  address: {
    street: "Rua Major Vicente de Castro, 3146",
    district: "Fanny",
    city: "Curitiba/PR",
    zip: "81030-020",
    mapsQuery:
      "R. Major Vicente de Castro, 3146 - Fanny, Curitiba - PR, 81030-020",
    mapsEmbed:
      "https://www.google.com/maps?q=R.%20Major%20Vicente%20de%20Castro,%203146%20-%20Fanny,%20Curitiba%20-%20PR,%2081030-020&output=embed",
    mapsLink:
      "https://www.google.com/maps?q=R.%20Major%20Vicente%20de%20Castro,%203146%20-%20Fanny,%20Curitiba%20-%20PR,%2081030-020",
  },

  /** Horário de atendimento — oficialmente aprovado. */
  hours: {
    short: "Seg–Qui: 07:00–18:00 · Sex: 08:00–17:00",
    lines: [
      "Segunda a quinta: 07:00 às 18:00",
      "Sexta: 08:00 às 17:00",
    ],
  },

  company: {
    name: "SCS Assessoria Empresarial e Contábil",
    cnpj: "00.363.320/0001-06",
    crc: "CRC-PR 069.485/O-8",
    founded: 1995,
  },

  /**
   * Métricas institucionais — só entram no DOM se approved === true.
   * Atualizado com dados oficialmente confirmados (out/2026).
   */
  metrics: [
    {
      id: "years",
      approved: true,
      value: "Mais de 30 anos",
      label: "De contabilidade, desde 1995",
      source: "aprovado",
    },
    {
      id: "clients-active",
      approved: true,
      value: "+450",
      label: "Clientes ativos",
      source: "aprovado",
    },
    {
      id: "response-15min",
      approved: true,
      value: "15 min",
      label: "Tempo médio de resposta no horário comercial",
      source: "aprovado",
    },
  ],

  /** Dados de equipe — preencher e ativar showTeamSection */
  team: [
    { name: "", role: "Departamento fiscal", photo: "" },
    { name: "", role: "Departamento pessoal", photo: "" },
    { name: "", role: "Contábil", photo: "" },
  ],

  /** Depoimentos — preencher e ativar showTestimonials */
  testimonials: [],
};
