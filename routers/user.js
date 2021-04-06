const { Router } = require('express');
const UserController = require('../controller/user.controller');

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);

userRouter.get('/:userId', UserController.getUser);
userRouter.patch('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

module.exports = userRouter;
