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
const orderTotals = document.getElementById("order-totals");
const orderSubtotal = document.getElementById("order-subtotal");
const orderDeliveryFee = document.getElementById("order-delivery-fee");
const orderTotal = document.getElementById("order-total");
const checkoutButton = document.getElementById("checkout-button");
const mobileOrderTrigger = document.getElementById("mobile-order-trigger");
const mobileOrderCount = document.getElementById("mobile-order-count");
const toastStack = document.getElementById("toast-stack");
const paymentMethods = Array.from(document.querySelectorAll("[data-payment]"));
const paymentWarning = document.getElementById("payment-warning");
const deliveryForm = document.getElementById("delivery-form");
const deliveryFormWarning = document.getElementById("delivery-form-warning");
const deliveryAddress = document.getElementById("delivery-address");
const deliveryNeighborhood = document.getElementById("delivery-neighborhood");
const deliveryCity = document.getElementById("delivery-city");
const deliveryReference = document.getElementById("delivery-reference");
const useLocationButton = document.getElementById("use-location-button");
const locationStatus = document.getElementById("location-status");
const INVENTORY_STORAGE_KEY = "cristal-pods-inventory";
const whatsappBase = "https://wa.me/557588442493?text=";
const DELIVERY_FEE = 10;
const DELIVERY_METHOD = "Entrega";

const cartItems = [];
let selectedPayment = "";
let activeProductId = "";
let activeGalleryIndex = 0;
let selectedProductFlavor = "";

