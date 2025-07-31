import React from "react";
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => { 
    const formattedDate = task.createdAt;

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p>Created At: {formattedDate}</p>
            <div className="task-actions">
                <Link to={`/edit/${task.id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};


export default TaskItem;