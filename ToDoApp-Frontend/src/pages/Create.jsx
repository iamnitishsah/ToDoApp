import { ACCESS_TOKEN } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/api/task/",
                { title, description, deadline },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("Task created successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">
                    Create a New Task
                </h2>
                <form onSubmit={handleCreateTask} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Title:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Description:
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows="5"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Deadline:
                        </label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 no-underline hover:opacity-90"                  >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
