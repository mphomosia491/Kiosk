import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav>
            <h2>Kiosk</h2>

            <Link to="/">Products</Link>

            <Link to="/wallet">Wallet</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>

            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;