// db connection
const admin = require('./auth/firebase-auth');
const db = admin.firestore();

module.exports = db;
console.log('database connected✅')
