import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

    return newItem;
}
/**
+ * Calculate and display the total price below the items.
+ * Assumes your HTML has:
+ *   <div class="cart-footer hide">
+ *     <p class="cart-total">Total: </p>
+ *   </div>
+ */
function renderCartTotal() {
    const cartItems = getLocalStorage("so-cart") || [];
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    const totalEl = document.querySelector(".cart-total");
    const footer = document.querySelector(".cart-footer");
    if (!totalEl || !footer) return;
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
    footer.classList.toggle("hide", cartItems.length === 0);
}

renderCartContents();
renderCartTotal();