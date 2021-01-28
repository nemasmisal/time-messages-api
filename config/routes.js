const authRouter = require('../routers/auth-router');
const roomRouter = require('../routers/room-router');
module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/room', roomRouter);
}