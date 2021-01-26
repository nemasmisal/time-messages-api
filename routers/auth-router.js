const router = require('express').Router();
const authController = require('../controllers/auth-controller');

router.post('/register', authController.postRegister);
router.post('/login');
router.get('/logout');

module.exports = router;