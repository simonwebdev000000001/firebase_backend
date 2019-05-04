const router = require('express').Router();
let firebase = require('firebase');
let admin = require('firebase-admin');
const ERROR_CODES = {
  NOT_LOGIN: 1,
  SYNTAX: 2,
};

function UseMap(data) {
  return {
    email: data.email,
    uid: data.uid,
    token: data.token ? `Bearer ${data.token}` : null,
  };
}

router.all('/', function(req, res, next) {
  res.json({
    status: true,
    message: 'Info about auth.',
  });
});

router.post('/login', function(req, res) {
  const {
    email,
    password,
  } = req.body;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      admin.auth().createCustomToken(data.user.uid)
        .then(function(token) {
          data.user.token = token;
          res.json(UseMap(data.user));
        })
        .catch(function(error) {
          res.json(error);
        });
    })
    .catch((error) => {
      res.status(401).json(error);
    });

});
router.post('/register', function(req, res) {
  const {
    email,
    password,
  } = req.body;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      res.json(UseMap(user));
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});
router.post('/forgot-psw', function(req, res) {
  try {
    firebase.auth().sendPasswordResetEmail(req.body.email).then(function() {
      res.json({ message: 'Email sent' });
    }).catch(function(error) {
      res.status(401).json(error);
    });
  } catch (e) {
    res.status(401).json({ error: e, CODE: ERROR_CODES.SYNTAX });
  }

});


module.exports = router;
