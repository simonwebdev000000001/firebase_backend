const router = require('express').Router();
const firebase = require('firebase');
let admin = require('firebase-admin');
const SERVER_CODE = require('../../../server.codes');

router.get('/logOut', function(req, res) {
  const uid = firebase.auth().currentUser.uid;
  firebase.auth().signOut()
    .then(function() {
      //TODO: should remove custom token
      admin.auth().createCustomToken(uid);
      res.json({
        message: 'Sign-out successful',
      });
    })
    .catch(function(error) {
      res.status(401).json(error);
    });
});
router.post('/psw-reset', function(req, res) {
  try {
    if (!req.body.password) throw 'Missing require fields!';
    firebase.auth().currentUser.updatePassword(req.body.password).then(function() {
      res.json({
        message: 'Update successful',
      });
    }).catch(function(error) {
      res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).json(error);
    });
  } catch (e) {
    console.log(e);
    res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).json({
      error: e,
      CODE: SERVER_CODE.ERROR_CODES.MISSING_FIELD,
    });
  }
});

router.get('', function(req, res) {

  re.json(
    User.collection
      .orderBy(req.body.orderBy || 'uid', req.body.orderDir || 'asc')
      .startAt(req.body.startAt || 0)
      .get(),
  );
});
module.exports = router;
