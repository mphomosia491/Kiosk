import "./navbar.css";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <h2>Blue reserve</h2>
            </div>
            
            <div className="navbar-links">

                <NavLink to="/">Products</NavLink>

                <NavLink to="/wallet">Wallet</NavLink>

                <NavLink to="/cart">Cart</NavLink>

                <NavLink to="/orders">Orders</NavLink>

            </div>
           
            <div>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
           
        </nav>
    );
}

export default Navbar;