const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// creér 2 routes POST pour les users 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;