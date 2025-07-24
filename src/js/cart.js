import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const eur = (usd) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    usd * 0.85,
  );

function renderCartContents() {
  // ✅ ensure an array
  const cartItems = getLocalStorage("so-cart") || [];

  // If the cart is empty, show a friendly message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty 😢</p>";
    document.querySelector(".cart-footer").classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Attach event listeners to quantity inputs
  document.querySelectorAll(".cart-card__quantity").forEach((input) => {
    input.addEventListener("change", (event) => {
      const newQty = parseInt(event.target.value);
      const id = event.target.dataset.id;
      updateCartQuantity(id, newQty);
    });
  });
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <label for="quantity-${item.Id}">Quantity:</label>
      <input type="number" id="quantity-${item.Id}" class="cart-card__quantity" data-id="${item.Id}" value="${item.quantity || 1}" min="1" />
      <p class="cart-card__price">${eur(item.FinalPrice * (item.quantity || 1))}</p>
    </li>`;
}

function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.FinalPrice * qty;
  }, 0);

  const totalEl = document.querySelector(".cart-total");
  const footer = document.querySelector(".cart-footer");
  if (!totalEl || !footer) return;

  totalEl.textContent = `Total: ${eur(total)}`;
  footer.classList.toggle("hide", cartItems.length === 0);
}

function updateCartQuantity(id, newQty) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.map((item) => {
    if (item.Id === id || item.Id == id) {
      return { ...item, quantity: newQty };
    }
    return item;
  });
  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  renderCartContents();
  renderCartTotal();
}

renderCartContents();
renderCartTotal();
