const { Router } = require('express');
const UserController = require('./controller/user.controller');
const TaskController = require('./controller/task.controller');
const { checkUser } = require('./middlewares/user.mw');
const router = Router();

router.get('/users', UserController.getAllUsers);
router.get('/user/:id', checkUser, UserController.getUser);
router.post('/user', UserController.createUser);
router.patch('/user/:id', UserController.updateUser);
router.patch('/user-v2/:id', checkUser, UserController.updateUserInstance);
router.delete('/user/:id', UserController.deleteUser);

router.get('/user/:id/tasks', checkUser, TaskController.getUserTasks);
router.get('/user/:id/task', checkUser, TaskController.getUserTask);
router.post('/user/:id/task', checkUser, TaskController.createTask);


// router.get('/user/:id/tasks/amount', checkUser, TaskController.getUserTasksAmount)
module.exports = router;
