const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server'); // adjust if your server export is different

describe('GET /destinations', () => {
  it('should return an array of destinations', async () => {
    const res = await request(app).get('/destinations');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
