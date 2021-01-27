const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const createToken = async (user, pass) => {
  const match = await bcrypt.compare(pass, user.password);
  if(!match) { return {msg: 'username or password don`t match!'}}
  const token = jwt.sign({ username: user.username, email: user.email }, config.jwtSecret);
  return token;
}

const setCookie = (res, token) => {
  return res.cookie(config.authCookieName, token, { expires: new Date(Date.now() + 9000000), httpOnly: true, sameSite: true });
}

module.exports = {
  async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const hash = await bcrypt.hash(password, config.saltRounds);
      const user = new User({ username, email, password: hash });
      await user.save();
      const token = await createToken(user, password);
      setCookie(res, token);
      return res.status(201).send({ id: user._id })
    } catch (error) { res.status(507).send({ msg: error }); }
  },
  async login(req, res,next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user) { return res.status(401).send( { msg: 'Wrong user/password!' } ); }
      const token = await createToken(user, password);
      if(token.msg) { return res.status(401).send(token); }
      setCookie(res, token);
      return res.send({ id: user._id });
    } catch (error) { res.status(507).send({ msg: error });
      
    }
  },
  logout(req, res, next) {
    res.clearCookie(config.authCookieName);
    return res.status(204).send();
  }
}