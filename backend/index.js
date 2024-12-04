const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);


app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
