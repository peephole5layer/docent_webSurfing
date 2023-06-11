const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/kavach_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to mongodb"));

db.once('open', function() {
    console.log('Successfully connected to database mongodb');
});

module.exports = db;