const router = require('express').Router();
const controller = require('../controller/Blog');
const auth = require('../auth/auth');
//Registering the GET , POSt
router.get('/logout',controller.logout);
router.get('/',auth , controller.Gindex);
router.post('/',auth,controller.Pindex);
router.get('/delete/:id',auth,controller.Delete)
router.get('/:id',auth,controller.userPage);
module.exports = router;