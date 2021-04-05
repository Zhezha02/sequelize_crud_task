const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    // const task = await Task.create({ ...body, userId: id });
    const task = await userInstance.createTask(body);

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;

    const tasks = await userInstance.getTasks();

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getTaskByUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const [firstTask] = await userInstance.getTasks();

    res.send({ data: firstTask });
  } catch (err) {
    next(err);
  }
};
module.exports.getTaskById = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (err) {
    next(err);
  }
};

// module.exports.getUserTasksAmount = async (req, res, next) => {
//   try {
//     const { userInstance } = req;
//     const taskAmount = await userInstance.countTasks();
//     console.log(taskAmount);
//     res.status(200).send({taskAmount});
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.updateTask = async (req, res, next) => {
  try {
    const { taskInstance, body } = req;

    const updatedTaskInstance = await taskInstance.update(body, {
      returning: true,
    });

    res.status(200).send({ data: updatedTaskInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    const result = await taskInstance.destroy();
    console.log(result);
    res.send({ data: taskInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllUserTasks = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { id },
    } = req;
    const userTasks = await userInstance.getTasks();
    const result = await Task.destroy({ where: { user_id: id } });
    console.log(result);
    res.send({ data: userTasks });
  } catch (err) {
    next(err);
  }
};
