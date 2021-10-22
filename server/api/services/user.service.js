import { v4 as uuidv4 } from 'uuid';
import db from '../../db/';

class UserService {
  findByEmail(email) {
    return db('users').where({ email }).first();
  }

  create({ email, givenName, familyName }) {
    // Unfortunately, we can't use first here
    return db('users')
      .insert({
        id: uuidv4(),
        email,
        given_name: givenName,
        family_name: familyName,
      })
      .returning([
        'id',
        'email',
        'given_name as givenName',
        'family_name as familyName',
        'created',
      ])
      .then(([createdUser]) => createdUser)
      .catch((err) => Promise.reject(err));
  }

  update({ email, body }) {
    return db('users')
      .where({ email })
      .update({
        given_name: body.givenName,
        family_name: body.familyName,
      })
      .returning([
        'id',
        'email',
        'given_name as givenName',
        'family_name as familyName',
        'created',
      ])
      .then(([updatedUser]) => updatedUser)
      .catch((err) => Promise.reject(err));
  }

  delete(email) {
    return db('users').where({ email }).del();
  }
}

export default new UserService();
