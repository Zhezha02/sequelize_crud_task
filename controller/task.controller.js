const createError = require('http-errors');
const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const task = await userInstance.createTask(body);

    if (!task) {
      return next(createError(400, "Task can't be created"));
    }
    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination = {} } = req;

    const tasks = await userInstance.getTasks({
      ...pagination,
    });

    if (!tasks.length) {
      return next(createError(404, 'User without tasks'));
    }

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }
    res.status(200).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
      body,
    } = req;

    const [, [updatedTask]] = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (!updatedTask) {
      return next(createError(400, "task can't be updated"));
    }
    res.status(200).send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const result = await Task.destroy({ where: { id: taskId } });

    if (result !== 1) {
      return next(createError(404, "Task can't be found"));
    }
    res.send({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllUserTasks = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const result = await Task.destroy({ where: { id: userId } });
    if (!result) {
      return next(createError(404, 'Tasks not found'));
    }
    res.send({ data: result });
  } catch (err) {
    next(err);
  }
};
