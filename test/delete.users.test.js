import request from 'supertest';
import '../server/common/env';
import app from '../server/app';
import { seedDB, cleanDB } from './utils';

// This is bad setup for integration-testing, as we are using the same DB,
// but for the purpose of this repo we can allow it

// dont use same users in different test files, as jest is running async tests
const userToBeDeleted = {
  email: 'iliyan@fake-delete.com',
  givenName: 'Fake',
  familyName: 'Delete',
};

beforeAll(() => {
  return seedDB([userToBeDeleted]);
});

afterAll(() => {
  return cleanDB([userToBeDeleted]);
});

describe('Test user deletion', () => {
  test('should return 404 when no user', () => {
    return request(app).del('/api/users/noOneHere').expect(404);
  });

  test('should return 200', () => {
    return request(app).del(`/api/users/${userToBeDeleted.email}`).expect(200);
  });
});
