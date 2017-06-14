const knex = require('./knex');


module.exports = {
	getAllPeople() {
		return knex('person');
	},

	getStatesVisitedById(id) {
		return knex('people_states').where('person_id', id)
			.join('state', 'state_id', '=', 'state.id')
			.select('name');
	},

	createNewPerson(person) {
		return knex('person').insert(person, '*');
	},

	createNewVisit(personId,stateId) {
		let insert = { person_id: personId, state_id: stateId };
		return knex('people_states').insert(insert, '*');
	},
	getVisitsByState(id) {
		return knex('people_states').where('state_id', id)
			.join('person', 'person_id', '=', 'person.id')
			.select('name');
	},
	deletePerson(id) {
		return knex('person').where('id', id).select('*').del();
	}

};
