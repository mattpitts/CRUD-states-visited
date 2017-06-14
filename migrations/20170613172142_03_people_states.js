
exports.up = function(knex, Promise) {
	return knex.schema.createTable('people_states', (table) => {
		table.increments();
		table.integer('person_id');
		table.integer('state_id');
		table.foreign('person.id').references('person_id');
		table.foreign('state.id').references('state_id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('people_states');
};
