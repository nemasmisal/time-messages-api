const authRouter = require('../routers/auth-router');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
}