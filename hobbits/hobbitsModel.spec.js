const Hobbits = require('./hobbitsModel.js');
const db = require('../data/dbConfig.js');

// resets database after each try.
beforeEach(()=> {
  return db('hobbits').truncate();
});

describe('The Hobbit Model', () => {

  describe('The Insert Fn', () => {

    it('should insert a hobbit into the db', async () => {
      await Hobbits.insert({ name: 'sam' });

      const hobbits = await db('hobbits');
      expect(hobbits.length).toBe(1);
      expect(hobbits[0].name).toBe('sam');
    });

    it('should return the inserted hobbit with id', async () => {
      const hobbit = await Hobbits.insert({ name: 'frodo' });

      expect(hobbit.id).toBe(1);
      expect(hobbit.name).toBe('frodo');
    });
  });

  describe('The Get All Fn', () => {
    it('should retrieve all hobbits in the db', async () => {
      await db('hobbits').insert([
        {name: 'frodo'},
        {name: 'max'},
        {name: 'bilbo'}
      ]);

      const hobbits = await Hobbits.getAll();

      expect(hobbits.length).toBe(3);
      expect(hobbits[0].name).toBe('frodo');
    })
  })

});
