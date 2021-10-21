import userRouter from './api/controllers/users/router';

export default function routes(app) {
  app.use('/api/users', userRouter);
}
