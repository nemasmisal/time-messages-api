const router = require('express').Router();
const roomController = require('../controllers/room-controller');

router.get('/allRooms', roomController.allRooms);
router.post('/createRoom', roomController.createrRoom);

module.exports = router;