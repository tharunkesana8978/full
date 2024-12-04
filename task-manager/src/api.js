import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchTasks = async () => {
    return await axios.get(`${API_BASE_URL}/tasks`);
};

export const createTask = async (task) => {
    return await axios.post(`${API_BASE_URL}/tasks`, task);
};

export const updateTask = async (id, task) => {
    return await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
};


export const deleteTask = async (id) => {
    return await axios.delete(`${API_BASE_URL}/tasks/${id}`);
};
