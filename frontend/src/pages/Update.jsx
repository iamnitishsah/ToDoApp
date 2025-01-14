import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function UpdateTask() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        try {
            const response = await api.get(`/api/task/${id}/`);
            const { title, description, deadline } = response.data;
            setTitle(title);
            setDescription(description);
            setDeadline(deadline);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/task/${id}/`, { title, description, deadline });
            if (response.status === 200) {
                alert("Task updated successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to update task.");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">
                    Update Task
                </h2>
                <form onSubmit={handleUpdateTask} className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="deadline"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Deadline:
                        </label>
                        <input
                            id="deadline"
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 no-underline hover:opacity-90"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;
