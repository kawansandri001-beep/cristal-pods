const flavorTabs = Array.from(document.querySelectorAll(".flavor-tab"));
const flavorPanels = Array.from(document.querySelectorAll(".flavor-brand-panel"));
const flavorButtons = Array.from(document.querySelectorAll("[data-flavor-target]"));
const flavorsSection = document.getElementById("sabores");
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

const adminEntry = document.getElementById("admin-entry");
const adminModal = document.getElementById("admin-modal");
const adminBackdrop = document.getElementById("admin-backdrop");
const adminClose = document.getElementById("admin-close");
const adminLogin = document.getElementById("admin-login");
const adminUsername = document.getElementById("admin-username");
const adminPassword = document.getElementById("admin-password");
const adminLoginError = document.getElementById("admin-login-error");
const adminDashboard = document.getElementById("admin-dashboard");
const adminInventory = document.getElementById("admin-inventory");
const adminSave = document.getElementById("admin-save");
const adminLogout = document.getElementById("admin-logout");
const adminSaveStatus = document.getElementById("admin-save-status");

const ADMIN_USERNAME = "cristal.pods";
const ADMIN_PASSWORD = "cristal2008";
const ADMIN_SESSION_KEY = "cristal-pods-admin-session";
const INVENTORY_STORAGE_KEY = "cristal-pods-inventory";
const whatsappBase = "https://wa.me/557588442493?text=";
const cartItems = [];

let selectedPayment = "";
let selectedDelivery = "";

const defaultInventory = {
  "NIKBAR 30K": {
    brand: "NIKBAR",
    price: 120,
    flavors: {
      "Miami Mint": 1,
      "Strawberry Kiwi": 0,
      "Icy Mint": 0,
      "Watermelon Ice": 0
    }
  },
  "VNANO": {
    brand: "IGNITE",
    price: 60,
    flavors: {
      "Green Apple": 5,
      "Grape Ice": 5,
      "Tropical Fruit": 5,
      "Cherry Lemonade": 5,
      "Strawberry Ice": 5,
    }
  },
  "IGNITE V155": {
    brand: "IGNITE",
    price: 120,
    flavors: {
      "Watermelon Mix": 5,
      "Icy Mint": 5
    }
  },
  "V80 IGNITE": {
    brand: "IGNITE",
    price: 110,
    flavors: {
      "Frozen Strawberry": 5,
      "Icy Mint": 5
    }
  },
  "IGNITE MIX 40.000 PUFFS": {
    brand: "IGNITE",
    price: 150,
    flavors: {
      "Apple Ice + Strawberry Watermelon": 2,
      "Watermelon Ice + Cherry Ice": 2,
      "Banana Ice + Strawberry Ice": 2,
      "Passion Fruit Sour Kiwi + Pineapple Ice": 2,
      "Icy Mint + Peach Grape": 2
    }
  },
  "ELFBAR DUKE 35K": {
    brand: "ELFBAR",
    price: 135,
    flavors: {
      "Icy Mint": 5,
      "Watermelon Ice": 5
    }
  },
  "ELFBAR 10K": {
    brand: "ELFBAR",
    price: 100,
    flavors: {
      "Grape Ice": 5,
      "Pineapple Strawberry Banana": 5,
      "Watermelon": 5
    }
  },
  "ELFBAR 45K PUFFS": {
    brand: "ELFBAR",
    price: 160,
    flavors: {
      "Mango Magic": 5,
      "Strawberry Kiwi": 5,
      "Abacaxi": 5
    }
  }
};

let inventoryState = loadInventoryState();

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

