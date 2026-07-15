import api from "../api/axios";

const orderService = {

    async getOrders() {
        const response = await api.get("/orders");

        return response.data;
    },
};

export default orderService;