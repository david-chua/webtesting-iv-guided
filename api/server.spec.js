const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

//cleans up database
beforeEach(()=> {
  return db('hobbits').truncate();
});

describe('the server', () => {
  it('should set testing environment', () => {
    const env = process.env.DB_ENV;

    expect(env).toBe('testing');
  });

  describe('Get /', () => {
    it ('should return status 200', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
    });

    it('should return JSON', async ()=>{
      const res = await request(server).get('/');

      expect(res.type).toBe("application/json");
    });

    it('should return { api: "up" }', async() =>{
      const res = await request(server).get('/');
      expect(res.body).toMatchObject({ api: 'up' })
    });

  });

  describe('Get /hobbits', () => {
    it ('should respond with an empty array when there are no hobbits', async () => {
      const res = await request(server).get('/hobbits');

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([]);
    });

    it ('should respond with all hobbits in the db', async () => {
      await db('hobbits').insert([
        { name: 'Sam' },
        { name: 'Frodo' }
      ]);

      const res = await request(server).get('/hobbits');
      const data = res.body;
      
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toEqual(2);
      expect(data[0].name).toBe('Sam');
      expect(data[0].id).toBe(1);
    })


  }); // get/hobbits end point


});
