
exports.up = function(knex, Promise) {
	return knex.schema.createTable('state', (table) => {
		table.integer('id');
		table.text('name');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('state');
};
