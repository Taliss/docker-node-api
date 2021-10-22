import request from 'supertest';
import '../server/common/env';
import app from '../server/app';

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/users/1')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
