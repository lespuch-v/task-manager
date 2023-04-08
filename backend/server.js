const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Task Schema and Model
const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subtasks: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

// API Routes
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
  await Task.updateOne({ id: req.params.id }, req.body);
  res.json({ message: 'Task updated successfully' });
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.deleteOne({ id: req.params.id });
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
