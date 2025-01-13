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
        <div>
            <h2>Dashboard</h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task task={task} onDelete={deleteTask} key={task.id} />
                ))
            ) : (
                <p>No tasks available. Create one!</p>
            )}
        </div>
    );
}

export default Dashboard;
