/* eslint-disable */  // --> OFF
let firebase = require('firebase');
const SERVER_CODE = require('../server.codes');

module.exports = {
  isAuth: (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).send({
      error: {
        message: 'Missing auth header',
      },
      code: SERVER_CODE.ERROR_CODES.NOT_AUTH,
    });
    const tokenId = authorization.split('Bearer ')[1];
    return firebase.auth().signInWithCustomToken(tokenId)
      .then(({
               user,
             }) => {
        req.user = user;
        next();
      })
      .catch(function(error) {
        res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).send({
          ...error,
          code: SERVER_CODE.ERROR_CODES.NOT_AUTH,
        });
      });
  },
};
