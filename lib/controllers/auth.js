const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/user-service');

const attachCookie = (user, res) => {
  const token = UserService.makeToken(user);
  res.cookie('session', token);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  });

// .get('/verify', ensureAuth, async(req, res) => {
//   InstrumentService
//     .getPortfolio(req.user)
//     .then(portfolio => {
//       res.send({ ...req.user, portfolio });
//     });
// });

