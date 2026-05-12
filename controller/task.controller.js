import Task from '../model/task.model.js';

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            tasks
        });
    }
    catch (err) {
        res.status(500).json({ message: 'server error' });
    }
}
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const task = await Task.create({
            title, description, status, priority, dueDate, user: req.user._id
        });
        res.status(201).json({
            success: true,
            task
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            success: true,
            task
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}