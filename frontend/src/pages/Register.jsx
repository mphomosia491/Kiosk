import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios";
import { useState } from "react";

function Register(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/register",
                form
            );
            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            navigate("/");
        }catch (err) {
            setError(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }

    };
    return(
        <div>
            <h1> Create Account </h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Register"}
                </button>
            </form>
            <p>
                Already have an account?
                <Link to="/login"> Login </Link>
            </p>
        </div>
    );
}
export default Register;