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
    }, [navigate]);

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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                <h1 className="text-3xl font-extrabold text-center text-white mb-6">
                    Welcome Back
                </h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">New here?</p>
                    <button
                        onClick={() => navigate("/register")}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Create an Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
