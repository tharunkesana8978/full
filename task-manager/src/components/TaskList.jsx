import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
