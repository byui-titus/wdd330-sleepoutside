const baseURL =
    import.meta.env.VITE_SERVER_URL;

export default class ProductData {
    async getData(category) {
        try {
            const response = await fetch(`${baseURL}products/search/${category}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.Result;
        } catch (error) {
            console.error("Failed to fetch product data:", error);
            return [];
        }
    }

    async findProductById(id) {
        try {
            const response = await fetch(`${baseURL}product/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.Result;
        } catch (error) {
            console.error("Failed to fetch product details:", error);
            return {};
        }
    }
    async searchProducts(query) {
        const baseURL =
            import.meta.env.VITE_SERVER_URL;

        try {
            const url = `${baseURL}products/search?q=${encodeURIComponent(query)}`;
            console.log("Fetching from:", url); // Debugging

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            if (!data || !data.Result) {
                throw new Error("No 'Result' found in response.");
            }

            return data.Result;
        } catch (error) {
            console.error("Error in searchProducts:", error.message || error);
            return [];
        }
    }
}