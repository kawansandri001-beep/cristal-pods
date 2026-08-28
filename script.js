const productsGrid = document.getElementById("products-grid");
const productModal = document.getElementById("product-modal");
const productModalBackdrop = document.getElementById("product-modal-backdrop");
const productModalClose = document.getElementById("product-modal-close");
const productModalTitle = document.getElementById("product-modal-title");
const productModalBrand = document.getElementById("product-modal-brand");
const productModalPrice = document.getElementById("product-modal-price");
const productModalDescription = document.getElementById("product-modal-description");
const productGalleryImage = document.getElementById("product-gallery-image");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const galleryDots = document.getElementById("gallery-dots");
const productFlavorList = document.getElementById("product-flavor-list");
const productAddFirst = document.getElementById("product-add-first");

const orderPanel = document.getElementById("order-panel");
const orderOverlay = document.getElementById("order-overlay");
const orderClose = document.getElementById("order-close");
const orderList = document.getElementById("order-list");
const orderCount = document.getElementById("order-count");
const checkoutButton = document.getElementById("checkout-button");
const mobileOrderTrigger = document.getElementById("mobile-order-trigger");
const mobileOrderCount = document.getElementById("mobile-order-count");
const toastStack = document.getElementById("toast-stack");
const paymentMethods = Array.from(document.querySelectorAll("[data-payment]"));
const paymentWarning = document.getElementById("payment-warning");
const deliveryMethodsBox = document.getElementById("delivery-methods");
const deliveryOptions = Array.from(document.querySelectorAll("[data-delivery]"));
const deliveryWarning = document.getElementById("delivery-warning");
const deliveryForm = document.getElementById("delivery-form");
const deliveryFormWarning = document.getElementById("delivery-form-warning");
const deliveryAddress = document.getElementById("delivery-address");
const deliveryNeighborhood = document.getElementById("delivery-neighborhood");
const deliveryReference = document.getElementById("delivery-reference");
const INVENTORY_STORAGE_KEY = "cristal-pods-inventory";
const whatsappBase = "https://wa.me/557588442493?text=";
const DELIVERY_FEE = 10;

const cartItems = [];
let selectedPayment = "";
let selectedDelivery = "";
let activeProductModel = "";
let activeGalleryIndex = 0;

