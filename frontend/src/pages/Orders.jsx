import { useEffect, useState } from "react";
import orderService from "../services/orderService";


function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <h2>Loading Orders...</h2>
    }
    return (
        <div>

            <h1>My Orders</h1>


            {orders.length === 0 ? (
                <h3>No orders found</h3>
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <h3>{order.order_number}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total: R{Number(order.total_price).toFixed(2)}</p>
                        <p>Delivery: {order.delivery_type}</p>
                        {order.delivery_type === "delivery" && (
                            <p>
                                <strong>Address:</strong><br />
                                {order.delivery_address}
                            </p>
                        )}
                        <hr />

                        <h4>Products Purchased</h4>

                        {order.items.map((item) => (
                            <div 
                                key={item.id}
                                style={{
                                    marginBottom: "1rem",
                                }}
                            >
                                <img 
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    width="100"
                                />
                                <p>
                                    <strong>{item.product.name}</strong>
                                </p>
                                <p>
                                    Brand: {item.product.brand}
                                </p>
                                <p>
                                    Price: R{Number(item.price).toFixed(2)}
                                </p>
                            </div>
                            
                        ))}
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;