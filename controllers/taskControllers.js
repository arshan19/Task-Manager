const { request } = require('express');
const Task = require('../models/taskModels');

const getAllTasks = async (req, res) => {
    try {
        //Pagination 
        const skip  = req.query.skip || 0;
        const limit = req.query.limit || 4
       // if(!page) page=1;
        //if(!limit) limit=4;

        //let skip = (page - 1) * limit;

        const tasks = await Task.find({})
        .skip(skip)
        .limit(limit);
        res.status(200).json({ skip:skip, limit: limit,tasks: tasks });
    } 
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTasks = async (req, res) => {

    try {
        const createTask = await Task.create(req.body);
        res.status(201).json({ createTask });

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const singleTask = await Task.findOne({ _id: taskID })
        if (!singleTask) {
            return res.status(404).json({ msg: `no task with id : ${taskID}` })
        }

        res.status(200).json({ singleTask });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}



const deleteTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const deleteTask = await Task.findByIdAndDelete({ _id: taskID });
        if (!deleteTask) {
            return res.status(404).json({ msg: `no task with id : ${taskID}` })
        }
        res.status(200).json({ deleteTask });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const updateTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!updateTask) {
            res.status(404).json({ msg: `no task with id : ${taskID}` })
        }
        res.status(201).json({ updateTask })
    } catch (error) {
        res.status(500).json({ msg: error });
    }



    res.send("update task");
}

module.exports = { getAllTasks, createTasks, getTask, updateTasks, deleteTasks };