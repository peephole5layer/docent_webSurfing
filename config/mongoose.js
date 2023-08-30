const mongoose = require('mongoose');
const env = require('./environment');

// mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
console.log(env.mongo_url,"hieieieiieieiei");
mongoose.connect(`${env.mongo_url}`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to mongodb"));

db.once('open', function() {
    console.log('Successfully connected to database mongodb');
});

module.exports = db;