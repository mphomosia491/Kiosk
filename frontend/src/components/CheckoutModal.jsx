import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import api from "../api/axios";

function CheckoutModal({
    isOpen,
    onClose,
    total,
    walletBalance, 
    refreshWallet
}) {
    const [deliveryType, setDeliveryType] = useState("pickup");
    const [fundAmount, setFundAmount] = useState("");
    const [funding, setFunding] = useState(false);
    const [message, setMessage] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [checkingOut, setCheckingOut] = useState(false);

    const deliveryFee = deliveryType === "delivery" ? 100 : 0;
    const finalTotal = total + deliveryFee;

    const hasEnoughBalance = walletBalance >= finalTotal;

    const amountNeeded = Math.round(
        finalTotal - walletBalance,
        0
    );

    const fundWallet = async () => {
        if(!fundAmount) return;

        try{
            setFunding(true);

            const response = await api.post("/wallet/fund",
                {
                    amount: Number(fundAmount),
                }
            );

            setMessage(response.data.message);

            setFundAmount("");

            await refreshWallet();
        }catch (err) {
            setMessage(
                err.response?.data?.message ?? "Unable to fund wallet."
            );
        }finally{
            setFunding(false);
        }
    }

    const checkout = async () => {
        if (
            deliveryType === "delivery" && 
            !deliveryAddress.trim()
        ){
            setMessage("Delivery address is required");
            return;
        }
        try{
            setCheckingOut(true);

            const response = await api.post("/cart/checkout",
                {
                    delivery_type: deliveryType,
                    delivery_address:
                    deliveryType === "delivery"
                        ? deliveryAddress
                        : null,
                }
            );
            setMessage(response.data.message);

            await refreshWallet();

            onClose();
        }catch (err) {
            setMessage(
                err.response?.data?.message ?? "Checkout failed"
            );
        }finally {
            setCheckingOut(false);
        }
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (!open){
                    onClose();
                }
            }}
        >
            <Dialog.Portal>

                <Dialog.Overlay
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                    }}
                />

                <Dialog.Content
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "2rem",
                        borderRadius: "12px",
                        width: "500px",
                        maxWidth: "90vw",
                    }}
                >

                <Dialog.Title>
                    Checkout
                </Dialog.Title>

                <hr />

                <h3>Order Summary</h3>

                <p> Subtotal: R{total.toFixed(2)}</p>
                <p> Delivery Fee: R{deliveryFee.toFixed(2)}</p>

                <h3>Final Total: R{finalTotal.toFixed(2)} </h3>
                
                {hasEnoughBalance ? (
                    <p
                        style={{
                            color: "green",
                            fontWeight: "semibold",
                        }}
                    >
                        ✓ Sufficient wallet balance
                    </p>
                ) : (
                    <p
                        style={{
                            color: "red",
                            fontWeight: "semibold"
                        }}>
                        Insufficient funds.
                        <br />
                        At least R{amountNeeded.toFixed(2)} extra funds needed.
                    </p>
                )} 
                {!hasEnoughBalance && (
                    <> 
                        <hr />

                        <h3>Add Funds</h3>

                        <input 
                            type="number" 
                            placeholder="Amount"
                            value={fundAmount}
                            onChange={(e) => 
                                setFundAmount(e.target.value)
                            }
                        />

                        <button 
                            onClick={fundWallet}
                            disabled={funding}
                        >
                            {funding 
                                ? "Adding..."
                                : "Add Funds"}
                        </button>
                        {message && (
                            <p>{message}</p>
                        )}
                    </>
                )}
                <hr />

                <h3>Wallet</h3>

                <p>
                    Available Balance: R{walletBalance.toFixed(2)}
                </p>

                <hr />

                <h3>Delivery Type</h3>

                <label>
                    <input 
                        type="radio"
                        checked={deliveryType === "pickup"}
                        onChange={() => 
                            setDeliveryType("pickup")
                        } 
                    />
                    Pickup
                </label>

                <label>
                    <input 
                        type="radio"
                        checked={deliveryType === "delivery"}
                        onChange={() => 
                            setDeliveryType("delivery")
                        } 
                    />
                    Delivery (+R100)
                </label>

                {deliveryType === "delivery" && (
                    <>
                        <hr />

                        <h4> Delivery Address </h4>

                        <textarea 
                            placeholder="Enter Delivery address" 
                            rows="4"
                            value={deliveryAddress}
                            onChange={(e) => 
                                setDeliveryAddress(e.target.value)
                            }
                        />
                    </>
                )}

                <br />

                <button onClick={onClose}>
                    Cancel
                </button>

                <button
                    onClick={checkout}
                    disabled={
                        checkingOut || !hasEnoughBalance
                    }
                >
                    {checkingOut
                        ? "Processing..."
                        : "Confirm Order"
                    }
                </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CheckoutModal;