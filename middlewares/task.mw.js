const { Task } = require('../models');

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const taskInstance = await Task.findByPk(taskId);

    if (!taskInstance) {
      throw new Error('Task not found');
    }
    req.taskInstance = taskInstance;
    next();
  } catch (err) {
    next(err);
  }
};
