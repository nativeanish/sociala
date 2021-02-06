const router = require('express').Router();
const controller = require('../controller/auth');
router.get('/login',controller.gLogin);
router.get('/register',controller.gRegister);
router.post('/register',controller.pRegister);
router.post('/login',controller.PLogin);
module.exports = router;
