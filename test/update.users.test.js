import request from 'supertest';
import '../server/common/env';
import app from '../server/app';
import { HTTP_NOT_FOUND } from '../server/common/constants';
import { seedDB, cleanDB } from './utils';

// This is bad setup for integration-testing, as we are using the same DB,
// but for the purpose of this repo we can allow it

// dont use same users in different test files, as jest is running async tests
const fakeUser = {
  email: 'iliyan@fake-put.com',
  givenName: 'Fake',
  familyName: 'Update',
};

beforeAll(() => {
  return seedDB([fakeUser]);
});

afterAll(() => {
  return cleanDB([fakeUser]);
});

describe('Test user updating', () => {
  test('should not update if user is not found and body is valid', () => {
    return request(app)
      .put('/api/users/noOneHere')
      .send({ familyName: 'Foo', givenName: 'Bar' })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual(HTTP_NOT_FOUND.message);
      });
  });

  test('should not update if user exists, but body is invalid', () => {
    return request(app)
      .put(`/api/users/${fakeUser.email}`)
      .send({ foo: 'foo', bar: 'bar' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('givenName');
        expect(res.body.message).toContain('familyName');
      });
  });

  test('should update both user names', () => {
    return request(app)
      .put(`/api/users/${fakeUser.email}`)
      .send({ familyName: 'New Family', givenName: 'New Given' })
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(fakeUser.email);
        expect(res.body.familyName).toBe('New Family');
        expect(res.body.givenName).toBe('New Given');
      });
  });
});
