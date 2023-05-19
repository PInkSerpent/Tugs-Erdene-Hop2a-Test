const express = require('express');
const Todo = require('./todo');

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Todo list backend');
  });


router.get('/test', (req, res) => {
    res.send('This is test endpoint');
  });


  router.get('/list', async (req, res) => {
    try {
      const todos = await Todo.find();
      const response = {
        message: 'Successfully fetched the list',
        count: todos.length,
        todos: todos
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch list' });
    }
  });


  router.get('/count', async (req, res) => {
    try {
      const count = await Todo.countDocuments({ completed: true });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch count' });
    }
  });
  

  router.post('/add', async (req, res) => {
    try {
      const { title, completed } = req.body;
      const newTodo = new Todo({
        title,
        completed,
      });
      await newTodo.save();
  
      res.json({ message: 'Task added successfully', todo: newTodo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add task' });
    }
  });
  
  router.delete('/delete', async (req, res) => {
    try {
      const taskId = req.header('id');
      const deletedTask = await Todo.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });


  
  router.patch('/update', async (req, res) => {
    try {
      const taskId = req.header('id');
      const { title } = req.body;
      const updatedTask = await Todo.findByIdAndUpdate(
        taskId,
        { title },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });


  
  router.patch('/checked', async (req, res) => {
    try {
      const taskId = req.header('id');
      const { completed } = req.body;
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
      }
      const task = await Todo.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      task.completed = completed;
      const updatedTask = await task.save();
  
      res.json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task status' });
    }
  });
  
module.exports = router;