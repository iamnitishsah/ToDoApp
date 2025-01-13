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
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <Task 
                                task={task} 
                                onDelete={deleteTask}
                                key={task.id}
                                className="p-4 border rounded shadow-sm hover:shadow-md"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No tasks available. Create one!</p>
                )}
            </div>
            <div className="mt-6 flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                    <a href="/create" className="no-underline text-white">
                        Create Task
                    </a>
                </button>
            </div>
        </>
    );
}

export default Dashboard;
