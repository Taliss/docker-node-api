import db from '../../db/';

class UserService {
  byEmail(email) {
    return db('users').where({ email }).first();
  }

  create({ email, givenName, familyName }) {
    // Unfortunately, we can't use first here
    return db('users')
      .insert({
        email,
        given_name: givenName,
        family_name: familyName,
      })
      .returning('*')
      .then(([createdUser]) => createdUser)
      .catch((err) => Promise.reject(err));
  }

  update({ email, body }) {
    return db('users').where({ email }).update({
      email: body.email,
      given_name: body.givenName,
      family_name: body.familyName,
    });
  }

  delete(email) {
    return db('users').where({ email }).del();
  }
}

export default new UserService();
