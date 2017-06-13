const states = require('../states');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('state').del()
    .then(function () {
      // Inserts seed entries
      return knex('state').insert(states);
    });
};
