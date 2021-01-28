const Room = require('../models/room');

module.exports = {
 async createrRoom(req,res,next) {
   try {
     const { name, type, description, userId } = req.body;
     const room = new Room({ name, type, description, owner: userId });
     room.save();
     return res.status(201).send({ id: room._id });
   } catch (error) { res.status(507).send({ msg: error }); }
 },
 async allRooms(req, res, next) {
   try {
     const rooms = await Room.find({}).populate('owner').lean();
     res.send(rooms);
   } catch (error) { res.status(507).send({ msg: error }); }
 }

}