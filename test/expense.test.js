const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');

describe('GET /expenses', () => {
  it('should return an array of expenses', async () => {
    const res = await request(app).get('/expenses');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
