const flavorTabs = Array.from(document.querySelectorAll(".flavor-tab"));
const flavorPanels = Array.from(document.querySelectorAll(".flavor-brand-panel"));
const flavorButtons = Array.from(document.querySelectorAll("[data-flavor-target]"));
const flavorChips = Array.from(document.querySelectorAll(".flavor-chip"));
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
const whatsappBase = "https://wa.me/557588442493?text=";
const cartItems = [];
let selectedPayment = "";
let selectedDelivery = "";
const productPrices = {
  "NIKBAR 30K": 110,
  "VNANO": 79.9,
  "IGNITE V155": 120,
  "V80 IGNITE": 110,
  "ELFBAR DUKE 35K": 140,
  "ELFBAR 10K": 100,
  "ELFBAR 45K PUFFS": 160
};

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

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
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

function openMobileCart() {
  if (!isMobileViewport() || !orderPanel || !orderOverlay) {
    return;
  }

  orderPanel.classList.add("is-open");
  orderOverlay.hidden = false;
  document.body.classList.add("cart-open");
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

function closeMobileCart() {
  if (!orderPanel || !orderOverlay) {
    return;
  }

  orderPanel.classList.remove("is-open");
  orderOverlay.hidden = true;
  document.body.classList.remove("cart-open");
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
    const showForm = selectedDelivery === "Entrega";
    deliveryForm.classList.toggle("is-hidden", !showForm);
  }

  updateDeliveryFormState();
}

function isDeliveryFormValid() {
  return Boolean(
    normalizeText(deliveryAddress?.value || "") &&
    normalizeText(deliveryNeighborhood?.value || "") &&
    normalizeText(deliveryReference?.value || "")
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
    const price = productPrices[item.model] || 0;
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
      `💳 ${selectedPayment}`,
      "📍 Retirada",
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
    `💳 ${selectedPayment}`,
    `📍 ${normalizeText(deliveryAddress?.value || "")} - Bairro ${normalizeText(deliveryNeighborhood?.value || "")}`,
    `📌 Ref.: ${normalizeText(deliveryReference?.value || "")}`,
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

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeCartItem(index);
    return;
  }

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
        <button class="order-remove" type="button" data-action="remove" data-index="${index}" aria-label="Remover ${item.flavor}">
          Remover
        </button>
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

function addToCart(chip) {
  const panel = chip.closest(".flavor-brand-panel");
  const highlight = chip.closest(".flavor-highlight");
  const brand = normalizeText(
    highlight?.closest(".flavor-brand-panel")?.querySelector(".flavor-panel-head h4")?.textContent ||
    panel?.querySelector(".flavor-panel-head h4")?.textContent ||
    "Cristal Pods"
  );
  const model = normalizeText(
    highlight?.querySelector(".flavor-product-info h5")?.textContent ||
    panel?.querySelector(".flavor-panel-head h4")?.textContent ||
    "Modelo"
  );
  const flavor = normalizeText(chip.textContent || "");

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

flavorChips.forEach((chip) => {
  chip.setAttribute("role", "button");
  chip.setAttribute("tabindex", "0");
  chip.setAttribute("aria-label", `Adicionar ${normalizeText(chip.textContent || "")} ao carrinho`);

  chip.addEventListener("click", () => addToCart(chip));
  chip.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      addToCart(chip);
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

    window.setTimeout(() => {
      checkoutButton.classList.remove("is-loading");
      window.open(checkoutButton.href, "_blank", "noopener,noreferrer");
    }, 520);
  });
}

window.addEventListener("resize", () => {
  if (!isMobileViewport()) {
    closeMobileCart();
  }
});

updatePaymentSelection();
updateDeliverySelection();
renderCart();
