const request = require('supertest');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('../../src/app');

const NEW_PERSON = {
  name: 'Test',
  age: 19,
  hobbies: []
};
const UPDATE_PERSON = {
  name: 'Update',
  age: 20,
  hobbies: []
};

describe('Request', () => {
  let personId;

  it('get /person should return empty array', async () => {
    await request(app)
      .get('/person')
      .expect('Content-Type', /json/)
      .expect(200, [])
  })

  it('post /person should create new person', async () => {
    await request(app)
      .post('/person')
      .set('Accept', 'application/json')
      .send(NEW_PERSON)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        personId = response.body.id;
        expect(response.body).toMatchObject(NEW_PERSON);
      })
  })

  it('get /person/id should return person by id', async () => {
    await request(app)
      .get(`/person/${personId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(NEW_PERSON);
      })
  });

  it('put /person/id should return updated person by id', async () => {
    await request(app)
      .put(`/person/${personId}`)
      .set('Accept', 'application/json')
      .send(UPDATE_PERSON)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(UPDATE_PERSON);
      })
  });

  it('delete /person/id should delete person by id', async () => {
    await request(app)
      .delete(`/person/${personId}`)
      .expect('Content-Type', /json/)
      .expect(204)
      .then(response => {
        expect(response.body).not.toBe();
      });
  });

  it('get /person/id should return 404', async () => {
    await request(app)
      .get(`/person/${personId}`)
      .expect(404);
  });
});