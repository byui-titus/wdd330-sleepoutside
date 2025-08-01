import {
    getLocalStorage,
    alertMessage,
    removeAllAlerts
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const services = new ProductData();

const eur = (usd) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
        usd * 0.85,
    );

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity || 1, // ✅ include real quantity
        };
    });
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        const totalQty = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
        itemNumElement.innerText = totalQty;
        // calculate the total of all the items in the cart
        this.itemTotal = this.list.reduce((sum, item) => {
            const qty = item.quantity || 1;
            return sum + (item.FinalPrice * qty);
        }, 0);
        summaryElement.innerText = `${eur(this.itemTotal)}`;;
    }

    calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * .06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
                parseFloat(this.itemTotal) +
                parseFloat(this.tax) +
                parseFloat(this.shipping)
            )
            // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `${eur(this.tax.toFixed(2))}`;
        shipping.innerText = `${eur(this.shipping.toFixed(2))}`;
        orderTotal.innerText = `${eur(this.orderTotal.toFixed(2))}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);

        try {
            const response = await services.checkout(json);

            console.log(response);
            // ✅ Save order details to localStorage for the thank you page
            localStorage.setItem("lastOrder", JSON.stringify(json));
            // ✅ Clear form inputs
            formElement.reset();
            // ✅ Clear the cart
            localStorage.removeItem(this.key);
            // ✅ Redirect to thank you page
            window.location.href = "/checkout/thankyou.html";
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
            console.error("Checkout error:", err);
            alert("Checkout failed. Please try again.");
        }

    }
}