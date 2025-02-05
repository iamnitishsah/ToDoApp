import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Task({ task, onDelete }) {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update/${task.id}`);
    };

    return (
        <div className="p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">{task.title}</h3>
            <p className="text-gray-400 mb-4">{task.description}</p>
            <div className="text-sm text-gray-500 mb-4">
                <p>
                    <span className="font-medium text-gray-400">Created: </span>
                    {format(new Date(task.created), "yyyy-MM-dd HH:mm:ss")}
                </p>
                <p>
                    <span className="font-medium text-gray-400">Deadline: </span>
                    {format(new Date(task.deadline), "yyyy-MM-dd HH:mm:ss")}
                </p>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleUpdateClick}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Task;
