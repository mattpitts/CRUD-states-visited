const people = require('../people');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE person; ALTER SEQUENCE person_id_seq restart with 11;')
    .then(function () {
      // Inserts seed entries
      return knex('person').insert(people);
    });
};
