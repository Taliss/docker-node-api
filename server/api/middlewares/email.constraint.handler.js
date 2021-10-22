import { DUPLICATE_EMAIL } from '../../common/constants';

// eslint-disable-next-line no-unused-vars, no-shadow
export default function emailConstaintErrorHandler(err, req, res, next) {
  err && err.code === '23505' ? next(DUPLICATE_EMAIL) : next(err);
}
