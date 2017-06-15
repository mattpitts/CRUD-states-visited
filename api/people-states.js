const express = require('express');

const router = express.Router();
const queries = require('../db/queries');



function isValidPerson(person) {
	if(typeof person.name == 'string' && person.name.trim() != '') {
		return true
	}
	return false;
}


function isValidStateId(id) {
	if(!isNaN(id) && (id % 1 == 0)) {
		return true;
	} else {
		return false;
	}
}


router.get('/person', (req,res) => {
	queries.getAllPeople().then(people => {
		res.json(people);
	});
});


router.get('/person/:id/state', (req, res, next) => {
	queries.getStatesVisitedById(req.params.id).then(states => {
		res.json(states);
	});
});


router.post('/person', (req, res, next) => {
	if(isValidPerson(req.body)) {
		queries.createNewPerson(req.body).then(response => {
			res.json(response);
		});
	} else {
		next(new Error('Invalid Entry'));
	}
});


router.post('/person/:personId/state/:stateId', (req,res,next) => {
		queries.createNewVisit(req.params.person, req.params.state).then(response => {
			res.json(response);
		});
});


router.get('/state/:id', (req,res,next) => {
	if(isValidStateId(req.params.id)) {
		queries.getVisitsByState(req.params.id).then(visits => {
			res.json(visits);
		});
	} else {
		next(new Error('Invalid State ID'));
	}
});


router.get('/person/:id/friendships', (req,res,next) => {
	let col1, col2;
	Promise.all([
		queries.getFriendsById(req.params.id, 'friendships.person2_id', 'friendships.person1_id', 'name as person1_name'),
		queries.getFriendsById(req.params.id, 'friendships.person1_id', 'friendships.person2_id', 'name as person2_name')
	]).then(response => {
		let friends = [];
		for (var i = 0; i < response.length; i++) {
			response[i].forEach(friend => {
				let name = 'person'+(i+1)+'_name';
				let id = 'person'+(i+1)+'_id';
				let newFriend = {name: friend[name], id: friend[id]};
				let duplicate = false;
				friends.forEach(entry => {
					if(entry.id === newFriend.id) { duplicate = true; }
				});
				if(!duplicate) { friends.push(newFriend); }
			});
		}
		res.json(friends);
	});
});


router.delete('/person/:id', (req,res,next) => {
	queries.deletePerson(req.params.id).then(response => {
		res.json(response);
	});
});


module.exports = router;
