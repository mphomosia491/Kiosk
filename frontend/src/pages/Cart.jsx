import { useEffect, useState } from "react";
import "./cart.css";

import {
    ShoppingBag,
    ShieldCheck,
    Truck,
    RotateCcw,
    Trash2,
    Plus,
    Minus,
    Lock,
    ArrowRight
} from "lucide-react";

import cartService from "../services/cartService";
import CheckoutModal from "../components/CheckoutModal";
import walletService from "../services/walletService";
import Layout from "../components/ui/Layout/Layout";

function Cart() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);

    const openCheckout = () => {
        setShowCheckout(true);
    };

    const closeCheckout = () => {
        setShowCheckout(false);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const items = await cartService.getCart();

            setItems(items);

            let sum = 0;

            items.forEach((item) => {
                sum += item.price * item.quantity;
            });

            setTotal(sum);

            const wallet = await walletService.getBalance();

            setWalletBalance(wallet.balance);

        } catch (err) {
            console.error(err);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await cartService.removeItem(itemId);
            await loadCart();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>

<div className="cart-page">

    <div className="cart-header">

        <h1>Shopping Cart</h1>

        <p>
            Review your selected fragrances before checkout.
        </p>

    </div>

    {items.length === 0 ? (

        <div className="empty-cart">

            <ShoppingBag size={70} />

            <h2>Your cart is empty</h2>

            <p>
                Explore our luxury fragrance collection.
            </p>

        </div>

    ) : (

        <div className="cart-layout">

            <div className="cart-items">

                {items.map((item) => (

                    <div
                        className="cart-card"
                        key={item.id}
                    >

                        <div className="cart-image">

                            <img
                                src={item.product.image_url}
                                alt={item.product.name}
                            />

                        </div>

                        <div className="cart-details">

                            <h2>

                                {item.product.name}

                            </h2>

                            <h3 className="fragrance-type">

                                {item.product.brand}

                            </h3>

                            <div className="quantity-section">

                                <label>

                                    Quantity

                                </label>

                                <div className="quantity-control">

                                    <button
                                        className="qty-btn"
                                    >

                                        <Minus
                                            size={18}
                                        />

                                    </button>

                                    <span>

                                        {item.quantity}

                                    </span>

                                    <button
                                        className="qty-btn"
                                    >

                                        <Plus
                                            size={18}
                                        />

                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="cart-right">

                            <h3>

                                R{item.price}

                            </h3>

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeItem(item.id)
                                }
                            >

                                <Trash2
                                    size={18}
                                />

                                Remove

                            </button>

                        </div>

                    </div>

                ))}

            </div>

                        <aside className="cart-summary">

                            <h2>
                                <ShoppingBag size={24} />
                                Order Summary
                            </h2>

                            <div className="summary-row">

                                <span>Total</span>

                                <strong>
                                    R{total}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>Wallet Balance</span>

                                <strong>
                                    R{walletBalance}
                                </strong>

                            </div>

                            <button
                                className="checkout-btn"
                                onClick={openCheckout}
                            >
                                <Lock size={18} />
                                Proceed to Checkout
                                <ArrowRight size={18} />
                            </button>

                        </aside>

            <div className="cart-trust">

                <div className="trust-item">
                    <span>
                        <ShieldCheck size={20} />
                    </span>
                    <p>100% Authentic Fragrances</p>
                </div>

                <div className="trust-item">
                    <span>
                        <Truck size={20} />
                    </span>
                        <p>Fast & Secure Delivery</p>
                </div>

                <div className="trust-item">
                    <span>
                        <RotateCcw size={20} />
                    </span>
                        <p>Easy Returns & Support</p>
                </div>

                </div>

                    </div>

                )}

                <CheckoutModal
                    isOpen={showCheckout}
                    onClose={closeCheckout}
                    total={total}
                    walletBalance={walletBalance}
                    refreshWallet={loadCart}
                />

            </div>

        </Layout>
    );
}

export default Cart;