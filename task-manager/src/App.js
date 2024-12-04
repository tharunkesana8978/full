import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetchTasks();
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        loadTasks();
    }, []);

    const handleAddTask = async (task) => {
        try {
            const response = await createTask(task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await updateTask(editingTask._id, updatedTask);
            setTasks(
                tasks.map((task) =>
                    task._id === editingTask._id ? response.data : task
                )
            );
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                initialData={editingTask}
                isEditing={!!editingTask}
            />
            <TaskList
                tasks={tasks}
                onEdit={(task) => setEditingTask(task)}
                onDelete={handleDeleteTask}
            />
        </div>
    );
}

export default App;