const defaultInventory = {
  "ICE KING UVA": {
    brand: "ICE KING",
    price: 139.9,
    flavors: {
      "Uva Ice": 0
    }
  },
  "ICE KING TIGER BLOOD": {
    brand: "ICE KING",
    price: 139.9,
    flavors: {
      "Tiger Blood": 0
    }
  },
  "ICE KING NEW TWIST": {
    brand: "ICE KING",
    price: 139.9,
    flavors: {
      "Neon Twist": 0
    }
  },
  "ELF BAR BC 45K GRAPE TWIST": {
    brand: "ELF BAR",
    price: 159.9,
    flavors: {
      "GRAPE TWIST": 0
    }
  },
  "ELF BAR BC 45K GREEN APPLE ICE": {
    brand: "ELF BAR",
    price: 159.9,
    flavors: {
      "GREEN APPLE ICE": 1
    }
  },
  "ELF BAR BC 45K WATERMELON ICE": {
    brand: "ELF BAR",
    price: 159.9,
    flavors: {
      "WATERMELON ICE": 1
    }
  },
  "BC 10000 TOUCH COCONUT BANANA": {
    brand: "ELF BAR",
    price: 99.9,
    flavors: {
      "COCONUT BANANA": 0
    }
  },
  "V155 BANANA ICE ULTRA SLIM": {
    brand: "IGNITE",
    price: 95,
    flavors: {
      "BANANA ICE": 1
    }
  },
  "V155 ULTRA SLIM STRABERRY KIWI": {
    brand: "IGNITE",
    price: 95,
    flavors: {
      "STRABERRY KIWI": 0
    }
  },
  "V155 ULTRA SLIM WATERMELON MIX": {
    brand: "IGNITE",
    price: 95,
    flavors: {
      "WATERMELON MIX": 1
    }
  },
  "V155 ULTRA SLIM ICY MINT": {
    brand: "IGNITE",
    price: 95,
    flavors: {
      "ICY MINT": 1
    }
  },
  "V400MIX GRAPE ICE// STRABERRY": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "GRAPE ICE // STRABERRY": 2
    }
  },
  "V400 MIX APPLE ICE// STRABERRY WATERMELON": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "APPLE ICE // STRABERRY WATERMELON": 0
    }
  },
  "V400 MIX PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON": 1
    }
  },
  "V400 MIX ICY MINT / PEACH GRAPE": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "ICY MINT / PEACH GRAPE": 0
    }
  },
  "NIK BAR 12K CRYSTAL 12.000 PUFFS": {
    brand: "NIK BAR",
    price: 99.9,
    flavors: {
      "SOUR APPLE ICE": 0
    }
  },
  "NIK BAR 12K SPEARMINT CRYSTAL 12.000 PUFFS": {
    brand: "NIK BAR",
    price: 99.9,
    flavors: {
      "SPEARMINT": 1
    }
  },
  "NIK BAR 12K STONE FREEZE CRYSTAL 12.000 PUFFS": {
    brand: "NIK BAR",
    price: 99.9,
    flavors: {
      "STONE FREEZE": 1
    }
  },
  "WE FUME STRAWBERRY BANANA 30.000 PUFFS": {
    brand: "WE FUME",
    price: 80,
    flavors: {
      "STRAWBERRY BANANA": 0
    }
  },
  "WE FUME ICE MINT 30.000 PUFFS": {
    brand: "WE FUME",
    price: 80,
    flavors: {
      "ICE MINT": 0
    }
  },
  "VNANO CHERRY LEMONADE": {
    brand: "IGNITE",
    price: 40,
    flavors: {
      "CHERRY LEMONADE": 2
    }
  },
  "VNANO GRAPE ICE": {
    brand: "IGNITE",
    price: 40,
    flavors: {
      "GRAPE ICE": 2
    }
  },
  "VNANO TROPICAL FRUIT": {
    brand: "IGNITE",
    price: 40,
    flavors: {
      "TROPICAL FRUIT": 2
    }
  },
  "NIKBAR 30K": {
    brand: "NIKBAR",
    price: 120,
    flavors: {
      "Morango e Kiwi": 0,
      "Icy Mint": 0,
      "Melancia Ice": 0
    }
  },
  "VNANO": {
    brand: "IGNITE",
    price: 60,
    flavors: {
      "Maca Verde": 0,
      "Uva Ice": 0,
      "Frutas Tropicais": 0,
      "Limonada de Cereja": 0,
      "Morango Ice": 0
    }
  },
  "IGNITE V155": {
    brand: "IGNITE",
    price: 120,
    flavors: {
      "Menta Ice": 0
    }
  },
  "V80 IGNITE": {
    brand: "IGNITE",
    price: 110,
    flavors: {
      "Morango Gelado": 0,
      "Menta Ice": 0
    }
  },
  "IGNITE MIX 40.000 PUFFS": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "Apple Ice + Strawberry Watermelon": 0,
      "Watermelon Ice + Cherry Ice": 0,
      "Banana Ice + Strawberry Ice": 0,
      "Passion Fruit Sour Kiwi + Pineapple Ice": 0,
      "Icy Mint + Peach Grape": 0
    }
  },
  "ELFBAR DUKE 35K": {
    brand: "ELFBAR",
    price: 135,
    flavors: {
      "Ice Menta": 0,
      "Melancia Ice": 0
    }
  },
  "ELFBAR 10K": {
    brand: "ELFBAR",
    price: 100,
    flavors: {
      "Uva Ice": 0,
      "Abacaxi Morango Banana": 0,
      "Melancia": 0
    }
  },
  "ELFBAR 45K PUFFS": {
    brand: "ELFBAR",
    price: 160,
    flavors: {
      "Abacaxi com Hortela": 0
    }
  },
  "LIFE POD POWER BANK": {
    brand: "LIFE POD",
    price: 130,
    flavors: {
      "LOVE 66": 0,
      "METHOL": 0,
      "BANANA": 0,
      "GRAPE HONEY": 0
    }
  },
  "REFIL LIFE POD ECO II 10K PUFFS": {
    brand: "LIFE POD",
    price: 90,
    flavors: {
      "CHERRY LIME ICE": 0,
      "BANANA ICE": 0,
      "GRAPE HONEY": 0,
      "CHERRY ICE": 0
    }
  }
};

