const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/brad123');
let db = mongoose.connection;


// Check conection
db.once('open', function() {
    console.log('Mongodb Conecting Succeeded.');
})


// Check for DB errors
db.on('error', function(err) {
    console.log(err);
})