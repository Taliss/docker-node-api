import l from '../../common/logger';
// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(err, req, res, next) {
  l.error(err);
  // unhandled errorm, hide real error for security reasons
  if (!err.status || err.status >= 500) {
    res
      .status(500)
      .json({ message: 'Something went wrong, please try again later.' });
  } else {
    const errors = err.errors || [{ message: err.message }];
    res.status(err.status).json({ errors });
  }
}
