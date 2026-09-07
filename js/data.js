/* ==========================================================================
   BeautyConnect — dados e camada de persistência
   Em produção isso viraria chamadas a uma API. Por enquanto, guardamos os
   profissionais cadastrados no localStorage e mesclamos com um catálogo
   de exemplo, para o site já nascer com conteúdo real na tela.
   ========================================================================== */

const STORAGE_KEY = "beautyconnect:profissionais";

const CATEGORIAS = [
  { id: "maquiagem", label: "Maquiagem", icone: "maquiagem" },
  { id: "manicure", label: "Manicure", icone: "manicure" },
  { id: "sobrancelhas", label: "Sobrancelhas", icone: "sobrancelha" },
  { id: "cilios", label: "Cílios", icone: "cilios" },
  { id: "cabelo", label: "Cabeleireiros", icone: "cabelo" },
];

// Catálogo de exemplo — some profissionais para o marketplace não nascer vazio.
const PROFISSIONAIS_EXEMPLO = [
  {
    id: "p1",
    nome: "Clara Inara",
    categoria: "maquiagem",
    cidade: "Bela Vista, MS",
    foto: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1600&auto=format&fit=crop",
    nota: 4.9,
    avaliacoes: 132,
    whatsapp: "5567999990001",
    bio: "Maquiadora profissional iniciante, especialista em jovens. Atendo em domicílio ou no meu estúdio na região central.",
    servicos: [
      { nome: "Maquiagem social", preco: 130 },
      { nome: "Maquiagem para noiva", preco: 420 },
      { nome: "Maquiagem + penteado", preco: 220 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [
      { autor: "Juliana R.", texto: "A Clara fez minha make de casamento e ficou impecável o dia todo.", nota: 5 },
      { autor: "Fernanda A.", texto: "Super pontual e capricho em cada detalhe.", nota: 5 },
    ],
  },
  {
    id: "p2",
    nome: "Larissa Nogueira",
    categoria: "manicure",
    cidade: "Campo Grande, MS",
    foto: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1600&auto=format&fit=crop",
    nota: 4.8,
    avaliacoes: 89,
    whatsapp: "5567999990002",
    bio: "Especialista em unhas em gel e nail art. Atendimento em domicílio com todo material esterilizado individualmente.",
    servicos: [
      { nome: "Mão + esmaltação em gel", preco: 70 },
      { nome: "Pé + mão completo", preco: 110 },
      { nome: "Nail art (por unha)", preco: 8 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [
      { autor: "Patrícia M.", texto: "Trabalho lindo e muito cuidado com a higiene.", nota: 5 },
    ],
  },
  {
    id: "p3",
    nome: "Bianca Souza",
    categoria: "sobrancelhas",
    cidade: "Dourados, MS",
    foto: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600&auto=format&fit=crop",
    nota: 4.7,
    avaliacoes: 54,
    whatsapp: "5567999990003",
    bio: "Design de sobrancelhas com henna e micropigmentação leve. Foco em realçar o formato natural do olhar.",
    servicos: [
      { nome: "Design com henna", preco: 45 },
      { nome: "Design + pinça", preco: 35 },
      { nome: "Micropigmentação leve", preco: 180 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [
      { autor: "Renata C.", texto: "Melhor design de sobrancelha que já fiz na cidade.", nota: 5 },
    ],
  },
  {
    id: "p4",
    nome: "Débora Lima",
    categoria: "cilios",
    cidade: "Campo Grande, MS",
    foto: "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1600&auto=format&fit=crop",
    nota: 5.0,
    avaliacoes: 41,
    whatsapp: "5567999990004",
    bio: "Extensão de cílios fio a fio e volume russo. Materiais importados e manutenção quinzenal.",
    servicos: [
      { nome: "Volume russo", preco: 140 },
      { nome: "Fio a fio", preco: 110 },
      { nome: "Manutenção", preco: 70 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512207736890-6ffd4d4926c8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [
      { autor: "Ana Paula S.", texto: "Fiz o volume russo e durou mais de 3 semanas perfeito.", nota: 5 },
    ],
  },
  {
    id: "p5",
    nome: "Rafael Costa",
    categoria: "cabelo",
    cidade: "Campo Grande, MS",
    foto: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop",
    nota: 4.9,
    avaliacoes: 76,
    whatsapp: "5567999990005",
    bio: "Cabeleireiro especializado em cortes modernos, coloração e tratamentos capilares. Estúdio próprio no Bairro Amambaí.",
    servicos: [
      { nome: "Corte + escova", preco: 90 },
      { nome: "Coloração completa", preco: 250 },
      { nome: "Hidratação profunda", preco: 80 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [
      { autor: "Marcos V.", texto: "Melhor corte masculino que já fiz, virei cliente fixo.", nota: 5 },
    ],
  },
  {
    id: "p6",
    nome: "Isabela Martins",
    categoria: "maquiagem",
    cidade: "Dourados, MS",
    foto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    capa: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop",
    nota: 4.6,
    avaliacoes: 23,
    whatsapp: "5567999990006",
    bio: "Iniciando na área com muito carinho por cada cliente. Especialidade em make natural para o dia a dia.",
    servicos: [
      { nome: "Maquiagem natural", preco: 60 },
      { nome: "Maquiagem para festa", preco: 100 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=800&auto=format&fit=crop",
    ],
    depoimentos: [],
  },
];

function carregarProfissionais() {
  const salvos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return [...salvos, ...PROFISSIONAIS_EXEMPLO];
}

function salvarProfissional(profissional) {
  const salvos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  salvos.unshift(profissional);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salvos));
}

function buscarProfissionalPorId(id) {
  return carregarProfissionais().find((p) => p.id === id);
}

function categoriaLabel(id) {
  const cat = CATEGORIAS.find((c) => c.id === id);
  return cat ? cat.label : id;
}
