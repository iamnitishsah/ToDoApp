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
            const response = await api.post("/api/task/", 
                { title, description, deadline },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    },
                });
            
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
        <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deadline:
                    </label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default CreateTask;