const productCatalog = {
  "ICE KING UVA": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ICE KING UVA/imagem pod.jpg",
    gallery: [
      "./IMAGENS/ICE KING UVA/imagem pod.jpg",
      "./IMAGENS/ICE KING UVA/imagem caixa.jpg",
      "./IMAGENS/ICE KING UVA/06f71ba0ad752cc625f870f15a07c5b5.jpg"
    ],
    description: "Modelo Ice King com visual premium, acabamento moderno e perfil gelado de uva para quem busca sabor marcante e puxada intensa."
  },
  "ICE KING TIGER BLOOD": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ice king tiger blood/images (2).jpg",
    gallery: [
      "./IMAGENS/ice king tiger blood/images (2).jpg",
      "./IMAGENS/ice king tiger blood/images.jpg",
      "./IMAGENS/ice king tiger blood/80905f3dc51602b70f9e8c423aa55c19.jpg"
    ],
    description: "Sabor Tiger Blood com mistura marcante de morango, coco e melancia, em um modelo Ice King de alta duracao e puxada intensa."
  },
  "ICE KING NEW TWIST": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ice king new twist/fundo branco.png",
    gallery: [
      "./IMAGENS/ice king new twist/fundo branco.png",
      "./IMAGENS/ice king new twist/images.jpg",
      "./IMAGENS/ice king new twist/0b01fe22ac2eab3d17d12ea05d6e47bb.jpg"
    ],
    description: "Sabor Neon Twist com perfil frutado, refrescante e marcante, em um modelo Ice King 40K de alta duracao, vapor suave e desempenho premium."
  },
  "ELF BAR BC 45K GRAPE TWIST": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/grape twist/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/grape twist/IMAGEM 1.png",
      "./IMAGENS/grape twist/imagem 2.jpg",
      "./IMAGENS/grape twist/IMAGEM 3.jpg"
    ],
    description: "Sabor GRAPE TWIST com chiclete de uva adocicado e perfil nostalgico, em um modelo Elf Bar BC de 45.000 puffs."
  },
  "ELF BAR BC 45K GREEN APPLE ICE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/gren aple/imagem 1.png",
    gallery: [
      "./IMAGENS/gren aple/imagem 1.png",
      "./IMAGENS/gren aple/IMAGME 2.png",
      "./IMAGENS/gren aple/IMAGEM 3.png"
    ],
    description: "Sabor GREEN APPLE ICE com perfil de maca verde gelada, refrescante e marcante, em um modelo Elf Bar BC de 45.000 puffs."
  },
  "ELF BAR BC 45K WATERMELON ICE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/BC 45K WATERMELON ICE/imagem 1.png",
    gallery: [
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 1.png",
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 2.png",
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 3.png"
    ],
    description: "Sabor WATERMELON ICE com perfil refrescante de melancia gelada, em um modelo Elf Bar BC de 45.000 puffs com visual premium."
  },
  "BC 10000 TOUCH COCONUT BANANA": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/Banana coconout/imagem 1.png",
    gallery: [
      "./IMAGENS/Banana coconout/imagem 1.png",
      "./IMAGENS/Banana coconout/imagem 2.png",
      "./IMAGENS/Banana coconout/imagem 3.png"
    ],
    description: "Sabor COCONUT BANANA com perfil cremoso e tropical, combinando coco e banana em um modelo pratico de 10.000 puffs."
  },
  "V155 BANANA ICE ULTRA SLIM": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/v155 banana ice/imagem 1.png",
    gallery: [
      "./IMAGENS/v155 banana ice/imagem 1.png",
      "./IMAGENS/v155 banana ice/imagem 2.png",
      "./IMAGENS/v155 banana ice/imagem 3.png"
    ],
    description: "Modelo V155 Ultra Slim com 15.500 puffs e sabor BANANA ICE, trazendo puxada gelada, formato fino e visual premium."
  },
  "V155 ULTRA SLIM STRABERRY KIWI": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V155 MORANGO KIWI/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 1.png",
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 2.png",
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 3.jpeg"
    ],
    description: "Modelo V155 Ultra Slim com 15.500 puffs e sabor STRABERRY KIWI, unindo perfil frutado marcante, formato fino e visual premium."
  },
  "V155 ULTRA SLIM WATERMELON MIX": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V155 WATERMELON MIX/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 1.png",
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 2.png",
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 3.jpeg"
    ],
    description: "Modelo V155 Ultra Slim com 15.500 puffs e sabor WATERMELON MIX, trazendo perfil refrescante, formato fino e visual premium."
  },
  "V155 ULTRA SLIM ICY MINT": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V155 SLIM MENTA ICE/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/V155 SLIM MENTA ICE/IMAGEM 1.png",
      "./IMAGENS/V155 SLIM MENTA ICE/IMAGEM 2.png",
      "./IMAGENS/V155 SLIM MENTA ICE/IMAGEM 3.jpeg"
    ],
    description: "Modelo V155 Ultra Slim com 15.500 puffs e sabor ICY MINT, trazendo refrescancia intensa, formato fino e visual premium."
  },
  "V400MIX GRAPE ICE// STRABERRY": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 1.png",
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 2.png",
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 3.png"
    ],
    description: "Modelo V400MIX com proposta premium, alta autonomia e sabor GRAPE ICE // STRABERRY para quem busca puxada marcante e visual moderno."
  },
  "V400 MIX APPLE ICE// STRABERRY WATERMELON": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 1.png",
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 2.png",
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 3.png"
    ],
    description: "Modelo V400 MIX com proposta premium, alta autonomia e sabor APPLE ICE // STRABERRY WATERMELON para quem busca puxada marcante e visual moderno."
  },
  "V400 MIX PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGEM 1.png",
      "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGME 2.png"
    ],
    description: "Modelo V400 MIX com proposta premium, alta autonomia e sabor PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON para quem busca puxada marcante e visual moderno."
  },
  "V400 MIX ICY MINT / PEACH GRAPE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 1.png",
    gallery: [
      "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 1.png",
      "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 2.png"
    ],
    description: "Modelo V400 MIX com proposta premium, alta autonomia e sabor ICY MINT / PEACH GRAPE para quem busca puxada refrescante e visual moderno."
  },
  "NIK BAR 12K CRYSTAL 12.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/imagem1.png",
    gallery: [
      "./IMAGENS/imagem1.png",
      "./IMAGENS/nik bar aple ice/imagem 2.png"
    ],
    description: "Modelo NIK BAR Crystal com 12.000 puffs e sabor SOUR APPLE ICE, trazendo perfil gelado de maca verde, visual premium e puxada marcante."
  },
  "NIK BAR 12K SPEARMINT CRYSTAL 12.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/nik bar 12k spearmint/imagem 1.png",
    gallery: [
      "./IMAGENS/nik bar 12k spearmint/imagem 1.png",
      "./IMAGENS/nik bar 12k spearmint/IMAGEM 2.png"
    ],
    description: "Modelo NIK BAR Crystal com 12.000 puffs e sabor SPEARMINT, trazendo refrescancia intensa, visual premium e puxada marcante."
  },
  "NIK BAR 12K STONE FREEZE CRYSTAL 12.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/stone freeze/imagem 1.png",
    gallery: [
      "./IMAGENS/stone freeze/imagem 1.png",
      "./IMAGENS/stone freeze/imagem 2.png",
      "./IMAGENS/stone freeze/imagem 3.png"
    ],
    description: "Modelo NIK BAR Crystal com 12.000 puffs e sabor STONE FREEZE, trazendo perfil gelado marcante, visual premium e puxada intensa."
  },
  "WE FUME STRAWBERRY BANANA 30.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/we fume morango banana/imagem 1.png",
    gallery: [
      "./IMAGENS/we fume morango banana/imagem 1.png"
    ],
    description: "Modelo WE FUME com 30.000 puffs e sabor STRAWBERRY BANANA, trazendo perfil doce e frutado, alta duracao e puxada marcante."
  },
  "WE FUME ICE MINT 30.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/we fume morango banana/we fume de menta.png",
    gallery: [
      "./IMAGENS/we fume morango banana/we fume de menta.png"
    ],
    description: "Modelo WE FUME com 30.000 puffs e sabor ICE MINT, trazendo refrescancia intensa, alta duracao e puxada marcante."
  },
  "VNANO CHERRY LEMONADE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/VNANO/CHERRY LEMONADE.png",
    gallery: [
      "./IMAGENS/VNANO/CHERRY LEMONADE.png"
    ],
    description: "Modelo VNANO com 1.000 puffs e sabor CHERRY LEMONADE, trazendo perfil doce e citrico em um formato compacto e pratico."
  },
  "VNANO GRAPE ICE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/VNANO/GRAPE ICE.png",
    gallery: [
      "./IMAGENS/VNANO/GRAPE ICE.png"
    ],
    description: "Modelo VNANO com 1.000 puffs e sabor GRAPE ICE, trazendo perfil gelado de uva em um formato compacto e pratico."
  },
  "VNANO TROPICAL FRUIT": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/VNANO/TROPICAL FRUIT.png",
    gallery: [
      "./IMAGENS/VNANO/TROPICAL FRUIT.png"
    ],
    description: "Modelo VNANO com 1.000 puffs e sabor TROPICAL FRUIT, trazendo perfil frutado marcante em um formato compacto e pratico."
  },
  "NIKBAR 30K": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/NIKBAR30K.png",
    gallery: [
      "./IMAGENS/NIKBAR30K.png",
      "./IMAGENS/ab5993c9-300c-407d-b4bd-b1c6df4dd49a.png",
      "./IMAGENS/nikbar sem fundo.png"
    ],
    description: "Pod de 30.000 puffs com pegada premium, visual moderno e sabores gelados para quem busca intensidade."
  },
  "VNANO": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/VNANO PRO.webp",
    gallery: [
      "./IMAGENS/VNANO PRO.webp",
      "./IMAGENS/VNANO IGNITE.png",
      "./IMAGENS/IGNITE.png"
    ],
    description: "Modelo compacto e facil de usar, com 1.000 puffs e sabores para o dia a dia."
  },
  "IGNITE V155": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/V155.png",
    gallery: [
      "./IMAGENS/V155.png",
      "./IMAGENS/V155 IGNITE.png",
      "./IMAGENS/v155v.png"
    ],
    description: "Modelo ultrafino da Ignite com bateria recarregavel, puxada forte e acabamento premium."
  },
  "V80 IGNITE": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/v80.png",
    gallery: [
      "./IMAGENS/v80.png",
      "./IMAGENS/V80 IGNITE.png",
      "./IMAGENS/v80.png"
    ],
    description: "V80 com 8.000 puffs e formato premium. Hoje aparece apenas para consulta, sem estoque disponivel."
  },
  "IGNITE MIX 40.000 PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/IGNITE MIX.png",
    gallery: [
      "./IMAGENS/IGNITE MIX.png",
      "./IMAGENS/IGNITE.png",
      "./IMAGENS/IGNITE SEM FUNDO.png"
    ],
    description: "Modelo high-capacity com combinacoes de sabores e foco em longa duracao."
  },
  "ELFBAR DUKE 35K": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ELFBAR DUKE 35K.png",
    gallery: [
      "./IMAGENS/ELFBAR DUKE 35K.png",
      "./IMAGENS/ELFBAR DUK.png",
      "./IMAGENS/ELFBAR.png"
    ],
    description: "Duke com 35.000 puffs, bateria recarregavel e sabor intenso do inicio ao fim."
  },
  "ELFBAR 10K": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ELFBAR 10K.png",
    gallery: [
      "./IMAGENS/ELFBAR 10K.png",
      "./IMAGENS/10K PUFFS ELFBAR.png",
      "./IMAGENS/ELFBAR.png"
    ],
    description: "Versao compacta da Elfbar com 10.000 puffs. Hoje sem estoque disponivel."
  },
  "ELFBAR 45K PUFFS": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/ELF BAR 45K.png",
    gallery: [
      "./IMAGENS/ELF BAR 45K.png",
      "./IMAGENS/ELFBAR 45K PUFFS.png",
      "./IMAGENS/ELFBAR.png"
    ],
    description: "Modelo de 45.000 puffs com alta autonomia e visual moderno."
  },
  "LIFE POD POWER BANK": {
    category: "Pods descartaveis",
    cover: "./IMAGENS/LIFE POD COM POWER BANK.jpeg",
    gallery: [
      "./IMAGENS/LIFE POD COM POWER BANK.jpeg",
      "./IMAGENS/LIFE POD.png",
      "./IMAGENS/LIFE POD COM POWER BANK.jpeg"
    ],
    description: "Life Pod com Power Bank, pensado para mais praticidade, recarga e autonomia no dia a dia."
  },
  "REFIL LIFE POD ECO II 10K PUFFS": {
    category: "Refis",
    cover: "./IMAGENS/REFIL LIFE POD.jpeg",
    gallery: [
      "./IMAGENS/REFIL LIFE POD.jpeg",
      "./IMAGENS/LIFE POD.png",
      "./IMAGENS/REFIL LIFE POD.jpeg"
    ],
    description: "Refil Eco II com 10.000 puffs e sabores em quantidades limitadas."
  }
};

