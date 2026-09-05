const productsGrid = document.getElementById("products-grid");
const catalogSearchInput = document.getElementById("catalog-search-input");
const catalogFilterPromotion = document.getElementById("catalog-filter-promotion");
const catalogResults = document.getElementById("catalog-results");
const productModal = document.getElementById("product-modal");
const productModalBackdrop = document.getElementById("product-modal-backdrop");
const productModalClose = document.getElementById("product-modal-close");
const productModalTitle = document.getElementById("product-modal-title");
const productModalBrand = document.getElementById("product-modal-brand");
const productModalPrice = document.getElementById("product-modal-price");
const productModalDescription = document.getElementById("product-modal-description");
const productSpecifications = document.getElementById("product-specifications");
const productSpecificationsList = document.getElementById("product-specifications-list");
const productWhyChoose = document.getElementById("product-why-choose");
const productWhyChooseList = document.getElementById("product-why-choose-list");
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
const INVENTORY_STATE_VERSION_KEY = "cristal-pods-inventory-version";
const INVENTORY_STATE_VERSION = "stock-reset-2026-09-04";
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
  "ignite-v400-mix": {
    "id": "ignite-v400-mix",
    "model": "IGNITE V400 MIX",
    "brand": "IGNITE",
    "price": 145,
    "flavors": {
      "MORANGO COM MELANCIA ICE E BABALU DE UVA": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/IGNINE MIX 400/1.png",
    "gallery": [
      "./IMAGENS/IGNINE MIX 400/1.png",
      "./IMAGENS/IGNINE MIX 400/2.png",
      "./IMAGENS/IGNINE MIX 400/3.png"
    ],
    "flavorGalleryIndex": {
      "MORANGO COM MELANCIA ICE E BABALU DE UVA": 2
    },
    "description": "O Ignite V400 Mix une alta autonomia e um perfil duplo marcante: morango com melancia gelada de um lado e babalu de uva do outro, para variar a experiencia sem complicacao.",
    "specifications": [
      "Ate 40.000 puffs",
      "Recarga pratica via USB-C",
      "Dois perfis de sabor em um unico aparelho",
      "Design compacto e confortavel"
    ],
    "whyChoose": [
      "Alta autonomia para acompanhar a rotina, com ate 40.000 puffs.",
      "Sabor marcante do inicio ao fim: Morango com Melancia Ice e Babalu de Uva.",
      "Recarga pratica via USB-C.",
      "Design compacto, confortavel e facil de transportar.",
      "Experiencia simplificada, sem configuracoes complexas."
    ]
  },
  "ignite-v155-ultra-slim": {
    "id": "ignite-v155-ultra-slim",
    "model": "IGNITE V155 ULTRA SLIM",
    "brand": "IGNITE",
    "price": 95,
    "flavors": {
      "GRAPE ICE": 1,
      "STRAWBERRY KIWI": 1,
      "WATERMELON ICE": 1,
      "KIWI FRUIT GUAVA": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/v155 ultra slim/1.png",
    "gallery": [
      "./IMAGENS/v155 ultra slim/1.png",
      "./IMAGENS/v155 ultra slim/2.png",
      "./IMAGENS/v155 ultra slim/GRAPE ICE.png",
      "./IMAGENS/v155 ultra slim/STABERRY KIWI.png",
      "./IMAGENS/v155 ultra slim/WATERMELON ICE.webp",
      "./IMAGENS/v155 ultra slim/KIWI FRUIT GUAVA.png"
    ],
    "flavorImages": {
      "GRAPE ICE": "./IMAGENS/v155 ultra slim/GRAPE ICE.png",
      "STRAWBERRY KIWI": "./IMAGENS/v155 ultra slim/STABERRY KIWI.png",
      "WATERMELON ICE": "./IMAGENS/v155 ultra slim/WATERMELON ICE.webp",
      "KIWI FRUIT GUAVA": "./IMAGENS/v155 ultra slim/KIWI FRUIT GUAVA.png"
    },
    "description": "O Ignite V155 Ultra Slim combina formato fino, autonomia de ate 15.500 puffs e sabores frutados com toque gelado para uma experiencia pratica no dia a dia.",
    "specifications": [
      "Ate 15.500 puffs",
      "Bateria recarregavel de 650 mAh",
      "Carregamento Tipo-C",
      "Modos Boost e Eco"
    ],
    "whyChoose": [
      "Formato Ultra Slim, fino e confortavel para transportar.",
      "Autonomia para acompanhar a rotina com ate 15.500 puffs.",
      "Quatro sabores disponiveis para escolher no mesmo modelo.",
      "Recarga pratica por Tipo-C.",
      "Modos Boost e Eco para ajustar a experiencia."
    ]
  },
  "ignite-v300": {
    "id": "ignite-v300",
    "model": "IGNITE V300",
    "brand": "IGNITE",
    "price": 130,
    "flavors": {
      "COCONUT BANANA": 1,
      "GRAPE ICE": 1,
      "ICY MINT": 1,
      "GREEN APPLE": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/IGNITE V300/1.png",
    "gallery": [
      "./IMAGENS/IGNITE V300/1.png",
      "./IMAGENS/IGNITE V300/COCONOUT BANANA.png",
      "./IMAGENS/IGNITE V300/GRAPE ICE.png",
      "./IMAGENS/IGNITE V300/ICY MINT.png",
      "./IMAGENS/IGNITE V300/GREEN APPLE.png"
    ],
    "flavorImages": {
      "COCONUT BANANA": "./IMAGENS/IGNITE V300/COCONOUT BANANA.png",
      "GRAPE ICE": "./IMAGENS/IGNITE V300/GRAPE ICE.png",
      "ICY MINT": "./IMAGENS/IGNITE V300/ICY MINT.png",
      "GREEN APPLE": "./IMAGENS/IGNITE V300/GREEN APPLE.png"
    },
    "description": "O Ignite V300 traz um formato Ultra Slim com tecnologia Dual Mesh, visual leve e sabores marcantes para uma experiencia direta e pratica.",
    "specifications": [
      "Formato Ultra Slim, leve e confortavel",
      "Tecnologia Dual Mesh",
      "Indicadores visuais de bateria e liquido",
      "Quatro sabores disponiveis"
    ],
    "whyChoose": [
      "Design compacto para levar com facilidade.",
      "Tecnologia Dual Mesh para uma experiencia consistente.",
      "Quatro perfis de sabor para escolher.",
      "Leitura visual pratica de bateria e liquido.",
      "Uso simples, sem configuracoes complexas."
    ]
  },
  "elf-bar-ice-king": {
    "id": "elf-bar-ice-king",
    "model": "ELF BAR ICE KING",
    "brand": "ELF BAR",
    "price": 140,
    "flavors": {
      "MIAMI MINT": 1,
      "TIGERS BLOOD": 1,
      "GRAPE ICE": 1,
      "WATERMELON": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/ELF BAR ICE KING/1.png",
    "gallery": [
      "./IMAGENS/ELF BAR ICE KING/1.png",
      "./IMAGENS/ELF BAR ICE KING/2.png",
      "./IMAGENS/ELF BAR ICE KING/MIAMI MINT.png",
      "./IMAGENS/ELF BAR ICE KING/TIGERS BLOOD.jpg",
      "./IMAGENS/ELF BAR ICE KING/UVA ICE.png",
      "./IMAGENS/ELF BAR ICE KING/WATERMELON ICE.png"
    ],
    "flavorImages": {
      "MIAMI MINT": "./IMAGENS/ELF BAR ICE KING/MIAMI MINT.png",
      "TIGERS BLOOD": "./IMAGENS/ELF BAR ICE KING/TIGERS BLOOD.jpg",
      "GRAPE ICE": "./IMAGENS/ELF BAR ICE KING/UVA ICE.png",
      "WATERMELON": "./IMAGENS/ELF BAR ICE KING/WATERMELON ICE.png"
    },
    "description": "O Elf Bar Ice King combina um visual moderno com quatro sabores gelados e frutados para uma escolha pratica e marcante.",
    "specifications": [
      "Quatro sabores disponiveis",
      "Formato pratico para o dia a dia",
      "Indicadores visuais no aparelho",
      "Design moderno"
    ],
    "whyChoose": [
      "Escolha entre quatro perfis de sabor.",
      "Opcoes geladas, frutadas e refrescantes.",
      "Visual moderno e facil de usar.",
      "Selecao simples de sabor no pedido.",
      "Imagem especifica exibida para cada sabor."
    ]
  },
  "elf-bar-30k": {
    "id": "elf-bar-30k",
    "model": "ELF BAR 30K",
    "brand": "ELF BAR",
    "price": 119.9,
    "flavors": {
      "GREEN APPLE ICE": 1,
      "BUBBALOO TUTTI FRUTTI": 1,
      "WATERMELON ICE": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/elf bar 30k/1.png",
    "gallery": [
      "./IMAGENS/elf bar 30k/1.png",
      "./IMAGENS/elf bar 30k/2.png",
      "./IMAGENS/elf bar 30k/GREEN APPLE ICE.png",
      "./IMAGENS/elf bar 30k/BUBBALOO TUTTI FRUTTI.png",
      "./IMAGENS/elf bar 30k/WATERMELON ICE.png"
    ],
    "flavorImages": {
      "GREEN APPLE ICE": "./IMAGENS/elf bar 30k/GREEN APPLE ICE.png",
      "BUBBALOO TUTTI FRUTTI": "./IMAGENS/elf bar 30k/BUBBALOO TUTTI FRUTTI.png",
      "WATERMELON ICE": "./IMAGENS/elf bar 30k/WATERMELON ICE.png"
    },
    "description": "O Elf Bar 30K entrega ate 30.000 puffs em um formato pratico, com sabores frutados e gelados para quem busca uma experiencia marcante.",
    "specifications": [
      "Ate 30.000 puffs",
      "Tres sabores disponiveis",
      "Formato pratico para o dia a dia",
      "Design moderno"
    ],
    "whyChoose": [
      "Alta autonomia com ate 30.000 puffs.",
      "Tres perfis de sabor para escolher.",
      "Opcoes frutadas e refrescantes.",
      "Imagem especifica para cada sabor selecionado.",
      "Pedido simples e direto pelo catalogo."
    ]
  },
  "we-fume-30k": {
    "id": "we-fume-30k",
    "model": "WE FUME 30K",
    "brand": "WE FUME",
    "price": 80,
    "originalPrice": 129.9,
    "isPromotion": true,
    "flavors": {
      "STAWBERRY WATERMELON": 1,
      "MIAMI MIX": 1,
      "STAWBERRY BANANA": 1,
      "FROZEN TRIPPLE APPLE": 1
    },
    "category": "Pod descartavel",
    "cover": "./IMAGENS/WE FUME/1.png",
    "gallery": [
      "./IMAGENS/WE FUME/1.png",
      "./IMAGENS/WE FUME/2.png",
      "./IMAGENS/WE FUME/STAWBERRY WATERMELON.png",
      "./IMAGENS/WE FUME/MIAMI MIX.png",
      "./IMAGENS/WE FUME/BANANA STAWBERRY.png",
      "./IMAGENS/WE FUME/FROZEN TRIPLE APP.png"
    ],
    "flavorImages": {
      "STAWBERRY WATERMELON": "./IMAGENS/WE FUME/STAWBERRY WATERMELON.png",
      "MIAMI MIX": "./IMAGENS/WE FUME/MIAMI MIX.png",
      "STAWBERRY BANANA": "./IMAGENS/WE FUME/BANANA STAWBERRY.png",
      "FROZEN TRIPPLE APPLE": "./IMAGENS/WE FUME/FROZEN TRIPLE APP.png"
    },
    "description": "O WE FUME 30K combina ate 30.000 puffs, formato pratico e sabores frutados para quem procura uma opcao com excelente custo-beneficio.",
    "specifications": [
      "Ate 30.000 puffs",
      "Quatro sabores disponiveis",
      "Formato pratico para o dia a dia",
      "Produto em promocao"
    ],
    "whyChoose": [
      "Preco promocional de R$80,00.",
      "Autonomia de ate 30.000 puffs.",
      "Quatro perfis de sabor para escolher.",
      "Imagem especifica exibida para cada sabor.",
      "Pedido simples e direto pelo catalogo."
    ]
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
      "PASSION FRUIT SOUR KIWI // PINEAPPLE ICE WATERMELON": 0
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
      "MENTHOL": 0
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
    if (window.localStorage.getItem(INVENTORY_STATE_VERSION_KEY) !== INVENTORY_STATE_VERSION) {
      window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
      window.localStorage.setItem(INVENTORY_STATE_VERSION_KEY, INVENTORY_STATE_VERSION);
      return;
    }

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

function hasPromotionalPrice(product) {
  return Number(product.originalPrice) > Number(product.price);
}

function formatProductPrice(product) {
  const previousPrice = hasPromotionalPrice(product)
    ? `<span class="product-price-old">${formatPrice(product.originalPrice)}</span>`
    : "";
  return `${previousPrice}<strong class="product-price">${formatPrice(product.price)}</strong>`;
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

function normalizeSearchText(value) {
  const normalizedValue = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const flavorAliases = {
    grape: "uva",
    uva: "uva",
    strawberry: "morango",
    stawberry: "morango",
    morango: "morango",
    watermelon: "melancia",
    melancia: "melancia",
    apple: "maca",
    maca: "maca",
    green: "verde",
    verde: "verde",
    ice: "gelado",
    icy: "gelado",
    frozen: "gelado",
    gelado: "gelado",
    gelada: "gelado",
    gelados: "gelado",
    geladas: "gelado",
    gelo: "gelado",
    mint: "menta",
    menthol: "menta",
    menta: "menta",
    banana: "banana",
    coconut: "coco",
    coconout: "coco",
    coco: "coco",
    kiwi: "kiwi",
    guava: "goiaba",
    goiaba: "goiaba",
    cherry: "cereja",
    cereja: "cereja",
    pineapple: "abacaxi",
    abacaxi: "abacaxi",
    peach: "pessego",
    pessego: "pessego",
    passion: "maracuja",
    maracuja: "maracuja",
    lemon: "limao",
    lime: "limao",
    limao: "limao",
    babalu: "chiclete",
    bubbaloo: "chiclete",
    chiclete: "chiclete"
  };

  return normalizedValue
    .split(" ")
    .map((term) => flavorAliases[term] || term)
    .join(" ");
}

function getProductPuffs(product) {
  const productText = `${product.model} ${product.description}`;
  const match = productText.match(/(\d{1,3}(?:[.\s]?\d{3})?)\s*(puffs?|k\b)/i);
  if (!match) {
    return 0;
  }

  const amount = Number(match[1].replace(/[^0-9]/g, ""));
  return /k\b/i.test(match[2]) ? amount * 1000 : amount;
}

function isPromotion(product) {
  return product.isPromotion === true || Number(product.originalPrice) > Number(product.price);
}

function getCatalogFilters() {
  return {
    query: normalizeSearchText(catalogSearchInput?.value),
    promotion: Boolean(catalogFilterPromotion?.checked)
  };
}

function matchesSearchTerms(searchText, query) {
  if (!query) {
    return true;
  }

  const searchableTerms = new Set(searchText.split(" "));
  return query.split(" ").every((term) => searchableTerms.has(term));
}

function getFilteredProducts() {
  const filters = getCatalogFilters();
  const matchingProducts = Object.values(products).filter((product) => {
    const totalStock = getTotalStock(product.id);
    const productPuffs = getProductPuffs(product);
    const searchText = normalizeSearchText([
      product.model,
      product.brand,
      product.description,
      productPuffs,
      ...Object.keys(product.flavors)
    ].join(" "));

    return totalStock > 0
      && matchesSearchTerms(searchText, filters.query)
      && (!filters.promotion || isPromotion(product));
  });

  return matchingProducts.sort((firstProduct, secondProduct) => {
    return firstProduct.model.localeCompare(secondProduct.model, "pt-BR");
  });
}

function updateCatalogResults(total) {
  if (!catalogResults) {
    return;
  }

  const label = total === 1 ? "produto encontrado" : "produtos encontrados";
  catalogResults.textContent = `${total} ${label}`;
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

function highlightOrderItem(index) {
  const item = orderList?.querySelector(`[data-order-index="${index}"]`);
  if (!item) {
    return;
  }

  item.classList.remove("is-updated");
  void item.offsetWidth;
  item.classList.add("is-updated");
}

function renderProducts() {
  if (!productsGrid) {
    return;
  }

  const filteredProducts = getFilteredProducts();
  updateCatalogResults(filteredProducts.length);

  if (!filteredProducts.length) {
    productsGrid.innerHTML = `
      <div class="catalog-empty">
        <strong>Nenhum produto encontrado</strong>
        <span>Ajuste sua busca ou limpe os filtros para tentar novamente.</span>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filteredProducts.map((product) => {
    const productId = product.id;
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
            <div class="product-price-group">
              ${totalStock > 0 ? formatProductPrice(product) : '<strong class="product-price">Indisponivel</strong>'}
            </div>
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

function updateProductAddButton(hasAvailableFlavor) {
  if (!productAddFirst) {
    return;
  }

  productAddFirst.disabled = !hasAvailableFlavor || !selectedProductFlavor;
  productAddFirst.textContent = hasAvailableFlavor
    ? (selectedProductFlavor ? "Adicionar ao carrinho" : "Escolha um sabor")
    : "Sem estoque";
}

function handleProductAdd() {
  const productId = activeProductId;
  const flavor = selectedProductFlavor;

  if (!productId || !flavor) {
    showToast("Escolha um sabor antes de adicionar ao carrinho");
    return;
  }

  if (addFlavorToCart(productId, flavor)) {
    closeProductModal();
    focusOrderPanel();
  }
}

function selectProductFlavor(flavor) {
  const product = products[activeProductId];
  if (!product || getStock(activeProductId, flavor) <= 0) {
    return;
  }

  selectedProductFlavor = flavor;
  Array.from(productFlavorList.querySelectorAll("[data-modal-flavor]")).forEach((button) => {
    const isSelected = button.dataset.modalFlavor === flavor;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  updateProductAddButton(true);

  const flavorImage = product.flavorImages?.[flavor];
  const mappedImageIndex = product.gallery?.indexOf(flavorImage);
  const flavorGalleryIndex = Number.isInteger(mappedImageIndex) && mappedImageIndex >= 0
    ? mappedImageIndex
    : product.flavorGalleryIndex?.[flavor];
  setProductGalleryImage(product, Number.isInteger(flavorGalleryIndex) ? flavorGalleryIndex : 0, true);
  showToast("Sabor selecionado. Adicione ao carrinho para continuar.");
}

function renderProductInfoSection(section, list, items) {
  if (!section || !list) {
    return;
  }

  const content = Array.isArray(items) ? items : [];
  section.hidden = content.length === 0;
  list.innerHTML = content.map((item) => `<li>${item}</li>`).join("");
}

function setProductGalleryImage(product, index, shouldAnimate = false) {
  const gallery = product.gallery || [product.cover];
  activeGalleryIndex = (index + gallery.length) % gallery.length;

  if (productGalleryImage) {
    if (shouldAnimate) {
      productGalleryImage.classList.remove("is-changing");
      void productGalleryImage.offsetWidth;
    }
    productGalleryImage.src = gallery[activeGalleryIndex] || product.cover;
    productGalleryImage.alt = product.model;
    if (shouldAnimate) {
      productGalleryImage.classList.add("is-changing");
    }
  }

  Array.from(galleryDots?.querySelectorAll("[data-gallery-index]") || []).forEach((dot) => {
    const isActive = Number(dot.dataset.galleryIndex) === activeGalleryIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

function renderProductModal() {
  const product = products[activeProductId];

  if (!product) {
    return;
  }

  const gallery = product.gallery || [product.cover];
  productModalBrand.textContent = `${product.brand} \u2022 ${product.category}`;
  productModalTitle.textContent = product.model;
  productModalPrice.innerHTML = getTotalStock(activeProductId) > 0
    ? formatProductPrice(product)
    : "Indisponivel";
  productModalDescription.textContent = product.description;
  renderProductInfoSection(productSpecifications, productSpecificationsList, product.specifications);
  renderProductInfoSection(productWhyChoose, productWhyChooseList, product.whyChoose);
  setProductGalleryImage(product, activeGalleryIndex);

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
      setProductGalleryImage(product, Number(dot.dataset.galleryIndex), true);
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
      selectProductFlavor(button.dataset.modalFlavor || "");
    });
  });

  const hasAvailableFlavor = flavorEntries.some(([, qty]) => qty > 0);
  updateProductAddButton(hasAvailableFlavor);
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
  highlightOrderItem(cartItems.length - 1);
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
  highlightOrderItem(index);
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

if (productAddFirst) {
  productAddFirst.addEventListener("click", handleProductAdd);
}

catalogFilterPromotion?.addEventListener("change", renderProducts);

if (catalogSearchInput) {
  catalogSearchInput.addEventListener("input", renderProducts);
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
