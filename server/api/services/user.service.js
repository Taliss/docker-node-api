import l from '../../common/logger';

class UserService {
  byEmail(email) {
    l.info(`Looking for user, Email: ${email}`);
    return Promise.resolve({ user: '42 get by email' });
  }

  create({ email, givenName, familyName }) {
    l.info(
      `creating user: Email: ${email}; GivenName: ${givenName}; familyName: ${familyName}`
    );
    return Promise.resolve({ user: '42 create' });
  }

  update({ email, body }) {
    l.info(
      `updating user by email: Email: ${email}; Body: ${JSON.stringify(
        body,
        null,
        2
      )}`
    );
    return Promise.resolve({ user: '42 update' });
  }

  delete(email) {
    l.info(`deleting user by email. Email: ${email}`);
    return Promise.resolve({ user: '42 delete' });
  }
}

export default new UserService();
