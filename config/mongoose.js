const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kavach_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to mongodb"));

db.once('open', function() {
    console.log('Successfully connected to database mongodb');
});

module.exports = db;