const express = require('express');
const TodoList = require('../models/todoListSchema');

const router = express.Router();

//  Create a new to-do item.
router.post('/', async (req, res) => {
    try {
        const todoList = new TodoList(req.body);
        await todoList.save();
        res.status(201).send(todoList);
    } catch(error) {
        res.status(400).send(error);
    }
})

// Get all to-do items.
router.get('/', async (req, res) => {
    try {
        const todoLists = await TodoList.find();
        res.status(200).send(todoLists);
    } catch(error) {
        res.status(500).send(error);
    }
})

// Get a specific to-do item by ID.
router.get('/:id', async (req, res) => {
    try {
        const todoList = await TodoList.findById(req.params.id);
        if(!todoList) {
            res.status(404).send('Todo list not found!');
        }
        res.status(200).send(todoList);
    } catch(error) {
        res.status(500).send(error);
    }
})

// Update a to-do item by ID.
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todoListExist = await TodoList.findById({_id: id});
        if(!todoListExist){
            return  res.status(404).send("Todo list not found!");
        }
        const updateTodoList = await TodoList.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        res.status(201).send(updateTodoList);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Mark a to-do item as completed.
router.patch('/:id/complete', async (req, res) => {
    try {
        const id = req.params.id;
        const todoListExist = await TodoList.findById({_id: id});
        if(!todoListExist) {
            res.status(404).send('Todo list not found!');
        }
        const completeTodoList = await TodoList.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).send(completeTodoList);
    } catch(error) {
        res.status(500).send(error);
    }
})


// Delete a to-do item by ID.
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todoListExist = await TodoList.findById({_id: id});
        if(!todoListExist) {
            res.status(404).send('Todo list not found!');
        }
        await TodoList.findByIdAndDelete(id);
        res.status(200).send({message: "Todo list deleted successfully."});
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;
