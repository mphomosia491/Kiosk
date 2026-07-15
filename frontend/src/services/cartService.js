import api from "../api/axios";

const cartService = {
    async getCart() {

        const response = await api.get("/cart");

        return response.data;
    },

    async removeItem(itemId){
        const response = await api.delete(
            `/cart/remove/${itemId}`
        );

        return response.data;
    },

    async checkout(data){
        const response = await api.post(
            "/cart/checkout",
            data
        );
        return response.data;
    },
};
export default cartService;