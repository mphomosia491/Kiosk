import "./product-card.css";

function ProductCard({ product, onAddToCart }) {
    return (
        <article className="product-card">

            <div className="product-image">
                <img
                    src={product.image_url}
                    alt={product.name}
                />
            </div>

            <div className="product-content">

                <h3>{product.name}</h3>

                <p className="product-brand">
                    {product.brand.toUpperCase()}
                </p>

                <div className="gold-divider"></div>

                <p className="product-price">
                    R {Number(product.price).toLocaleString()}
                </p>

                <span className="product-stock">
                    In Stock: {product.stock}
                </span>

                <button
                    className="add-cart-btn"
                    onClick={() => onAddToCart(product.id)}
                >
                    Add To Cart
                </button>

            </div>

        </article>
    );
}

export default ProductCard;