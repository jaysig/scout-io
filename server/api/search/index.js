'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

// base route is '/api/search/',
router.get('/:photoid', controller.byID);
router.get('/tag/:query', controller.tags);
router.get('/geo/:geo', controller.geo);
router.post('/advancedSearch', controller.searchCriteria);

module.exports = router;
