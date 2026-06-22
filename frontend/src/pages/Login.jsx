import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await api.post(
                "/login",
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
                err.response?.data?.message || "Login failed"
            );
        }
    };
    return(
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">
                    Login
                </button>
            </form>
            <p>
                Don't have an account?
                <Link to="/register">Register</Link>
            </p>
        </div>
    )
}
export default Login;