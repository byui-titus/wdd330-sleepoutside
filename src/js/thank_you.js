// thankyou.js
import { clearLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
            const order = JSON.parse(localStorage.getItem("lastOrder"));
            const detailsEl = document.getElementById("order-details");

            if (!order) {
                detailsEl.innerHTML = "<li>No order found.</li>";
                return;
            }

            detailsEl.innerHTML = `
    <li><strong>Name:</strong> ${order.fname} ${order.lname}</li>
    <li><strong>Address:</strong> ${order.street}, ${order.city}, ${order.state} ${order.zip}</li>
    <li><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</li>
    <li><strong>Total:</strong> €${(order.orderTotal * 0.85).toFixed(2)}</li>
    <li><strong>Items:</strong>
      <ul>
        ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - €${(item.price * 0.85).toFixed(2)}</li>`).join("")}
      </ul>
    </li>
  `;

  // Clear cart after displaying
  clearLocalStorage("so-cart");
  localStorage.removeItem("lastOrder");
});