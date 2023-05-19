const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes');
const Todo = require('./todo');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', todoRoutes);



const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin0:Pass@cluster0.dzrfewt.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

connect();
