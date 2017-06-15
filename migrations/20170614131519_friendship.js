
exports.up = function(knex, Promise) {
	return knex.schema.createTable('friendships', (table) => {
		table.increments();
		table.integer('person1_id');
		table.integer('person2_id');
		table.foreign('person.id').references('person1_id');
		table.foreign('person.id').references('person2_id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scheam.dropTable('friendships');
};
