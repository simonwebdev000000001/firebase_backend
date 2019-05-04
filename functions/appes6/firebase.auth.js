
  let serviceKey = {
    apiKey: "AIzaSyBPwnJyd_JrKft1_hLkPF2g8nUz6DcYrtE",
    authDomain: "nbdab-5c937.firebaseapp.com",
    databaseURL: "https://nbdab-5c937.firebaseio.com",
    projectId: "nbdab-5c937",
    storageBucket: "nbdab-5c937.appspot.com",
    messagingSenderId: "578901287496",
    appId: "1:578901287496:web:00db4edd09cb1eb8"
  }
let firebaseConfig = require('./firebase-config/nbdab-5c937-firebase-adminsdk-1c16q-1ceb31b092.json'); // The config for the firebase project
let FirebaseAuthNode = require('firebase-auth-node');
 
let firebaseAuth = new FirebaseAuthNode(firebaseConfig, serviceKey);
module.exports=firebaseAuth;