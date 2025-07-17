const baseURL =
    import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductData {
    constructor() {
        // this.category = category;
        // this.path = `../public/json/${this.category}.json`;
    }
    async getData(category) {
        try {
            const response = await fetch(`${baseURL}products/search/${category}`);
            const data = await convertToJson(response);

            return data.Result;
        } catch (err) {
            console.error("Error fetching product data by category:", err);
            return [];
        }
    }
    async findProductById(id) {
        try {
            const response = await fetch(`${baseURL}product/${id}`);
            const data = await convertToJson(response);
            console.log(data.Result);
            return data.Result;
        } catch (err) {
            console.error("Error fetching product by ID:", err);
            return null;
        }
    }

    async searchProducts(query) {
        try {
            const baseURL =
                import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${baseURL}products/search?q=${query}`);
            const data = await convertToJson(response);
            return data.Result;
        } catch (err) {
            console.error("Error searching for products:", err);
            return [];
        }

    }
}