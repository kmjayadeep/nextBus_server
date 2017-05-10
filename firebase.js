var admin = require("firebase-admin");

var serviceAccount = require('./bus-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://airhelp-aea85.firebaseio.com"
});

module.exports = admin