let inventoryState = deepClone(defaultInventory);
saveInventoryState();

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadInventoryState() {
  try {
    const saved = window.localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!saved) {
      return deepClone(defaultInventory);
    }

    const parsed = JSON.parse(saved);
    return mergeInventory(parsed);
  } catch {
    return deepClone(defaultInventory);
  }
}

function mergeInventory(source) {
  const merged = deepClone(defaultInventory);

  Object.entries(source || {}).forEach(([model, config]) => {
    if (!merged[model]) {
      return;
    }

    const nextPrice = Number(config.price);
    merged[model].price = Number.isFinite(nextPrice) ? nextPrice : merged[model].price;

    Object.entries(config.flavors || {}).forEach(([flavor, qty]) => {
      if (!(flavor in merged[model].flavors)) {
        return;
      }

      const nextQty = Number(qty);
      merged[model].flavors[flavor] = Number.isFinite(nextQty) ? Math.max(0, Math.floor(nextQty)) : merged[model].flavors[flavor];
    });
  });

  return merged;
}

function saveInventoryState() {
  window.localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventoryState));
}

function formatPrice(value) {
  return `R$${Number(value).toFixed(2).replace(".", ",")}`;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getStock(model, flavor) {
  return inventoryState[model]?.flavors?.[flavor] ?? 0;
}

function getTotalStock(model) {
  return Object.values(inventoryState[model]?.flavors || {}).reduce((total, qty) => total + qty, 0);
}

function getCartQuantity(model, flavor) {
  const item = cartItems.find((entry) => entry.model === model && entry.flavor === flavor);
  return item ? item.quantity : 0;
}

function getAvailableProducts() {
  return Object.keys(productCatalog)
    .filter((model) => inventoryState[model])
    .sort((a, b) => {
      const aStock = getTotalStock(a);
      const bStock = getTotalStock(b);
      if ((aStock > 0) !== (bStock > 0)) {
        return bStock - aStock;
      }
      return a.localeCompare(b, "pt-BR");
    });
}

function showToast(message) {
  if (!toastStack) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastStack.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("is-exit");
    window.setTimeout(() => toast.remove(), 220);
  }, 1800);
}

