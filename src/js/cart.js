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
}

function cartItemTemplate(item) {
    return `
    <li class="cart-card divider">
      <a class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">${eur(item.FinalPrice)}</p>
    </li>`;
}

function renderCartTotal() {
    const cartItems = getLocalStorage("so-cart") || [];
    const totalUsd = cartItems.reduce((sum, i) => sum + i.FinalPrice, 0);

    const totalEl = document.querySelector(".cart-total");
    const footer = document.querySelector(".cart-footer");
    if (!totalEl || !footer) return;

    totalEl.textContent = `Total: ${eur(totalUsd)}`;
    footer.classList.toggle("hide", cartItems.length === 0.0);
}

renderCartContents();
renderCartTotal();