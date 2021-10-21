import UserService from '../../services/user.service';

export class UserController {
  create(req, res, next) {
    UserService.create(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }

  getByEmail(req, res, next) {
    UserService.byEmail(req.params.email)
      .then((user) => {
        user ? res.json(user) : res.status(404).end();
      })
      .catch(next);
  }

  updateByEmail(req, res, next) {
    UserService.update({ email: req.params.email, body: req.body })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }

  deleteByEmail(req, res, next) {
    UserService.delete(req.params.email)
      .then(() => {
        res.status(200);
      })
      .catch(next);
  }
}
export default new UserController();
