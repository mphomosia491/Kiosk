import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import walletService from "../services/walletService";

function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadBalance();
    }, []);

    const loadBalance = async () => {
        try {
            const wallet = await walletService.getBalance();
            setBalance(wallet.balance);

        } catch (err) {
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    const fundWallet = async (e) => {
        e.preventDefault();

        setMessage("");

        try{
            const wallet = await walletService.fundWallet(
                Number(amount)
            );

            setBalance(wallet.balance);

            setAmount("");

            setMessage("Funds added successfully");
        } catch (err) {
            console.error(err);
            
            setMessage(
                err.response?.data?.message ?? "Unable to fund wallet.");
        }
    };
    if (loading) {
        return <h2>Loading wallet...</h2>
    }

    return (
        <>
            <Navbar />

            <h1> Wallet </h1>
            
            <h2>Available Balance</h2>

            <h1>R{balance.toFixed(2)}</h1>

            {message && (
                <p>{message}</p>
            )}

            <form onSubmit={fundWallet}>
                <input 
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => 
                        setAmount(e.target.value)
                    }
                />

                <button type="submit">
                    Add funds
                </button>

            </form>
        </>
    );
}

export default Wallet;