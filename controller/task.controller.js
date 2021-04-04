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

module.exports.getUserTask = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const [firstTask] = await userInstance.getTasks();

    res.send({ data: firstTask });
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
