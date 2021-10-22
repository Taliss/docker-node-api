import request from 'supertest';
import '../server/common/env';
import app from '../server/app';
import { DUPLICATE_EMAIL } from '../server/common/constants';
import { seedDB, cleanDB } from './utils';

// This is bad setup for integration-testing, as we are using the same DB,
// but for the purpose of this repo we can allow it

const fakeUsers = [
  {
    email: 'iliyan@fake-email1.com',
    givenName: 'Fake1',
    familyName: 'Faker1',
  },
  {
    email: 'iliyan@fake-email2.com',
    givenName: 'Fake2',
    familyName: 'Faker2',
  },
  {
    email: 'iliyan@fake-email3.com',
    givenName: 'Fake3',
    familyName: 'Faker3',
  },
];

const userToBeCreated = {
  email: 'test@email.com',
  givenName: 'Test',
  familyName: 'The Tester',
};

beforeAll(() => {
  return seedDB(fakeUsers);
});

afterAll(() => {
  return cleanDB([...fakeUsers, userToBeCreated]);
});

describe('Test user creating', () => {
  test('should not insert user if email is already taken', () => {
    return request(app)
      .post('/api/users')
      .send(fakeUsers[0])
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(DUPLICATE_EMAIL.message);
      });
  });

  test('should not insert if required properties are missing', () => {
    return request(app)
      .post('/api/users')
      .send({
        email: 'this can be validated with swagger, but its not',
        familyName: 'NO givenName',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('givenName');
      });
  });

  test('should create user', () => {
    return request(app)
      .post('/api/users')
      .send(userToBeCreated)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('created');
        expect(res.body.email).toBe(userToBeCreated.email);
        expect(res.body.familyName).toBe(userToBeCreated.familyName);
        expect(res.body.givenName).toBe(userToBeCreated.givenName);
      });
  });
});
