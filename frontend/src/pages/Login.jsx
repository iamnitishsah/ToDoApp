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
    }, []);

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        New User? Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
