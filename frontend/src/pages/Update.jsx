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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
                <form onSubmit={handleUpdateTask} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="deadline"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Deadline:
                        </label>
                        <input
                            id="deadline"
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
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;