function setActiveFlavor(brand) {
  flavorTabs.forEach((tab) => {
    const isActive = tab.dataset.brand === brand;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  flavorPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === brand;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
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

function pulseCart() {
  if (!orderPanel) {
    return;
  }

  orderPanel.classList.remove("is-highlighted");
  void orderPanel.offsetWidth;
  orderPanel.classList.add("is-highlighted");
}

function bounceCount() {
  if (!orderCount) {
    return;
  }

  orderCount.classList.remove("is-bounce");
  void orderCount.offsetWidth;
  orderCount.classList.add("is-bounce");
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
  document.body.classList.remove("cart-open");
}

function openCartPanel() {
  if (!orderPanel) {
    return;
  }

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
  }

  requestAnimationFrame(() => {
    orderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function getStock(model, flavor) {
  return inventoryState[model]?.flavors?.[flavor] ?? 0;
}

function getCartQuantity(model, flavor) {
  const item = cartItems.find((entry) => entry.model === model && entry.flavor === flavor);
  return item ? item.quantity : 0;
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
  return cartItems.reduce((total, item) => {
    const price = inventoryState[item.model]?.price || 0;
    return total + (price * item.quantity);
  }, 0);
}

function formatOrderMessage() {
  const totalValue = getCartTotal().toFixed(2).replace(".", ",");
  const productLines = cartItems.map((item) => `${item.model} - ${item.flavor} (${item.quantity}x)`);

  if (selectedDelivery === "Retirada") {
    return [
      "Novo pedido",
      "",
      ...productLines,
      "",
      `Pagamento: ${selectedPayment}`,
      "RETIRADA",
      "",
      `Total: R$ ${totalValue}`,
      "",
      "Aguardo a confirmacao. Obrigado!"
    ].join("\n");
  }

  return [
    "Novo pedido",
    "",
    ...cartItems.map((item) => `• ${item.model} - ${item.flavor} (${item.quantity}x)`),
    "",
    `Pagamento: ${selectedPayment}`,
    `Endereco: ${normalizeText(deliveryAddress?.value)}`,
    `Bairro: ${normalizeText(deliveryNeighborhood?.value)}`,
    `Ponto referencia: ${normalizeText(deliveryReference?.value)}`,
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
}

function removeCartItem(index) {
  const itemNode = orderList?.querySelector(`[data-order-index="${index}"]`);

  if (itemNode) {
    itemNode.classList.add("is-removing");
    window.setTimeout(() => {
      cartItems.splice(index, 1);
      renderCart();
    }, 220);
  } else {
    cartItems.splice(index, 1);
    renderCart();
  }

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
  bounceCount();
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
          <button class="order-qty-button" type="button" data-action="decrease" data-index="${index}" aria-label="Diminuir quantidade de ${item.flavor}">-</button>
          <span class="order-item-qty">${item.quantity}x</span>
          <button class="order-qty-button" type="button" data-action="increase" data-index="${index}" aria-label="Aumentar quantidade de ${item.flavor}">+</button>
        </div>
        <button class="order-remove" type="button" data-action="remove" data-index="${index}" aria-label="Remover ${item.flavor}">Remover</button>
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

function applyInventoryToUi() {
  document.querySelectorAll(".flavor-highlight").forEach((highlight) => {
    const model = normalizeText(highlight.querySelector(".flavor-product-info h5")?.textContent);
    const config = inventoryState[model];

    if (!config) {
      return;
    }

    const priceNode = highlight.querySelector(".flavor-price");
    if (priceNode) {
      priceNode.textContent = formatPrice(config.price);
    }

    const chips = Array.from(highlight.querySelectorAll(".flavor-chip"));
    chips.forEach((chip) => {
      const originalFlavor = chip.dataset.flavorName || normalizeText(chip.textContent);
      chip.dataset.flavorName = originalFlavor;
      chip.dataset.model = model;
      const stock = getStock(model, originalFlavor);
      const isSoldOut = stock <= 0;

      chip.textContent = isSoldOut ? `${originalFlavor} · Indisponivel` : `${originalFlavor} · ${stock} un`;
      chip.classList.toggle("is-sold-out", isSoldOut);
      chip.setAttribute("aria-disabled", String(isSoldOut));
      chip.setAttribute("tabindex", isSoldOut ? "-1" : "0");
      chip.setAttribute("role", "button");
      chip.setAttribute("aria-label", isSoldOut ? `${originalFlavor} indisponivel` : `Adicionar ${originalFlavor} ao carrinho`);
    });
  });

  renderCart();
}

function addToCart(chip) {
  const flavor = chip.dataset.flavorName || normalizeText(chip.textContent);
  const model = chip.dataset.model || normalizeText(chip.closest(".flavor-highlight")?.querySelector(".flavor-product-info h5")?.textContent);
  const panel = chip.closest(".flavor-brand-panel");
  const brand = normalizeText(panel?.querySelector(".flavor-panel-head h4")?.textContent || "Cristal Pods");

  if (getStock(model, flavor) <= 0) {
    showToast("Esse sabor esta indisponivel");
    return;
  }

  if (getCartQuantity(model, flavor) >= getStock(model, flavor)) {
    showToast("Voce atingiu o limite disponivel desse sabor");
    return;
  }

  const existingItem = cartItems.find((item) => item.brand === brand && item.model === model && item.flavor === flavor);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ brand, model, flavor, quantity: 1 });
  }

  openCartPanel();
  renderCart();
  pulseCart();
  bounceCount();
  showToast("Sabor adicionado ao carrinho");
  focusOrderPanel();
}

function bindFlavorChips() {
  document.querySelectorAll(".flavor-chip").forEach((chip) => {
    if (chip.dataset.bound === "true") {
      return;
    }

    chip.dataset.bound = "true";

    chip.addEventListener("click", () => {
      if (chip.classList.contains("is-sold-out")) {
        return;
      }
      addToCart(chip);
    });

    chip.addEventListener("keydown", (event) => {
      if (chip.classList.contains("is-sold-out")) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        addToCart(chip);
      }
    });
  });
}

function openAdminModal() {
  if (!adminModal) {
    return;
  }

  adminModal.hidden = false;
  document.body.classList.add("cart-open");
  syncAdminView();
}

function closeAdminModal() {
  if (!adminModal) {
    return;
  }

  adminModal.hidden = true;
  document.body.classList.remove("cart-open");
  if (adminLoginError) {
    adminLoginError.classList.add("is-hidden");
  }
  if (adminSaveStatus) {
    adminSaveStatus.classList.add("is-hidden");
  }
}

function isAdminAuthenticated() {
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function setAdminAuthenticated(value) {
  window.localStorage.setItem(ADMIN_SESSION_KEY, value ? "true" : "false");
}

function renderAdminInventory() {
  if (!adminInventory) {
    return;
  }

  adminInventory.innerHTML = Object.entries(inventoryState).map(([model, config]) => `
    <article class="admin-item" data-admin-model="${model}">
      <div class="admin-item-head">
        <div>
          <h4>${model}</h4>
          <p>${config.brand}</p>
        </div>
        <div class="admin-price-row">
          <label class="delivery-field">
            <span>Preco</span>
            <input class="admin-number-input" type="number" min="0" step="0.01" data-admin-price="${model}" value="${config.price}">
          </label>
        </div>
      </div>
      <div class="admin-flavors">
        ${Object.entries(config.flavors).map(([flavor, qty]) => `
          <div class="admin-flavor-row">
            <span class="admin-flavor-name">${flavor}</span>
            <input class="admin-number-input" type="number" min="0" step="1" data-admin-stock="${model}||${flavor}" value="${qty}">
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function syncAdminView() {
  const authenticated = isAdminAuthenticated();

  if (adminLogin) {
    adminLogin.classList.toggle("is-hidden", authenticated);
  }

  if (adminDashboard) {
    adminDashboard.classList.toggle("is-hidden", !authenticated);
  }

  if (authenticated) {
    renderAdminInventory();
  }
}

function saveAdminChanges() {
  document.querySelectorAll("[data-admin-price]").forEach((input) => {
    const model = input.dataset.adminPrice;
    const nextPrice = Number(input.value);
    if (inventoryState[model] && Number.isFinite(nextPrice)) {
      inventoryState[model].price = Math.max(0, nextPrice);
    }
  });

  document.querySelectorAll("[data-admin-stock]").forEach((input) => {
    const [model, flavor] = String(input.dataset.adminStock).split("||");
    const nextQty = Number(input.value);
    if (inventoryState[model] && flavor in inventoryState[model].flavors && Number.isFinite(nextQty)) {
      inventoryState[model].flavors[flavor] = Math.max(0, Math.floor(nextQty));
    }
  });

  saveInventoryState();
  applyInventoryToUi();
  bindFlavorChips();

  if (adminSaveStatus) {
    adminSaveStatus.textContent = "Alteracoes salvas com sucesso.";
    adminSaveStatus.classList.remove("is-hidden");
  }

  showToast("Estoque atualizado");
}

flavorTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveFlavor(tab.dataset.brand);
  });
});

flavorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetBrand = button.dataset.flavorTarget;
    setActiveFlavor(targetBrand);

    const activePanel = document.querySelector(`.flavor-brand-panel[data-panel="${targetBrand}"]`);

    if (activePanel) {
      requestAnimationFrame(() => {
        activePanel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    if (flavorsSection) {
      requestAnimationFrame(() => {
        flavorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });
});

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
    checkoutButton.classList.add("is-loading");
    closeMobileCart();
    window.open(checkoutButton.href, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      checkoutButton.classList.remove("is-loading");
    }, 320);
  });
}

