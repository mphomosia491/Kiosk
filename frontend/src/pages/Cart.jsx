import { useEffect, useState } from "react";
import api from "../api/axios";

function Cart(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const response = await api.get("/cart");
            setItems(response.data);

            let sum = 0;

            response.data.forEach((item) => {
                sum += item.price * item.quantity;
            });
            setTotal(sum);
        }catch (err){
            console.error(err);
        }
    };
    const removeItem = async (itemId) => {
        try{
            await api.delete(`/cart/remove/${itemId}`);
            loadCart();
        } catch (err){
            console.error(err);
        }
    };
    return (
        <div>
            <h1>My Cart</h1>
            {items.length === 0 ? (
                <h3>Cart is empty</h3>
            ) : (
                <>
                {items.map((item) => (
                    <div key={item.id}>
                        <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            width="120"
                        />
                        <h3>{item.product.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                            Price:
                            R{item.price}
                        </p>
                        <button onClick={() =>
                            removedItem(item.id)
                        }>
                            Remove
                        </button>
                    </div>
                ))}
                <hr />
                <h2>
                    Total: R{total}
                </h2>
                </>
            )}
        </div>
    );
}
export default Cart;