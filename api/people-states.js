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


router.get('/people/', (req,res) => {
	queries.getAllPeople().then(people => {
		res.json(people);
	});
});


router.get('/:id/statesVisited', (req, res, next) => {
	queries.getStatesVisitedById(req.params.id).then(states => {
		res.json(states);
	});
});


router.post('/newPerson', (req, res, next) => {
	if(isValidPerson(req.body)) {
		queries.createNewPerson(req.body).then(response => {
			res.json(response);
		});
	} else {
		next(new Error('Invalid Entry'));
	}
});
router.post('/newVisit/:person/:state', (req,res,next) => {
		queries.createNewVisit(req.params.person, req.params.state).then(response => {
			res.json(response);
		});
});

router.get('/visitsByState/:id', (req,res,next) => {
	if(isValidStateId(req.params.id)) {
		queries.getVisitsByState(req.params.id).then(visits => {
			res.json(visits);
		});
	} else {
		next(new Error('Invalid State ID'));
	}
});

router.delete('/deletePerson/:id', (req,res,next) => {
	queries.deletePerson(req.params.id).then(response => {
		res.json(response);
	});
});


module.exports = router;
