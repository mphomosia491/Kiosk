import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import {
    ShoppingBag,
    Wallet,
    Truck,
    Store,
    CreditCard,
    PlusCircle,
    ShieldCheck,
    Lock,
    X,
    MapPin,
    ArrowRight
} from "lucide-react";

import cartService from "../services/cartService";
import walletService from "../services/walletService";

import "./checkout-modal.css";

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

    const deliveryFee =
        deliveryType === "delivery"
            ? 100
            : 0;

    const finalTotal =
        total + deliveryFee;

    const hasEnoughBalance =
        walletBalance >= finalTotal;

    const amountNeeded = Math.round(
        finalTotal - walletBalance,
        0
    );

    const fundWallet = async () => {

        if (!fundAmount) return;

        try {

            setFunding(true);

            const wallet =
                await walletService.fundWallet(
                    Number(fundAmount)
                );

            setMessage(wallet.message);

            setFundAmount("");

            await refreshWallet();

        } catch (err) {

            setMessage(
                err.response?.data?.message ??
                "Unable to fund wallet."
            );

        } finally {

            setFunding(false);

        }

    };

    const checkout = async () => {

        if (
            deliveryType === "delivery" &&
            !deliveryAddress.trim()
        ) {

            setMessage(
                "Delivery address is required"
            );

            return;

        }

        try {

            setCheckingOut(true);

            const order =
                await cartService.checkout({

                    delivery_type:
                        deliveryType,

                    delivery_address:

                        deliveryType === "delivery"

                            ? deliveryAddress

                            : null,

                });

            setMessage(order.message);

            await refreshWallet();

            onClose();

        } catch (err) {

            setMessage(
                err.response?.data?.message ??
                "Checkout failed"
            );

        } finally {

            setCheckingOut(false);

        }

    };

    return (

        <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {

                if (!open) {

                    onClose();

                }

            }}
        >

            <Dialog.Portal>

                <Dialog.Overlay className="checkout-overlay" />

                <Dialog.Content className="checkout-modal">

                    <button
                        className="checkout-close"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>

                    <div className="checkout-header">

                        <div className="checkout-header-icon">

                            <ShoppingBag size={34} />

                        </div>

                        <div>

                            <Dialog.Title className="checkout-title">

                                Secure Checkout

                            </Dialog.Title>

                            <p className="checkout-subtitle">

                                Complete your Blue Reserve purchase securely.

                            </p>

                        </div>

                    </div>

                    <div className="checkout-grid">

                        <div className="checkout-left">

                            <div className="checkout-card">

                                <div className="card-title">

                                    <ShoppingBag size={20} />

                                    <span>Order Summary</span>

                                </div>

                                <div className="summary-row">

                                    <span>Subtotal</span>

                                    <strong>

                                        R{total.toFixed(2)}

                                    </strong>

                                </div>

                                <div className="summary-row">

                                    <span>Delivery</span>

                                    <strong>

                                        R{deliveryFee.toFixed(2)}

                                    </strong>

                                </div>

                                <div className="summary-total">

                                    <span>Total</span>

                                    <strong>

                                        R{finalTotal.toFixed(2)}

                                    </strong>

                                </div>

                            </div>

                            <div className="checkout-card">

                                <div className="card-title">

                                    <Wallet size={20} />

                                    <span>Wallet</span>

                                </div>

                                <div className="wallet-balance">

                                    R{walletBalance.toFixed(2)}

                                </div>

                                                                {hasEnoughBalance ? (

                                    <div className="balance-success">

                                        <ShieldCheck size={18} />

                                        <div>

                                            <strong>
                                                Wallet Ready
                                            </strong>

                                            <p>
                                                You have sufficient funds to complete this purchase.
                                            </p>

                                        </div>

                                    </div>

                                ) : (

                                    <div className="balance-error">

                                        <CreditCard size={18} />

                                        <div>

                                            <strong>
                                                Insufficient Funds
                                            </strong>

                                            <p>

                                                Add at least

                                                {" "}

                                                <span>

                                                    R{amountNeeded.toFixed(2)}

                                                </span>

                                                {" "}

                                                to continue.

                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                            {!hasEnoughBalance && (

                                <div className="checkout-card">

                                    <div className="card-title">

                                        <PlusCircle size={20} />

                                        <span>

                                            Add Funds

                                        </span>

                                    </div>

                                    <input

                                        className="checkout-input"

                                        type="number"

                                        placeholder="Enter amount"

                                        value={fundAmount}

                                        onChange={(e)=>

                                            setFundAmount(e.target.value)

                                        }

                                    />

                                    <button

                                        className="gold-button"

                                        onClick={fundWallet}

                                        disabled={funding}

                                    >

                                        <PlusCircle size={18}/>

                                        {

                                            funding

                                                ? "Adding..."

                                                : "Add Funds"

                                        }

                                    </button>

                                    {message && (

                                        <p className="checkout-message">

                                            {message}

                                        </p>

                                    )}

                                </div>

                            )}

                        </div>

                        <div className="checkout-right">

                            <div className="checkout-card">

                                <div className="card-title">

                                    <Truck size={20}/>

                                    <span>

                                        Delivery Method

                                    </span>

                                </div>

                                <div className="delivery-options">

                                    <label

                                        className={`delivery-card ${
                                            deliveryType === "pickup"
                                                ? "active"
                                                : ""
                                        }`}

                                    >

                                        <input

                                            type="radio"

                                            checked={
                                                deliveryType === "pickup"
                                            }

                                            onChange={()=>

                                                setDeliveryType("pickup")

                                            }

                                        />

                                        <Store size={24}/>

                                        <div>

                                            <h4>

                                                Pickup

                                            </h4>

                                            <p>

                                                Collect from our boutique.

                                            </p>

                                        </div>

                                    </label>

                                    <label

                                        className={`delivery-card ${
                                            deliveryType === "delivery"
                                                ? "active"
                                                : ""
                                        }`}

                                    >

                                        <input

                                            type="radio"

                                            checked={
                                                deliveryType === "delivery"
                                            }

                                            onChange={()=>

                                                setDeliveryType("delivery")

                                            }

                                        />

                                        <Truck size={24}/>

                                        <div>

                                            <h4>

                                                Delivery

                                            </h4>

                                            <p>

                                                Premium delivery (+R100)

                                            </p>

                                        </div>

                                    </label>

                                </div>

                            </div>

                            {deliveryType === "delivery" && (

                                <div className="checkout-card">

                                    <div className="card-title">

                                        <MapPin size={20}/>

                                        <span>

                                            Delivery Address

                                        </span>

                                    </div>

                                    <textarea

                                        className="checkout-textarea"

                                        placeholder="Enter your delivery address..."

                                        rows="5"

                                        value={deliveryAddress}

                                        onChange={(e)=>

                                            setDeliveryAddress(
                                                e.target.value
                                            )

                                        }

                                    />

                                </div>

                            )}
                                    <div className="checkout-card secure-card">

                                <div className="secure-header">

                                    <Lock size={20} />

                                    <span>Secure Payment</span>

                                </div>

                                <p>

                                    Your wallet payment is encrypted and protected.
                                    Blue Reserve uses secure transaction processing to
                                    keep your purchase safe.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="checkout-footer">

                        <button
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="confirm-button"
                            onClick={checkout}
                            disabled={
                                checkingOut ||
                                !hasEnoughBalance
                            }
                        >

                            <Lock size={18} />

                            {

                                checkingOut

                                    ? "Processing..."

                                    : "Confirm Order"

                            }

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </Dialog.Content>

            </Dialog.Portal>

        </Dialog.Root>

    );

}

export default CheckoutModal;