function renderProducts() {
  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = getAvailableProducts().filter((model) => getTotalStock(model) > 0).map((model) => {
    const meta = productCatalog[model];
    const config = inventoryState[model];
    const totalStock = getTotalStock(model);
    const availableLabel = totalStock > 0 ? `${totalStock} unidades disponiveis` : "Indisponivel";

    return `
      <article class="product-card ${totalStock <= 0 ? "is-unavailable" : ""}" data-model="${model}">
        <div class="product-thumb">
          <img src="${meta.cover}" alt="${model}">
        </div>
        <div class="product-meta">
          <span class="product-category">${meta.category}</span>
          <h3>${model}</h3>
          <p class="product-excerpt">${meta.description}</p>
          <span class="stock-label ${totalStock <= 0 ? "is-out" : ""}">${availableLabel}</span>
          <div class="product-card-footer">
            <strong class="product-price">${totalStock > 0 ? formatPrice(config.price) : "Indisponivel"}</strong>
            <button class="product-open-button" type="button" data-open-product="${model}">
              ${totalStock > 0 ? "Ver produto" : "Consultar"}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  Array.from(document.querySelectorAll("[data-open-product]")).forEach((button) => {
    button.addEventListener("click", () => openProductModal(button.dataset.openProduct || ""));
  });
}

function openProductModal(model) {
  const meta = productCatalog[model];
  const config = inventoryState[model];

  if (!meta || !config || !productModal) {
    return;
  }

  activeProductModel = model;
  activeGalleryIndex = 0;
  renderProductModal();
  productModal.hidden = false;
  document.body.classList.add("cart-open");
}

function closeProductModal() {
  if (!productModal) {
    return;
  }

  productModal.hidden = true;
  activeProductModel = "";
  document.body.classList.remove("cart-open");
}

function renderProductModal() {
  const meta = productCatalog[activeProductModel];
  const config = inventoryState[activeProductModel];

  if (!meta || !config) {
    return;
  }

  const gallery = meta.gallery || [meta.cover];
  const currentImage = gallery[activeGalleryIndex] || gallery[0];
  productModalBrand.textContent = `${config.brand} • ${meta.category}`;
  productModalTitle.textContent = activeProductModel;
  productModalPrice.textContent = getTotalStock(activeProductModel) > 0 ? formatPrice(config.price) : "Indisponivel";
  productModalDescription.textContent = meta.description;
  if (productGalleryImage) {
    productGalleryImage.src = currentImage;
    productGalleryImage.alt = activeProductModel;
  }

  galleryDots.innerHTML = gallery.map((_, index) => `
    <button
      class="gallery-dot ${index === activeGalleryIndex ? "is-active" : ""}"
      type="button"
      data-gallery-index="${index}"
      aria-label="Ver slide ${index + 1}"
    ></button>
  `).join("");

  Array.from(galleryDots.querySelectorAll("[data-gallery-index]")).forEach((dot) => {
    dot.addEventListener("click", () => {
      activeGalleryIndex = Number(dot.dataset.galleryIndex);
      renderProductModal();
    });
  });

  const flavorEntries = Object.entries(config.flavors);
  if (!flavorEntries.length) {
    productFlavorList.innerHTML = `
      <div class="flavor-chip is-sold-out" aria-disabled="true" tabindex="-1">
        Aguardando sabores e estoque
      </div>
    `;
    productAddFirst.disabled = true;
    productAddFirst.textContent = "Aguardando sabores";
    productAddFirst.onclick = null;
    return;
  }

  productFlavorList.innerHTML = flavorEntries.map(([flavor, qty]) => {
    const isSoldOut = qty <= 0;
    return `
      <button
        class="flavor-chip ${isSoldOut ? "is-sold-out" : ""}"
        type="button"
        data-modal-flavor="${flavor}"
        ${isSoldOut ? "aria-disabled=\"true\" tabindex=\"-1\"" : ""}
      >
        ${isSoldOut ? `${flavor} • Indisponivel` : `${flavor} • ${qty} un`}
      </button>
    `;
  }).join("");

  Array.from(productFlavorList.querySelectorAll("[data-modal-flavor]")).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("is-sold-out")) {
        return;
      }
      addFlavorToCart(activeProductModel, button.dataset.modalFlavor || "");
    });
  });

  const firstAvailableFlavor = flavorEntries.find(([, qty]) => qty > 0)?.[0] || "";
  productAddFirst.disabled = !firstAvailableFlavor;
  productAddFirst.textContent = firstAvailableFlavor ? "Pedir ja" : "Sem estoque";
  productAddFirst.onclick = () => {
    if (!firstAvailableFlavor) {
      showToast("Produto sem sabores disponiveis no momento");
      return;
    }
    openWhatsAppForProduct(activeProductModel, firstAvailableFlavor);
  };
}

function nextGallery(step) {
  const gallery = productCatalog[activeProductModel]?.gallery || [];
  if (!gallery.length) {
    return;
  }

  activeGalleryIndex = (activeGalleryIndex + step + gallery.length) % gallery.length;
  renderProductModal();
}

function addFlavorToCart(model, flavor) {
  const config = inventoryState[model];
  const brand = config?.brand || "Cristal Pods";

  if (!config || getStock(model, flavor) <= 0) {
    showToast("Esse sabor esta indisponivel");
    return;
  }

  if (getCartQuantity(model, flavor) >= getStock(model, flavor)) {
    showToast("Voce atingiu o limite disponivel desse sabor");
    return;
  }

  const existingItem = cartItems.find((item) => item.model === model && item.flavor === flavor);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ brand, model, flavor, quantity: 1 });
  }

  openCartPanel();
  renderCart();
  showToast("Sabor adicionado ao carrinho");

  if (isMobileViewport()) {
    openMobileCart();
  }
}

function openWhatsAppForProduct(model, flavor) {
  const normalizedFlavor = (flavor || "").toLowerCase();
  let flavorEmoji = "✨";

  if (normalizedFlavor.includes("strawberry") || normalizedFlavor.includes("morango")) {
    flavorEmoji = "🍓";
  } else if (normalizedFlavor.includes("banana")) {
    flavorEmoji = "🍌";
  } else if (normalizedFlavor.includes("grape") || normalizedFlavor.includes("uva")) {
    flavorEmoji = "🍇";
  } else if (normalizedFlavor.includes("apple") || normalizedFlavor.includes("maca")) {
    flavorEmoji = "🍏";
  } else if (normalizedFlavor.includes("watermelon") || normalizedFlavor.includes("melancia")) {
    flavorEmoji = "🍉";
  } else if (normalizedFlavor.includes("mint") || normalizedFlavor.includes("menta") || normalizedFlavor.includes("spearmint")) {
    flavorEmoji = "🧊";
  } else if (normalizedFlavor.includes("kiwi")) {
    flavorEmoji = "🥝";
  } else if (normalizedFlavor.includes("pineapple") || normalizedFlavor.includes("abacaxi")) {
    flavorEmoji = "🍍";
  } else if (normalizedFlavor.includes("peach")) {
    flavorEmoji = "🍑";
  } else if (normalizedFlavor.includes("cherry") || normalizedFlavor.includes("cereja")) {
    flavorEmoji = "🍒";
  } else if (normalizedFlavor.includes("tropical")) {
    flavorEmoji = "🥭";
  } else if (normalizedFlavor.includes("coconut") || normalizedFlavor.includes("coco")) {
    flavorEmoji = "🥥";
  } else if (normalizedFlavor.includes("lemonade") || normalizedFlavor.includes("limao")) {
    flavorEmoji = "🍋";
  }

  const message = [
    "*PEDIDO:* 🗒️",
    "",
    `*MODELO:* ${model}`,
    `*SABOR:* ${flavorEmoji} ${flavor}`
  ].join("\n");

  window.open(`${whatsappBase}${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function openMobileCart() {
  if (!isMobileViewport() || !orderPanel || !orderOverlay) {
    return;
  }

  orderPanel.classList.add("is-open");
  orderOverlay.hidden = false;
  document.body.classList.add("cart-open");
}

function closeMobileCart() {
  if (!orderPanel || !orderOverlay) {
    return;
  }

  orderPanel.classList.remove("is-open");
  orderOverlay.hidden = true;
  if (!productModal || productModal.hidden) {
    document.body.classList.remove("cart-open");
  }
}

function openCartPanel() {
  if (!orderPanel) {
    return;
  }

  orderPanel.hidden = false;
  orderPanel.classList.remove("is-dismissed");
  if (mobileOrderTrigger) {
    mobileOrderTrigger.hidden = false;
  }
}

function dismissCartPanel() {
  if (!orderPanel) {
    return;
  }

  closeMobileCart();
  orderPanel.classList.add("is-dismissed");
  orderPanel.hidden = true;
  if (mobileOrderTrigger) {
    mobileOrderTrigger.hidden = true;
  }
}

function focusOrderPanel() {
  if (!orderPanel) {
    return;
  }

  openCartPanel();
  if (isMobileViewport()) {
    openMobileCart();
  } else {
    requestAnimationFrame(() => {
      orderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function updatePaymentSelection() {
  paymentMethods.forEach((button) => {
    const isActive = button.dataset.payment === selectedPayment;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (paymentWarning) {
    paymentWarning.classList.toggle("is-hidden", Boolean(selectedPayment));
  }

  if (deliveryMethodsBox) {
    deliveryMethodsBox.classList.toggle("is-hidden", !selectedPayment);
  }
}

function updateDeliverySelection() {
  deliveryOptions.forEach((button) => {
    const isActive = button.dataset.delivery === selectedDelivery;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (deliveryWarning) {
    deliveryWarning.classList.toggle("is-hidden", Boolean(selectedDelivery));
  }

  if (deliveryForm) {
    deliveryForm.classList.toggle("is-hidden", selectedDelivery !== "Entrega");
  }

  updateDeliveryFormState();
}

function isDeliveryFormValid() {
  return Boolean(
    normalizeText(deliveryAddress?.value) &&
    normalizeText(deliveryNeighborhood?.value) &&
    normalizeText(deliveryReference?.value)
  );
}

function updateDeliveryFormState() {
  if (!deliveryFormWarning) {
    return;
  }

  if (selectedDelivery !== "Entrega") {
    deliveryFormWarning.classList.add("is-hidden");
    return;
  }

  deliveryFormWarning.classList.toggle("is-hidden", isDeliveryFormValid());
}

function getCartTotal() {
  const itemsTotal = cartItems.reduce((total, item) => total + ((inventoryState[item.model]?.price || 0) * item.quantity), 0);
  return itemsTotal + (selectedDelivery === "Entrega" ? DELIVERY_FEE : 0);
}

function formatOrderMessage() {
  const totalValue = getCartTotal().toFixed(2).replace(".", ",");
  const productLines = cartItems.map((item) => `• ${item.model} - ${item.flavor} (${item.quantity}x)`);

  if (selectedDelivery === "Retirada") {
    return [
      "Novo pedido",
      "",
      ...productLines,
      "",
      `Pagamento: ${selectedPayment}`,
      "Retirada",
      "",
      `Total: R$ ${totalValue}`,
      "",
      "Aguardo a confirmacao. Obrigado!"
    ].join("\n");
  }

  return [
    "Novo pedido",
    "",
    ...productLines,
    "",
    `Pagamento: ${selectedPayment}`,
    `Endereco: ${normalizeText(deliveryAddress?.value)}`,
    `Bairro: ${normalizeText(deliveryNeighborhood?.value)}`,
    `Ponto de referencia: ${normalizeText(deliveryReference?.value)}`,
    "",
    `Total: R$ ${totalValue}`,
    "",
    "Aguardo a confirmacao. Obrigado!"
  ].join("\n");
}

function updateCheckoutLink() {
  if (!checkoutButton) {
    return;
  }

  const deliveryReady = selectedDelivery === "Retirada" || (selectedDelivery === "Entrega" && isDeliveryFormValid());
  if (!cartItems.length || !selectedPayment || !selectedDelivery || !deliveryReady) {
    checkoutButton.href = `${whatsappBase}${encodeURIComponent("Gostaria de ver seu catalogo.")}`;
    checkoutButton.classList.add("is-disabled");
    checkoutButton.setAttribute("aria-disabled", "true");
    return;
  }

  checkoutButton.href = `${whatsappBase}${encodeURIComponent(formatOrderMessage())}`;
  checkoutButton.classList.remove("is-disabled");
  checkoutButton.setAttribute("aria-disabled", "false");
}

function updateOrderSummary() {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (orderCount) {
    orderCount.textContent = `${totalItems} ${totalItems === 1 ? "item" : "itens"}`;
  }
  if (mobileOrderCount) {
    mobileOrderCount.textContent = `${totalItems} ${totalItems === 1 ? "item" : "itens"}`;
  }
  if (mobileOrderTrigger) {
    mobileOrderTrigger.hidden = totalItems === 0;
  }

  if (!orderPanel) {
    return;
  }

  if (totalItems === 0) {
    orderPanel.classList.add("is-dismissed");
    orderPanel.hidden = true;
    closeMobileCart();
  } else {
    orderPanel.hidden = false;
  }
}

function removeCartItem(index) {
  cartItems.splice(index, 1);
  renderCart();
  showToast("Sabor removido");
}

function changeQuantity(index, delta) {
  const item = cartItems[index];
  if (!item) {
    return;
  }

  const stock = getStock(item.model, item.flavor);
  const nextQty = item.quantity + delta;

  if (nextQty <= 0) {
    removeCartItem(index);
    return;
  }

  if (nextQty > stock) {
    showToast("Quantidade maior que o estoque disponivel");
    return;
  }

  item.quantity = nextQty;
  renderCart();
}

function renderCart() {
  if (!orderList) {
    return;
  }

  updateOrderSummary();
  updatePaymentSelection();

  if (!cartItems.length) {
    selectedPayment = "";
    selectedDelivery = "";
    if (deliveryAddress) deliveryAddress.value = "";
    if (deliveryNeighborhood) deliveryNeighborhood.value = "";
    if (deliveryReference) deliveryReference.value = "";
    updatePaymentSelection();
    updateDeliverySelection();
    dismissCartPanel();
    orderList.innerHTML = `
      <div class="order-empty">
        <span class="order-empty-icon" aria-hidden="true"></span>
        <strong>Seu carrinho esta vazio</strong>
        <span>Toque em um sabor para comecar</span>
      </div>
    `;
    updateCheckoutLink();
    return;
  }

  orderList.innerHTML = cartItems.map((item, index) => `
    <article class="order-item" data-order-index="${index}">
      <div class="order-item-copy">
        <strong>${item.flavor}</strong>
        <span>${item.model}</span>
        <small>${item.brand}</small>
      </div>
      <div class="order-item-actions">
        <div class="order-qty-controls">
          <button class="order-qty-button" type="button" data-action="decrease" data-index="${index}">-</button>
          <span class="order-item-qty">${item.quantity}x</span>
          <button class="order-qty-button" type="button" data-action="increase" data-index="${index}">+</button>
        </div>
        <button class="order-remove" type="button" data-action="remove" data-index="${index}">Remover</button>
      </div>
    </article>
  `).join("");

  Array.from(orderList.querySelectorAll("[data-action]")).forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      if (button.dataset.action === "increase") {
        changeQuantity(index, 1);
      }
      if (button.dataset.action === "decrease") {
        changeQuantity(index, -1);
      }
      if (button.dataset.action === "remove") {
        removeCartItem(index);
      }
    });
  });

  updateCheckoutLink();
}

if (galleryPrev) {
  galleryPrev.addEventListener("click", () => nextGallery(-1));
}

if (galleryNext) {
  galleryNext.addEventListener("click", () => nextGallery(1));
}

if (productModalClose) {
  productModalClose.addEventListener("click", closeProductModal);
}

if (productModalBackdrop) {
  productModalBackdrop.addEventListener("click", closeProductModal);
}

paymentMethods.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPayment = button.dataset.payment || "";
    selectedDelivery = "";
    updatePaymentSelection();
    updateDeliverySelection();
    updateCheckoutLink();
  });
});

deliveryOptions.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDelivery = button.dataset.delivery || "";
    updateDeliverySelection();
    updateCheckoutLink();
  });
});

