import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, isEditing }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    useEffect(() => {
        if (isEditing) {
            setTitle(initialData?.title);
            setDescription(initialData?.description);
        }
    }, [initialData, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            onSubmit({ title, description });
            setTitle('');
            setDescription('');
        } else {
            alert('Both title and description are required.');
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
