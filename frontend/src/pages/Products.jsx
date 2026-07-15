import { useEffect, useState } from "react";
import productService from "../services/productService";
import Navbar from "../components/NavBar";

function Products(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const products = await productService.getProducts();

            setProducts(products);

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
            await productService.addToCart(productId);

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
            <Navbar />
            
            <h1>Products</h1>
            
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