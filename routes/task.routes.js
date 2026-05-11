import express from 'express';
import {
    getTask, getTaskById, createTask
} from '../controller/task.controller.js';

const router = express.Router();
router.use(protect);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);

export default router;