[deliveryAddress, deliveryNeighborhood, deliveryReference].forEach((field) => {
  if (!field) {
    return;
  }

  field.addEventListener("input", () => {
    updateDeliveryFormState();
    updateCheckoutLink();
  });
});

if (mobileOrderTrigger) {
  mobileOrderTrigger.addEventListener("click", focusOrderPanel);
}

if (orderClose) {
  orderClose.addEventListener("click", dismissCartPanel);
}

if (orderOverlay) {
  orderOverlay.addEventListener("click", closeMobileCart);
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", (event) => {
    const deliveryReady = selectedDelivery === "Retirada" || (selectedDelivery === "Entrega" && isDeliveryFormValid());
    if (!cartItems.length || !selectedPayment || !selectedDelivery || !deliveryReady) {
      event.preventDefault();
      if (!selectedPayment) {
        showToast("Escolha a forma de pagamento");
      } else if (!selectedDelivery) {
        showToast("Escolha Retirada ou Entrega");
      } else if (selectedDelivery === "Entrega" && !isDeliveryFormValid()) {
        showToast("Preencha os dados da entrega");
      }
      return;
    }

    event.preventDefault();
    closeMobileCart();
    window.open(checkoutButton.href, "_blank", "noopener,noreferrer");
  });
}

window.addEventListener("resize", () => {
  if (!isMobileViewport()) {
    closeMobileCart();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProductModal();
    closeMobileCart();
  }
});

updatePaymentSelection();
updateDeliverySelection();
renderProducts();
renderCart();
