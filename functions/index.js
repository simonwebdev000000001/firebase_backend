const functions = require('firebase-functions');
require('./firebase.app');

let source = './app';
if (process.env.NODE_ENV === 'dev') {
  source = './appes6';
}

const app = require(source);


exports.v1 = functions.https.onRequest(app);

