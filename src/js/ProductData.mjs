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
    async checkout(payload) {
        const baseURL =
            import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(`${baseURL}checkout`, options);

            if (!response.ok) {
                const errorText = await response.text(); // Try to read full raw text of the error
                console.error("Raw server error response:", errorText);
                throw new Error(`Checkout failed: ${response.status} ${response.statusText}`);
            }

            return await response.json(); // Success: parse response JSON
        } catch (err) {
            console.error("Checkout error:", err);
            throw err;
        }
    }


}