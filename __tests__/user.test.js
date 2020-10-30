const pool = require('../lib/utils/pool');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');

// const { getAgent } = require('../data/data_helper');

describe('Auth routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('signup a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'numbnuts',
        email: 'test@test.com',
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      name: 'numbnuts',
      email: 'test@test.com'
    });
  });
});

