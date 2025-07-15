import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartBadge } from "./cartBadge.js";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        // ✅ FIXED ID: "addToCart" instead of "add-to-cart"
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        updateCartBadge();
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

// ✅ FIXED QUERY SELECTORS TO MATCH YOUR HTML
function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Images.PrimaryMedium;
    productImage.alt = product.NameWithoutBrand;

    const euroPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(Number(product.FinalPrice) * 0.85);
    document.getElementById("productPrice").textContent = `${euroPrice}`;

    document.getElementById("productColor").textContent =
        product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML =
        product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
}



// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }