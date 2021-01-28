const router = require('express').Router();
const roomController = require('../controllers/room-controller');

router.get('/allRooms', roomController.allRooms);
router.post('/createRoom', roomController.createrRoom);
router.post('/joinRoom', roomController.joinRoom);
router.post('/leaveRoom', roomController.leaveRoom);
module.exports = router;