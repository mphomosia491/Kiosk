import api from "../api/axios";

const walletService = {

    async getBalance() {
        const response = await api.post("/wallet/balance");

        return response.data;
    },

    async fundWallet(amount) {
        const response = await api.post("/wallet/fund", {
            amount,
        });

        return response.data;
    },
};

export default walletService;