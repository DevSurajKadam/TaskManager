// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection

mongoose.connect('mongodb+srv://devsurajkadam:3YGT4wLqEV5bbNdU@cluster0.yrfn57v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});
const Task = mongoose.model('Task', TaskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
