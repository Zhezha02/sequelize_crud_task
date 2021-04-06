const createError = require('http-errors');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createError(400));
    }

    res.status(201).send({
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      ...pagination,
    });

    if (!users.length) {
      return next(createError(404, 'Users not fount'));
    }

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    console.log(user);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    const [rowsCount, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'User can not be updated'));
    }
    res.send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

// module.exports.updateUserInstance = async (req, res, next) => {
//   try {
//     const { body, userInstance } = req;

//     const updateduserInstance = await userInstance.update(body, {
//       returning: true,
//     });

//     updateduserInstance.password = undefined;

//     res.send({ data: updateduserInstance });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const affectedRows = await User.destroy({ where: { id: userId } });
    if (affectedRows !== 1) {
      return next(createError(404, 'User not found'));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};
