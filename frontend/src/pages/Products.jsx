import { useEffect, useState } from "react";
import api from "../api/axios"

function Products(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };
    if (loading){
        return <h1>Loading products...</h1>;
    }
    const addToCart = async (productId) =>{
        try {
            await api.post("/cart/add", {
                product_id: productId,
                quantity: 1,
            });

            alert("Product added to cart");
            fetchProducts();
        }catch (err){
            console.error(err);

            alert(
                err.response?.data?.message || "Failed to add product"
            );
        }
    };
    return(
        <div>
            <h1>Products</h1>

            <a href="/cart">
                Go To Cart
            </a>

            {products.map((product) => (
                <div key={product.id}>
                    <img src={product.image_url}
                    alt={product.name}
                    width="200"
                />
                <h3>{product.name}</h3>
                <p>{product.brand}</p>
                <p>R{product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => addToCart(product.id)}>
                    Add To Cart
                </button>
            </div>
            ))}
        </div>
    );

}
export default Products;