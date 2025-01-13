function Task({ task, onDelete }) {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
}

export default Task;
