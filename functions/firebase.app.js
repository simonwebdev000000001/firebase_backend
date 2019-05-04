const admin = require('firebase-admin');
const firebase = require('firebase');

let source = './app';
if(process.env.NODE_ENV ==='dev'){
  source = './appes6';
}

let serviceKey = require(source+'/firebase-config/config.json');
let firebaseConfig = require(source+'/firebase-config/nbdab-5c937-firebase-adminsdk-1c16q-1ceb31b092.json'); // The config for the firebase project

firebase.initializeApp(serviceKey);
admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });


