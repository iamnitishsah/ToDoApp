import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await api.get("/api/task/");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await api.delete(`/api/task/${id}/`);
            if (response.status === 204) {
                alert("Task deleted!");
                getTasks();
            } else {
                alert("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <div className="container mx-auto p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white">
                        Task Dashboard
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">
                        Manage your tasks efficiently and stay organized.
                    </p>
                </div>
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <Task
                                task={task}
                                onDelete={deleteTask}
                                key={task.id}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 text-xl mt-10">
                        No tasks available. Start by creating one!
                    </p>
                )}
                <div className="mt-10 flex justify-center">
                    <a
                        href="/create"
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 no-underline"
                    >
                        Create New Task
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
