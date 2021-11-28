const request = require('supertest');

const app = require('../src/app');

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

describe('Successful request', () => {
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
  });

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

describe('Unsuccessful request 400', () => {

  it('get /person/123 should return 400', async () => {
    await request(app)
      .get('/person/123')
      .expect('Content-Type', /json/)
      .expect(400, { message: '400 Bad Request' })
  });

  it('post /person without body should return 400', async () => {
    await request(app)
      .post('/person')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400, { message: '400 Bad Request' })
  });
});

describe('Unsuccessful request 404', () => {

  it('get /person/e15aefaa-6f8b-45d0-8383-fbb26272f960 should return 404', async () => {
    await request(app)
      .get('/person/e15aefaa-6f8b-45d0-8383-fbb26272f960')
      .expect('Content-Type', /json/)
      .expect(404, { message: '404 Not found' })
  });

  it('get /somePage/somePage/somePage should return 404', async () => {
    await request(app)
      .get('/somePage/somePage/somePage')
      .expect('Content-Type', /json/)
      .expect(404, { message: '404 Not found' })
  });
});

describe('Unsuccessful request 500', () => {

  it('post /person without body should return 500', async () => {
    await request(app)
      .post('/person')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, { message: '500 Internal Server Error' })
  });

  it('patch /person should return 500', async () => {
    await request(app)
      .patch(`/person/`)
      .expect(500, { message: '500 Internal Server Error' });
  });
});

