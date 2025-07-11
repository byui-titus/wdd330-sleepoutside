// js/cartBadge.js
import { getLocalStorage } from "./utils.mjs";

export function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const cart = getLocalStorage("so-cart") || [];
    badge.textContent = cart.length;
    badge.style.display = cart.length ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", updateCartBadge);