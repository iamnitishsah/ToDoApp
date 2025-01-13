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
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleCreateTask}>
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
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTask;