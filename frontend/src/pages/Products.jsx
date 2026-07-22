import { useEffect, useState } from "react";
import productService from "../services/productService";
import Layout from "../components/ui/Layout/Layout";
import "./products.css";
import ProductCard from "../components/ui/ProductCard/ProductCard";
import HeroSection from "../components/ui/Hero/HeroSection";
import SectionHeading from "../components/ui/SectionHeading/SectionHeading";

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
            <Layout>
            
            <HeroSection />


            <SectionHeading 
                label="BLUE RESERVE"
                title="Our collection"
                subtitle="Curated luxury fragrances selected for timeless elegance"
            />

            <section className="products-grid">

                {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                />
                ))}

            </section>
            </Layout>
    );

}
export default Products;