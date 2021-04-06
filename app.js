const express = require('express');
const router = require('./routers');

const app = express();

app.use(express.json()); // data stream -> json -> js object -> req.body

app.use('/api', router);

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).send({
    errors: [{ message: err || 'Server error' }],
  });
});

module.exports = app;
