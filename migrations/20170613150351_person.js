
exports.up = function(knex, Promise) {
	return knex.schema.createTable('person', (table) => {
		table.increments();
		table.text('name');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('person');
};
