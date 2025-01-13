import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("register/", { username, password });
            if (response.status === 201) {
                alert("Registration successful! Please log in.");
                navigate("/");
            } else {
                alert("Registration failed. Try again.");
            }
        } catch (error) {
            alert("Error during registration.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>
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
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
