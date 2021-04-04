const {
  sequelize: { queryInterface },
} = require('../models/index');
const _ = require('lodash');
const { User } = require('../models');

const func = async () => {
  const users = await User.findAll({
    attributes: ['id'],
    // limit: 2,
  });
  // console.log(users);

  const tasks = users
    .map(({ dataValues: { id } }) => {
      return new Array(_.random(1, 10, false)).fill(null).map((_, i) => ({
        user_id: id,
        body: `Testbody${i}`,
        created_at: new Date(),
        updated_at: new Date(),
      }));
    })
    .flat(2);
  // console.log(tasks);

  queryInterface.bulkInsert('tasks', tasks);
};
func();
