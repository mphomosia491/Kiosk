import { useEffect, useMemo, useState } from "react";
import {
    ShoppingBag,
    Package,
    Wallet,
    Crown,
    TrendingUp,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import orderService from "../services/orderService";
import Layout from "../components/ui/Layout/Layout";

import "./orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrders, setExpandedOrders] = useState({});

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const orders = await orderService.getOrders();

            setOrders(orders);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const toggleOrder = (orderId) => {

    setExpandedOrders((prev) => ({

        ...prev,

        [orderId]: !prev[orderId],

    }));

};

    const totalOrders = orders.length;

    const totalSpent = useMemo(() => {

        return orders.reduce((sum, order) => {

            return sum + Number(order.total_price);

        }, 0);

    }, [orders]);

    const averageOrder = useMemo(() => {

        if (!orders.length) return 0;

        return totalSpent / orders.length;

    }, [orders, totalSpent]);

    if (loading) {

        return (

            <Layout>

                <section className="order-loading">

                    <Package
                        size={42}
                        strokeWidth={1.5}
                    />

                    <h2>Loading Your Orders...</h2>

                    <p>
                        Retrieving your luxury fragrance purchases.
                    </p>

                </section>

            </Layout>

        );

    }

    return (

        <Layout>

            <section className="order-page">

                <section className="order-hero">

                    <div className="order-hero-content">

                        <span className="order-hero-tag">

                            BLUE RESERVE

                        </span>

                        <h1 className="order-title">

                            My Orders

                        </h1>

                        <p className="order-subtitle">

                            Review every luxury fragrance you've purchased,
                            revisit previous orders, and keep track of your
                            growing collection.

                        </p>

                    </div>

                    <div className="order-hero-summary">

                        <ShoppingBag
                            size={28}
                            strokeWidth={1.6}
                        />

                        <div>

                            <span>

                                Total Purchases

                            </span>

                            <strong>

                                {totalOrders}

                            </strong>

                        </div>

                    </div>

                </section>

                <section className="order-stats">

                    <article className="order-stat-card">

                        <div className="order-stat-icon">

                            <Package />

                        </div>

                        <span className="order-stat-label">

                            Total Orders

                        </span>

                        <h2>

                            {totalOrders}

                        </h2>

                        <small>

                            Lifetime Purchases

                        </small>

                    </article>

                    <article className="order-stat-card">

                        <div className="order-stat-icon">

                            <Wallet />

                        </div>

                        <span className="order-stat-label">

                            Total Spent

                        </span>

                        <h2>

                            R{totalSpent.toFixed(2)}

                        </h2>

                        <small>

                            Across All Orders

                        </small>

                    </article>

                    <article className="order-stat-card">

                        <div className="order-stat-icon">

                            <Crown />

                        </div>

                        <span className="order-stat-label">

                            Favourite Brand

                        </span>

                        <h2>

                            --

                        </h2>

                        <small>

                            Coming Soon

                        </small>

                    </article>

                    <article className="order-stat-card">

                        <div className="order-stat-icon">

                            <TrendingUp />

                        </div>

                        <span className="order-stat-label">

                            Average Order

                        </span>

                        <h2>

                            R{averageOrder.toFixed(2)}

                        </h2>

                        <small>

                            Per Purchase

                        </small>

                    </article>

                </section>
                {orders.length === 0 ? (

                    <section className="order-empty-state">

                        <ShoppingBag
                            size={70}
                            strokeWidth={1.3}
                        />

                        <h2>
                            Your Collection Awaits
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                            Once you purchase your first fragrance,
                            it will appear here.
                        </p>

                    </section>

                ) : (

                    <section className="order-list">

                        {orders.map((order) => (

                            <article
                                key={order.id}
                                className="order-card"
                            >

                                <div className="order-card-header">

                                    <div className="order-card-title">

                                        <span className="order-label">

                                            ORDER NUMBER

                                        </span>

                                        <h2>

                                            {order.order_number}

                                        </h2>

                                    </div>

                                    <div className="order-total">

                                        <span>

                                            Total Amount

                                        </span>

                                        <h2>

                                            R{Number(order.total_price).toFixed(2)}

                                        </h2>

                                    </div>

                                </div>

                                <div className="order-information-row">

                                    <div className="order-pill">

                                        <Package
                                            size={16}
                                            strokeWidth={1.8}
                                        />

                                        <span>

                                            {order.status}

                                        </span>

                                    </div>

                                    <div className="order-pill">

                                        <ShoppingBag
                                            size={16}
                                            strokeWidth={1.8}
                                        />

                                        <span>

                                            {order.delivery_type}

                                        </span>

                                    </div>

                                    <div className="order-pill">

                                        <Package
                                            size={16}
                                            strokeWidth={1.8}
                                        />

                                        <span>

                                            {order.items.length}

                                            {" "}

                                            Item{order.items.length !== 1 && "s"}

                                        </span>

                                    </div>

                                </div>

                                {order.delivery_type === "delivery" && (

                                    <div className="order-address-card">

                                        <h4>

                                            Delivery Address

                                        </h4>

                                        <p>

                                            {order.delivery_address}

                                        </p>

                                    </div>

                                )}

                                <section className="order-products-section">

                                   <div className="order-products-header">

    <div>

        <h3>

            Products Purchased

        </h3>

        <span>

            {order.items.length} Item{order.items.length !== 1 && "s"}

        </span>

    </div>

    <button
        type="button"
        className="order-collapse-button"
        onClick={() => toggleOrder(order.id)}
    >

        {expandedOrders[order.id] ? (

            <>

                Hide Fragrances

                <ChevronUp size={18} />

            </>

        ) : (

            <>

                View Fragrances

                <ChevronDown size={18} />

            </>

        )}

    </button>

</div>
{expandedOrders[order.id] && (

                                    <div className="order-products-grid">

                                        {order.items.map((item) => (

                                            <article
                                                key={item.id}
                                                className="order-product-card"
                                            >

                                                <div className="order-product-image-container">

                                                    <img

                                                        className="order-product-image"

                                                        src={item.product.image_url}

                                                        alt={item.product.name}

                                                    />

                                                </div>

                                                <div className="order-product-content">

                                                    <h4>

                                                        {item.product.name}

                                                    </h4>

                                                    <p className="order-product-brand">

                                                        {item.product.brand}

                                                    </p>

                                                    <div className="order-product-divider"></div>

                                                    <div className="order-product-footer">

                                                        <span>

                                                            Qty {item.quantity ?? 1}

                                                        </span>

                                                        <strong>

                                                            R{Number(item.price).toFixed(2)}

                                                        </strong>

                                                    </div>

                                                </div>

                                            </article>

                                        ))}

                                    </div>
)}

                                </section>
                                <div className="order-card-footer">

                                    <div className="order-payment-section">

                                        <div className="order-payment-icon">

                                            <Wallet
                                                size={20}
                                                strokeWidth={1.8}
                                            />

                                        </div>

                                        <div className="order-payment-details">

                                            <span className="order-payment-title">

                                                Payment Method

                                            </span>

                                            <strong>

                                                Wallet Payment

                                            </strong>

                                            <small>

                                                Secure purchase completed successfully

                                            </small>

                                        </div>

                                    </div>

                                    <div className="order-footer-actions">

                                        <p className="order-thank-you">

                                            Thank you for choosing
                                            <span> Blue Reserve</span>

                                        </p>

                                        <button
                                            type="button"
                                            className="order-details-button"
                                        >

                                            View Order Details

                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </section>

                )}

            </section>

        </Layout>

    );

}

export default Orders;