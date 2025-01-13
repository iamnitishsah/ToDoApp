import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            navigate("/dashboard");
        }
    }, [])
    

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            console.error("Error during login:", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;