const products = {
  "ice-king-uva": {
    "id": "ice-king-uva",
    "model": "ICE KING UVA",
    "brand": "ICE KING",
    "price": 139.9,
    "flavors": {
      "Uva Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ICE KING UVA/imagem pod.webp",
    "gallery": [
      "./IMAGENS/ICE KING UVA/imagem pod.webp",
      "./IMAGENS/ICE KING UVA/imagem caixa.webp",
      "./IMAGENS/ICE KING UVA/06f71ba0ad752cc625f870f15a07c5b5.webp"
    ],
    "description": "Modelo Ice King com visual premium, acabamento moderno e perfil gelado de uva para quem busca sabor marcante e puxada intensa."
  },
  "ice-king-tiger-blood": {
    "id": "ice-king-tiger-blood",
    "model": "ICE KING TIGER BLOOD",
    "brand": "ICE KING",
    "price": 139.9,
    "flavors": {
      "Tiger Blood": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ice king tiger blood/images (2).webp",
    "gallery": [
      "./IMAGENS/ice king tiger blood/images (2).webp",
      "./IMAGENS/ice king tiger blood/images.webp",
      "./IMAGENS/ice king tiger blood/80905f3dc51602b70f9e8c423aa55c19.webp"
    ],
    "description": "Sabor Tiger Blood com mistura marcante de morango, coco e melancia, em um modelo Ice King de alta duracao e puxada intensa."
  },
  "ice-king-new-twist": {
    "id": "ice-king-new-twist",
    "model": "ICE KING NEW TWIST",
    "brand": "ICE KING",
    "price": 139.9,
    "flavors": {
      "Neon Twist": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ice king new twist/fundo branco.webp",
    "gallery": [
      "./IMAGENS/ice king new twist/fundo branco.webp",
      "./IMAGENS/ice king new twist/images.webp",
      "./IMAGENS/ice king new twist/0b01fe22ac2eab3d17d12ea05d6e47bb.webp"
    ],
    "description": "Sabor Neon Twist com perfil frutado, refrescante e marcante, em um modelo Ice King 40K de alta duracao, vapor suave e desempenho premium."
  },
  "elf-bar-bc-45k-grape-twist": {
    "id": "elf-bar-bc-45k-grape-twist",
    "model": "ELF BAR BC 45K GRAPE TWIST",
    "brand": "ELF BAR",
    "price": 159.9,
    "flavors": {
      "GRAPE TWIST": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/grape twist/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/grape twist/IMAGEM 1.webp",
      "./IMAGENS/grape twist/imagem 2.webp",
      "./IMAGENS/grape twist/IMAGEM 3.webp"
    ],
    "description": "Sabor GRAPE TWIST com chiclete de uva adocicado e perfil nostalgico, em um modelo Elf Bar BC de 45.000 puffs."
  },
  "elf-bar-bc-45k-green-apple-ice": {
    "id": "elf-bar-bc-45k-green-apple-ice",
    "model": "ELF BAR BC 45K GREEN APPLE ICE",
    "brand": "ELF BAR",
    "price": 159.9,
    "flavors": {
      "GREEN APPLE ICE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/gren aple/imagem 1.webp",
    "gallery": [
      "./IMAGENS/gren aple/imagem 1.webp",
      "./IMAGENS/gren aple/IMAGME 2.webp",
      "./IMAGENS/gren aple/IMAGEM 3.webp"
    ],
    "description": "Sabor GREEN APPLE ICE com perfil de maca verde gelada, refrescante e marcante, em um modelo Elf Bar BC de 45.000 puffs."
  },
  "elf-bar-bc-45k-watermelon-ice": {
    "id": "elf-bar-bc-45k-watermelon-ice",
    "model": "ELF BAR BC 45K WATERMELON ICE",
    "brand": "ELF BAR",
    "price": 159.9,
    "flavors": {
      "WATERMELON ICE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/BC 45K WATERMELON ICE/imagem 1.webp",
    "gallery": [
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 1.webp",
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 2.webp",
      "./IMAGENS/BC 45K WATERMELON ICE/imagem 3.webp"
    ],
    "description": "Sabor WATERMELON ICE com perfil refrescante de melancia gelada, em um modelo Elf Bar BC de 45.000 puffs com visual premium."
  },
  "bc-10000-touch-coconut-banana": {
    "id": "bc-10000-touch-coconut-banana",
    "model": "BC 10000 TOUCH COCONUT BANANA",
    "brand": "ELF BAR",
    "price": 99.9,
    "flavors": {
      "COCONUT BANANA": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/Banana coconout/imagem 1.webp",
    "gallery": [
      "./IMAGENS/Banana coconout/imagem 1.webp",
      "./IMAGENS/Banana coconout/imagem 2.webp",
      "./IMAGENS/Banana coconout/imagem 3.webp"
    ],
    "description": "Sabor COCONUT BANANA com perfil cremoso e tropical, combinando coco e banana em um modelo pratico de 10.000 puffs."
  },
  "v155-banana-ice-ultra-slim": {
    "id": "v155-banana-ice-ultra-slim",
    "model": "V155 BANANA ICE ULTRA SLIM",
    "brand": "IGNITE",
    "price": 95,
    "flavors": {
      "BANANA ICE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/v155 banana ice/imagem 1.webp",
    "gallery": [
      "./IMAGENS/v155 banana ice/imagem 1.webp",
      "./IMAGENS/v155 banana ice/imagem 2.webp",
      "./IMAGENS/v155 banana ice/imagem 3.webp"
    ],
    "description": "Modelo V155 Ultra Slim com 15.500 puffs e sabor BANANA ICE, trazendo puxada gelada, formato fino e visual premium."
  },
  "v155-ultra-slim-straberry-kiwi": {
    "id": "v155-ultra-slim-straberry-kiwi",
    "model": "V155 ULTRA SLIM STRABERRY KIWI",
    "brand": "IGNITE",
    "price": 95,
    "flavors": {
      "STRABERRY KIWI": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/V155 MORANGO KIWI/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 1.webp",
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 2.webp",
      "./IMAGENS/V155 MORANGO KIWI/IMAGEM 3.webp"
    ],
    "description": "Modelo V155 Ultra Slim com 15.500 puffs e sabor STRABERRY KIWI, unindo perfil frutado marcante, formato fino e visual premium."
  },
  "v155-ultra-slim-watermelon-mix": {
    "id": "v155-ultra-slim-watermelon-mix",
    "model": "V155 ULTRA SLIM WATERMELON MIX",
    "brand": "IGNITE",
    "price": 95,
    "flavors": {
      "WATERMELON MIX": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/V155 WATERMELON MIX/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 1.webp",
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 2.webp",
      "./IMAGENS/V155 WATERMELON MIX/IMAGEM 3.webp"
    ],
    "description": "Modelo V155 Ultra Slim com 15.500 puffs e sabor WATERMELON MIX, trazendo perfil refrescante, formato fino e visual premium."
  },
  "v400mix-grape-ice-straberry": {
    "id": "v400mix-grape-ice-straberry",
    "model": "V400MIX GRAPE ICE// STRABERRY",
    "brand": "IGNITE",
    "price": 150,
    "flavors": {
      "GRAPE ICE // STRABERRY": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 1.webp",
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 2.webp",
      "./IMAGENS/IGNITE MIX GRAPE MORANGO/IMAGEM 3.webp"
    ],
    "description": "Modelo V400MIX com proposta premium, alta autonomia e sabor GRAPE ICE // STRABERRY para quem busca puxada marcante e visual moderno."
  },
  "v400-mix-apple-ice-straberry-watermelon": {
    "id": "v400-mix-apple-ice-straberry-watermelon",
    "model": "V400 MIX APPLE ICE// STRABERRY WATERMELON",
    "brand": "IGNITE",
    "price": 150,
    "flavors": {
      "APPLE ICE // STRABERRY WATERMELON": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 1.webp",
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 2.webp",
      "./IMAGENS/MIX V400 APLE ICE WATERMELON STRABERRY/IMAGEM 3.webp"
    ],
    "description": "Modelo V400 MIX com proposta premium, alta autonomia e sabor APPLE ICE // STRABERRY WATERMELON para quem busca puxada marcante e visual moderno."
  },
  "v400-mix-passion-fruit-sour-kiwi-pineapple-ice-watermelon": {
    "id": "v400-mix-passion-fruit-sour-kiwi-pineapple-ice-watermelon",
    "model": "V400 MIX PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON",
    "brand": "IGNITE",
    "price": 150,
    "flavors": {
      "PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON": 1
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGEM 1.webp",
      "./IMAGENS/V400 MIX MARACUJA ABACAXI/IMAGME 2.webp"
    ],
    "description": "Modelo V400 MIX com proposta premium, alta autonomia e sabor PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON para quem busca puxada marcante e visual moderno."
  },
  "v400-mix-icy-mint-peach-grape": {
    "id": "v400-mix-icy-mint-peach-grape",
    "model": "V400 MIX ICY MINT / PEACH GRAPE",
    "brand": "IGNITE",
    "price": 150,
    "flavors": {
      "ICY MINT / PEACH GRAPE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 1.webp",
    "gallery": [
      "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 1.webp",
      "./IMAGENS/V400 MIX ICY MINT  PEACH GRAPE/IMAGEM 2.webp"
    ],
    "description": "Modelo V400 MIX com proposta premium, alta autonomia e sabor ICY MINT / PEACH GRAPE para quem busca puxada refrescante e visual moderno."
  },
  "nik-bar-12k-crystal-12-000-puffs": {
    "id": "nik-bar-12k-crystal-12-000-puffs",
    "model": "NIK BAR 12K CRYSTAL 12.000 PUFFS",
    "brand": "NIK BAR",
    "price": 99.9,
    "flavors": {
      "SOUR APPLE ICE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/imagem1.webp",
    "gallery": [
      "./IMAGENS/imagem1.webp",
      "./IMAGENS/nik bar aple ice/imagem 2.webp"
    ],
    "description": "Modelo NIK BAR Crystal com 12.000 puffs e sabor SOUR APPLE ICE, trazendo perfil gelado de maca verde, visual premium e puxada marcante."
  },
  "nik-bar-12k-menthol-crystal-12-000-puffs": {
    "id": "nik-bar-12k-menthol-crystal-12-000-puffs",
    "model": "NIK BAR 12K MENTHOL CRYSTAL 12.000 PUFFS",
    "brand": "NIK BAR",
    "price": 99.9,
    "flavors": {
      "MENTHOL": 1
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/stone freeze/imagem 1.webp",
    "gallery": [
      "./IMAGENS/stone freeze/imagem 1.webp",
      "./IMAGENS/stone freeze/imagem 2.webp",
      "./IMAGENS/stone freeze/imagem 3.webp"
    ],
    "description": "Modelo NIK BAR Crystal com 12.000 puffs e sabor MENTHOL, trazendo refrescancia marcante, visual premium e puxada intensa."
  },
  "we-fume-strawberry-banana-30-000-puffs": {
    "id": "we-fume-strawberry-banana-30-000-puffs",
    "model": "WE FUME STRAWBERRY BANANA 30.000 PUFFS",
    "brand": "WE FUME",
    "price": 80,
    "flavors": {
      "STRAWBERRY BANANA": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/we fume morango banana/imagem 1.webp",
    "gallery": [
      "./IMAGENS/we fume morango banana/imagem 1.webp"
    ],
    "description": "Modelo WE FUME com 30.000 puffs e sabor STRAWBERRY BANANA, trazendo perfil doce e frutado, alta duracao e puxada marcante."
  },
  "we-fume-ice-mint-30-000-puffs": {
    "id": "we-fume-ice-mint-30-000-puffs",
    "model": "WE FUME ICE MINT 30.000 PUFFS",
    "brand": "WE FUME",
    "price": 80,
    "flavors": {
      "ICE MINT": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/we fume morango banana/we fume de menta.webp",
    "gallery": [
      "./IMAGENS/we fume morango banana/we fume de menta.webp"
    ],
    "description": "Modelo WE FUME com 30.000 puffs e sabor ICE MINT, trazendo refrescancia intensa, alta duracao e puxada marcante."
  },
  "vnano-grape-ice": {
    "id": "vnano-grape-ice",
    "model": "VNANO GRAPE ICE",
    "brand": "IGNITE",
    "price": 40,
    "flavors": {
      "GRAPE ICE": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/VNANO/GRAPE ICE.webp",
    "gallery": [
      "./IMAGENS/VNANO/GRAPE ICE.webp"
    ],
    "description": "Modelo VNANO com 1.000 puffs e sabor GRAPE ICE, trazendo perfil gelado de uva em um formato compacto e pratico."
  },
  "vnano-tropical-fruit": {
    "id": "vnano-tropical-fruit",
    "model": "VNANO TROPICAL FRUIT",
    "brand": "IGNITE",
    "price": 40,
    "flavors": {
      "TROPICAL FRUIT": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/VNANO/TROPICAL FRUIT.webp",
    "gallery": [
      "./IMAGENS/VNANO/TROPICAL FRUIT.webp"
    ],
    "description": "Modelo VNANO com 1.000 puffs e sabor TROPICAL FRUIT, trazendo perfil frutado marcante em um formato compacto e pratico."
  },
  "nikbar-30k": {
    "id": "nikbar-30k",
    "model": "NIKBAR 30K",
    "brand": "NIKBAR",
    "price": 120,
    "flavors": {
      "Morango e Kiwi": 0,
      "Icy Mint": 0,
      "Melancia Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/NIKBAR30K.webp",
    "gallery": [
      "./IMAGENS/NIKBAR30K.webp",
      "./IMAGENS/ab5993c9-300c-407d-b4bd-b1c6df4dd49a.webp",
      "./IMAGENS/nikbar sem fundo.webp"
    ],
    "description": "Pod de 30.000 puffs com pegada premium, visual moderno e sabores gelados para quem busca intensidade."
  },
  "vnano": {
    "id": "vnano",
    "model": "VNANO",
    "brand": "IGNITE",
    "price": 60,
    "flavors": {
      "Maca Verde": 0,
      "Uva Ice": 0,
      "Frutas Tropicais": 0,
      "Limonada de Cereja": 0,
      "Morango Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/VNANO PRO.webp",
    "gallery": [
      "./IMAGENS/VNANO PRO.webp",
      "./IMAGENS/VNANO IGNITE.webp",
      "./IMAGENS/IGNITE.webp"
    ],
    "description": "Modelo compacto e facil de usar, com 1.000 puffs e sabores para o dia a dia."
  },
  "ignite-v155": {
    "id": "ignite-v155",
    "model": "IGNITE V155",
    "brand": "IGNITE",
    "price": 120,
    "flavors": {
      "Menta Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/V155.webp",
    "gallery": [
      "./IMAGENS/V155.webp",
      "./IMAGENS/V155 IGNITE.webp",
      "./IMAGENS/v155v.webp"
    ],
    "description": "Modelo ultrafino da Ignite com bateria recarregavel, puxada forte e acabamento premium."
  },
  "v80-ignite": {
    "id": "v80-ignite",
    "model": "V80 IGNITE",
    "brand": "IGNITE",
    "price": 110,
    "flavors": {
      "Morango Gelado": 0,
      "Menta Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/v80.webp",
    "gallery": [
      "./IMAGENS/v80.webp",
      "./IMAGENS/V80 IGNITE.webp",
      "./IMAGENS/v80.webp"
    ],
    "description": "V80 com 8.000 puffs e formato premium. Hoje aparece apenas para consulta, sem estoque disponivel."
  },
  "ignite-mix-40-000-puffs": {
    "id": "ignite-mix-40-000-puffs",
    "model": "IGNITE MIX 40.000 PUFFS",
    "brand": "IGNITE",
    "price": 150,
    "flavors": {
      "Apple Ice + Strawberry Watermelon": 0,
      "Watermelon Ice + Cherry Ice": 0,
      "Banana Ice + Strawberry Ice": 0,
      "Passion Fruit Sour Kiwi + Pineapple Ice": 0,
      "Icy Mint + Peach Grape": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/IGNITE MIX.webp",
    "gallery": [
      "./IMAGENS/IGNITE MIX.webp",
      "./IMAGENS/IGNITE.webp",
      "./IMAGENS/IGNITE SEM FUNDO.webp"
    ],
    "description": "Modelo high-capacity com combinacoes de sabores e foco em longa duracao."
  },
  "elfbar-duke-35k": {
    "id": "elfbar-duke-35k",
    "model": "ELFBAR DUKE 35K",
    "brand": "ELFBAR",
    "price": 135,
    "flavors": {
      "Ice Menta": 0,
      "Melancia Ice": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ELFBAR DUKE 35K.webp",
    "gallery": [
      "./IMAGENS/ELFBAR DUKE 35K.webp",
      "./IMAGENS/ELFBAR DUK.webp",
      "./IMAGENS/ELFBAR.webp"
    ],
    "description": "Duke com 35.000 puffs, bateria recarregavel e sabor intenso do inicio ao fim."
  },
  "elfbar-10k": {
    "id": "elfbar-10k",
    "model": "ELFBAR 10K",
    "brand": "ELFBAR",
    "price": 100,
    "flavors": {
      "Uva Ice": 0,
      "Abacaxi Morango Banana": 0,
      "Melancia": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ELFBAR 10K.webp",
    "gallery": [
      "./IMAGENS/ELFBAR 10K.webp",
      "./IMAGENS/10K PUFFS ELFBAR.webp",
      "./IMAGENS/ELFBAR.webp"
    ],
    "description": "Versao compacta da Elfbar com 10.000 puffs. Hoje sem estoque disponivel."
  },
  "elfbar-45k-puffs": {
    "id": "elfbar-45k-puffs",
    "model": "ELFBAR 45K PUFFS",
    "brand": "ELFBAR",
    "price": 160,
    "flavors": {
      "Abacaxi com Hortela": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/ELF BAR 45K.webp",
    "gallery": [
      "./IMAGENS/ELF BAR 45K.webp",
      "./IMAGENS/ELFBAR 45K PUFFS.webp",
      "./IMAGENS/ELFBAR.webp"
    ],
    "description": "Modelo de 45.000 puffs com alta autonomia e visual moderno."
  },
  "life-pod-power-bank": {
    "id": "life-pod-power-bank",
    "model": "LIFE POD POWER BANK",
    "brand": "LIFE POD",
    "price": 130,
    "flavors": {
      "LOVE 66": 0,
      "METHOL": 0,
      "BANANA": 0,
      "GRAPE HONEY": 0
    },
    "category": "Pods descartaveis",
    "cover": "./IMAGENS/LIFE POD COM POWER BANK.webp",
    "gallery": [
      "./IMAGENS/LIFE POD COM POWER BANK.webp",
      "./IMAGENS/LIFE POD.webp",
      "./IMAGENS/LIFE POD COM POWER BANK.webp"
    ],
    "description": "Life Pod com Power Bank, pensado para mais praticidade, recarga e autonomia no dia a dia."
  },
  "refil-life-pod-eco-ii-10k-puffs": {
    "id": "refil-life-pod-eco-ii-10k-puffs",
    "model": "REFIL LIFE POD ECO II 10K PUFFS",
    "brand": "LIFE POD",
    "price": 90,
    "flavors": {
      "CHERRY LIME ICE": 0,
      "BANANA ICE": 0,
      "GRAPE HONEY": 0,
      "CHERRY ICE": 0
    },
    "category": "Refis",
    "cover": "./IMAGENS/REFIL LIFE POD.webp",
    "gallery": [
      "./IMAGENS/REFIL LIFE POD.webp",
      "./IMAGENS/LIFE POD.webp",
      "./IMAGENS/REFIL LIFE POD.webp"
    ],
    "description": "Refil Eco II com 10.000 puffs e sabores em quantidades limitadas."
  }
};

loadProductState();

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function loadProductState() {
  try {
    const saved = window.localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!saved) {
      return;
    }

    mergeSavedProductState(JSON.parse(saved));
  } catch {
    // A malformed saved value must not prevent the catalog from loading.
  }
}

function getProductIdFromStorageKey(key) {
  if (products[key]) {
    return key;
  }

  return Object.values(products).find((product) => product.model === key)?.id || "";
}

function mergeSavedProductState(source) {
  Object.entries(source || {}).forEach(([key, config]) => {
    const productId = getProductIdFromStorageKey(key);
    const product = products[productId];
    if (!product) {
      return;
    }

    const nextPrice = Number(config.price);
    product.price = Number.isFinite(nextPrice) ? nextPrice : product.price;

    Object.entries(config.flavors || {}).forEach(([flavor, qty]) => {
      if (!(flavor in product.flavors)) {
        return;
      }

      const nextQty = Number(qty);
      product.flavors[flavor] = Number.isFinite(nextQty) ? Math.max(0, Math.floor(nextQty)) : product.flavors[flavor];
    });
  });
}

function saveProductState() {
  const savedState = Object.fromEntries(Object.values(products).map((product) => [
    product.id,
    { price: product.price, flavors: product.flavors }
  ]));
  window.localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(savedState));
}

function formatPrice(value) {
  return `R$${Number(value).toFixed(2).replace(".", ",")}`;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getStock(productId, flavor) {
  return products[productId]?.flavors?.[flavor] ?? 0;
}

function getTotalStock(productId) {
  return Object.values(products[productId]?.flavors || {}).reduce((total, qty) => total + qty, 0);
}

function getCartQuantity(productId, flavor) {
  const item = cartItems.find((entry) => entry.productId === productId && entry.flavor === flavor);
  return item ? item.quantity : 0;
}

function getAvailableProducts() {
  return Object.values(products)
    .sort((a, b) => {
      const aStock = getTotalStock(a.id);
      const bStock = getTotalStock(b.id);
      if ((aStock > 0) !== (bStock > 0)) {
        return bStock - aStock;
      }
      return a.model.localeCompare(b.model, "pt-BR");
    })
    .map((product) => product.id);
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

  productsGrid.innerHTML = getAvailableProducts().filter((productId) => getTotalStock(productId) > 0).map((productId) => {
    const product = products[productId];
    const totalStock = getTotalStock(productId);
    const availableLabel = totalStock > 0 ? `${totalStock} unidades disponiveis` : "Indisponivel";

    return `
      <article class="product-card ${totalStock <= 0 ? "is-unavailable" : ""}" data-model="${product.model}">
        <div class="product-thumb">
          <img src="${product.cover}" alt="${product.model}" loading="lazy" decoding="async">
        </div>
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <h3>${product.model}</h3>
          <p class="product-excerpt">${product.description}</p>
          <span class="stock-label ${totalStock <= 0 ? "is-out" : ""}">${availableLabel}</span>
          <div class="product-card-footer">
            <strong class="product-price">${totalStock > 0 ? formatPrice(product.price) : "Indisponivel"}</strong>
            <button class="product-open-button" type="button" data-open-product="${productId}">
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

function openProductModal(productId) {
  const product = products[productId];

  if (!product || !productModal) {
    return;
  }

  activeProductId = productId;
  activeGalleryIndex = 0;
  selectedProductFlavor = "";
  renderProductModal();
  productModal.hidden = false;
  document.body.classList.add("cart-open");
}

function closeProductModal() {
  if (!productModal) {
    return;
  }

  productModal.hidden = true;
  activeProductId = "";
  document.body.classList.remove("cart-open");
}

function renderProductModal() {
  const product = products[activeProductId];

  if (!product) {
    return;
  }

  const gallery = product.gallery || [product.cover];
  const currentImage = gallery[activeGalleryIndex] || gallery[0];
  productModalBrand.textContent = `${product.brand} \u2022 ${product.category}`;
  productModalTitle.textContent = product.model;
  productModalPrice.textContent = getTotalStock(activeProductId) > 0 ? formatPrice(product.price) : "Indisponivel";
  productModalDescription.textContent = product.description;
  if (productGalleryImage) {
    productGalleryImage.src = currentImage;
    productGalleryImage.alt = product.model;
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

  const flavorEntries = Object.entries(product.flavors);
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
        class="flavor-chip ${isSoldOut ? "is-sold-out" : ""} ${selectedProductFlavor === flavor ? "is-selected" : ""}"
        type="button"
        data-modal-flavor="${flavor}"
        aria-pressed="${selectedProductFlavor === flavor}"
        ${isSoldOut ? "aria-disabled=\"true\" tabindex=\"-1\"" : ""}
      >
        ${isSoldOut ? `${flavor} \u2022 Indisponivel` : `${flavor} \u2022 ${qty} un`}
      </button>
    `;
  }).join("");

  Array.from(productFlavorList.querySelectorAll("[data-modal-flavor]")).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("is-sold-out")) {
        return;
      }
      const flavor = button.dataset.modalFlavor || "";
      selectedProductFlavor = flavor;
      renderProductModal();
      showToast("Sabor selecionado. Adicione ao carrinho para continuar.");
    });
  });

  const hasAvailableFlavor = flavorEntries.some(([, qty]) => qty > 0);
  productAddFirst.disabled = !hasAvailableFlavor || !selectedProductFlavor;
  productAddFirst.textContent = hasAvailableFlavor
    ? (selectedProductFlavor ? "Adicionar ao carrinho" : "Escolha um sabor")
    : "Sem estoque";
  productAddFirst.onclick = () => {
    if (!selectedProductFlavor) {
      showToast("Escolha um sabor antes de adicionar ao carrinho");
      return;
    }
    if (addFlavorToCart(activeProductId, selectedProductFlavor)) {
      closeProductModal();
    }
  };
}

function nextGallery(step) {
  const gallery = products[activeProductId]?.gallery || [];
  if (!gallery.length) {
    return;
  }

  activeGalleryIndex = (activeGalleryIndex + step + gallery.length) % gallery.length;
  renderProductModal();
}

function addFlavorToCart(productId, flavor) {
  const product = products[productId];
  const brand = product?.brand || "Cristal Pods";

  const existingItem = cartItems.find((item) => item.productId === productId && item.flavor === flavor);
  if (existingItem) {
    showToast("Esse sabor ja esta no carrinho");
    return false;
  }

  if (!product || getStock(productId, flavor) <= 0) {
    showToast("Esse sabor esta indisponivel");
    return false;
  }

  if (getCartQuantity(productId, flavor) >= getStock(productId, flavor)) {
    showToast("Voce atingiu o limite disponivel desse sabor");
    return false;
  }
  cartItems.push({ brand, productId, model: product.model, flavor, quantity: 1 });

  openCartPanel();
  renderCart();
  showToast("Sabor adicionado ao carrinho");
  return true;
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

  if (deliveryForm) {
    deliveryForm.classList.toggle("is-hidden", !selectedPayment);
  }

  updateDeliveryFormState();
  updateOrderTotals();
}

function isDeliveryFormValid() {
  return Boolean(
    normalizeText(deliveryAddress?.value) &&
    normalizeText(deliveryNeighborhood?.value) &&
    normalizeText(deliveryCity?.value)
  );
}

function updateDeliveryFormState() {
  if (!deliveryFormWarning) {
    return;
  }

  if (!selectedPayment) {
    deliveryFormWarning.classList.add("is-hidden");
    return;
  }

  deliveryFormWarning.classList.toggle("is-hidden", isDeliveryFormValid());
}

function setLocationStatus(message) {
  if (locationStatus) {
    locationStatus.textContent = message;
  }
}

function fillDeliveryFields(address) {
  const streetName = address.road || address.pedestrian || address.footway || address.path || "";
  const street = [streetName, address.house_number].filter(Boolean).join(", ");
  const neighborhood = address.suburb || address.neighbourhood || address.city_district || address.quarter || "";
  const city = address.city || address.town || address.village || address.municipality || address.county || "";

  if (street && deliveryAddress) deliveryAddress.value = street;
  if (neighborhood && deliveryNeighborhood) deliveryNeighborhood.value = neighborhood;
  if (city && deliveryCity) deliveryCity.value = city;

  updateDeliveryFormState();
  updateCheckoutLink();
}

async function useCurrentLocation() {
  if (!navigator.geolocation) {
    setLocationStatus("Localizacao nao disponivel neste navegador. Preencha os dados manualmente.");
    return;
  }

  if (useLocationButton) {
    useLocationButton.disabled = true;
  }
  setLocationStatus("Solicitando sua localizacao...");

  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    try {
      setLocationStatus("Buscando endereco...");
      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.search = new URLSearchParams({
        format: "jsonv2",
        lat: String(coords.latitude),
        lon: String(coords.longitude),
        addressdetails: "1"
      }).toString();

      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) {
        throw new Error("Endereco indisponivel");
      }

      const data = await response.json();
      fillDeliveryFields(data.address || {});
      setLocationStatus("Endereco preenchido quando identificado. Confira os dados antes de finalizar.");
    } catch {
      setLocationStatus("Nao foi possivel identificar o endereco. Preencha os dados manualmente.");
    } finally {
      if (useLocationButton) {
        useLocationButton.disabled = false;
      }
    }
  }, (error) => {
    const message = error.code === error.PERMISSION_DENIED
      ? "Permissao de localizacao negada. Preencha os dados manualmente."
      : "Nao foi possivel obter sua localizacao. Preencha os dados manualmente.";
    setLocationStatus(message);
    if (useLocationButton) {
      useLocationButton.disabled = false;
    }
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  });
}

function getCartSubtotal() {
  return cartItems.reduce((total, item) => total + ((products[item.productId]?.price || 0) * item.quantity), 0);
}

function getCartTotal() {
  return getCartSubtotal() + DELIVERY_FEE;
}

function updateOrderTotals() {
  if (!orderTotals || !orderSubtotal || !orderDeliveryFee || !orderTotal) {
    return;
  }

  const hasItems = cartItems.length > 0;
  orderTotals.hidden = !hasItems;
  if (!hasItems) {
    return;
  }

  orderSubtotal.textContent = formatPrice(getCartSubtotal());
  orderDeliveryFee.textContent = formatPrice(DELIVERY_FEE);
  orderTotal.textContent = formatPrice(getCartTotal());
}

function formatOrderMessage() {
  const subtotalValue = getCartSubtotal().toFixed(2).replace(".", ",");
  const deliveryFeeValue = DELIVERY_FEE.toFixed(2).replace(".", ",");
  const totalValue = getCartTotal().toFixed(2).replace(".", ",");
  const productLines = cartItems.map((item) => `\u2022 ${item.model} - ${item.flavor} (${item.quantity}x)`);

  return [
    "Novo pedido",
    "",
    ...productLines,
    "",
    `Pagamento: ${selectedPayment}`,
    DELIVERY_METHOD,
    `Endereco: ${normalizeText(deliveryAddress?.value)}`,
    `Bairro: ${normalizeText(deliveryNeighborhood?.value)}`,
    `Cidade: ${normalizeText(deliveryCity?.value)}`,
    normalizeText(deliveryReference?.value) ? `Ponto de referencia: ${normalizeText(deliveryReference.value)}` : "",
    "",
    `Subtotal: R$ ${subtotalValue}`,
    `Taxa de entrega: R$ ${deliveryFeeValue}`,
    `Total: R$ ${totalValue}`,
    "",
    "Aguardo a confirmacao. Obrigado!"
  ].join("\n");
}

function updateCheckoutLink() {
  if (!checkoutButton) {
    return;
  }

  if (!cartItems.length || !selectedPayment || !isDeliveryFormValid()) {
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
  document.body.classList.toggle("has-cart", totalItems > 0);

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

  const stock = getStock(item.productId, item.flavor);
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
  updateOrderTotals();

  if (!cartItems.length) {
    selectedPayment = "";
    if (deliveryAddress) deliveryAddress.value = "";
    if (deliveryNeighborhood) deliveryNeighborhood.value = "";
    if (deliveryCity) deliveryCity.value = "";
    if (deliveryReference) deliveryReference.value = "";
    updatePaymentSelection();
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
  updateOrderTotals();
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
    updatePaymentSelection();
    updateCheckoutLink();
  });
});

[deliveryAddress, deliveryNeighborhood, deliveryCity, deliveryReference].forEach((field) => {
  if (!field) {
    return;
  }

  field.addEventListener("input", () => {
    updateDeliveryFormState();
    updateCheckoutLink();
  });
});

if (useLocationButton) {
  useLocationButton.addEventListener("click", useCurrentLocation);
}

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
    if (!cartItems.length || !selectedPayment || !isDeliveryFormValid()) {
      event.preventDefault();
      if (!selectedPayment) {
        showToast("Escolha a forma de pagamento");
      } else if (!isDeliveryFormValid()) {
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
renderProducts();
renderCart();
