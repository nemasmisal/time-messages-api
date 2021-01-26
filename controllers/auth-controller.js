module.exports = {
  postRegister(req, res, next) {
    const {email, username, password } = req.body;
    console.log(email, req.body)
  }
}