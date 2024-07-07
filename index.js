const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoListRouter = require('./routes/todoListRouter');

dotenv.config();

const app = express();

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use('/todos', todoListRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})