import request from 'supertest';
import '../server/common/env';
import app from '../server/app';
import { seedDB, cleanDB } from './utils';

// This is bad setup for integration-testing, as we are using the same DB,
// but for the purpose of this repo we can allow it

// dont use same users in different test files, as jest is running async tests
const fakeUser = {
  email: 'iliyan@fake-get.com',
  givenName: 'Fake',
  familyName: 'Get',
};

beforeAll(() => {
  return seedDB([fakeUser]);
});

afterAll(() => {
  return cleanDB([fakeUser]);
});

describe('Test user retrieving', () => {
  test('should return 404 when no user', () => {
    return request(app).get('/api/users/noOneHere').expect(404);
  });

  test('should return the newly created user', () => {
    return request(app)
      .get(`/api/users/${fakeUser.email}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(fakeUser.email);
      });
  });
});
