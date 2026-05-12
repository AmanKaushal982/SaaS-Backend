import express from 'express';
import {
    getTask, getTaskById, createTask, updateTask, deleteTask
} from '../controller/task.controller.js';
import protectedRoutes from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protectedRoutes);
router.get('/', getTask);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;