if (adminEntry) {
  adminEntry.addEventListener("click", openAdminModal);
}

if (adminClose) {
  adminClose.addEventListener("click", closeAdminModal);
}

if (adminBackdrop) {
  adminBackdrop.addEventListener("click", closeAdminModal);
}

if (adminLogin) {
  adminLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = normalizeText(adminUsername?.value).toLowerCase();
    const password = normalizeText(adminPassword?.value);
    const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;

    if (!isValid) {
      if (adminLoginError) {
        adminLoginError.classList.remove("is-hidden");
      }
      showToast("Login ADM invalido");
      return;
    }

    setAdminAuthenticated(true);
    if (adminLoginError) {
      adminLoginError.classList.add("is-hidden");
    }
    syncAdminView();
    showToast("Painel ADM liberado");
  });
}

if (adminSave) {
  adminSave.addEventListener("click", saveAdminChanges);
}

if (adminLogout) {
  adminLogout.addEventListener("click", () => {
    setAdminAuthenticated(false);
    syncAdminView();
    if (adminUsername) adminUsername.value = "";
    if (adminPassword) adminPassword.value = "";
    showToast("Sessao ADM encerrada");
  });
}

window.addEventListener("resize", () => {
  if (!isMobileViewport()) {
    closeMobileCart();
  }
});

updatePaymentSelection();
updateDeliverySelection();
applyInventoryToUi();
bindFlavorChips();
renderCart();
syncAdminView();
