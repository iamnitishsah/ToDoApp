import { useNavigate } from "react-router-dom";

function Task({ task, onDelete }) {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update/${task.id}`);
    };

    return (
        <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            <div className="mt-4 flex space-x-4">
                <button
                    onClick={handleUpdateClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Task;
