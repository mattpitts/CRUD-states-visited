
const friendships = require('../friendships');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friendships').del()
    .then(function () {
      // Inserts seed entries
      return knex('friendships').insert(friendships);
    });
};
