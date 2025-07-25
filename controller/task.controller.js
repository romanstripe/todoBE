const Task = require('../models/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({ task, isCompleted });
    await newTask.save();
    res.status(200).json({ status: 'Success', task: newTask });
  } catch (err) {
    res.status(400).json({ status: 'Failed', error: err.message || err.toString() });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v');
    res.status(200).json({ status: 'Success', task: taskList });
  } catch (err) {
    res.status(400).json({ status: 'Failed', error: err.message || err.toString() });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const updateData = await Task.findByIdAndUpdate(
      req.params['id'],
      req.body,
      { new: true, runValidators: true } //그냥외우는것?
    );
    if (!updateData) {
      return res
        .status(404)
        .json({ status: 'Failed', message: 'Data is not in valid form' });
    }
    res.status(200).json({ status: 'Success', task: updateData });
  } catch (err) {
    res.status(400).json({ status: 'Failed', error: err.message || err.toString() });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deleteData = await Task.findByIdAndDelete(req.params['id']).select(
      '-__v'
    );
    res.status(200).json({ status: 'Success', task: deleteData });
  } catch (err) {
    res.status(400).json({ status: 'Failed', error: err.message || err.toString() });
  }
};

module.exports = taskController;
