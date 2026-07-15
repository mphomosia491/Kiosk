import api from "../api/axios";

const productService = {

    async getProducts() {
        const response = await api.get("/products");

        return response.data;
    },

    async addToCart(productId, quantity = 1) {
        const response = await api.post("/cart/add", {
            product_id: productId,
            quantity,
        });

        return response.data;
    },
};

export default productService;