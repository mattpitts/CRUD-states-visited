const peopleStates = require('../people-states');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people_states').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_states').insert(peopleStates);
    });
};
