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
        <div>
            <h2>Update Task</h2>
            <form onSubmit={handleUpdateTask}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
                <label>
                    Deadline:
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
}

export default UpdateTask;
