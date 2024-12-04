import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="actions">
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
