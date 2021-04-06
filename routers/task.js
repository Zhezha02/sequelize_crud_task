const { Router } = require('express');
const TaskController = require('../controller/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const paginate = require('../middlewares/paginate.mw');

const taskRouter = Router();

taskRouter.get('/:taskId', TaskController.getTaskById);
taskRouter.patch('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTaskById);

taskRouter.get('/user/:userId',paginate, checkUser, TaskController.getUserTasks);
taskRouter.post('/user/:userId', checkUser, TaskController.createTask);
taskRouter.delete('/user/:userId', TaskController.deleteAllUserTasks);

module.exports = taskRouter;
