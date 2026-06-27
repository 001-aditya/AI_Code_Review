const express = require('express');
const executefunction = require('../controllers/executeController');

const router = express.Router();

router.post('/execute', executefunction);

module.exports = router;
