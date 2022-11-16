const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/estudo-backend');

    const db = mongoose.connection;

    db.once('open', () => {
        console.log("Connected to database");
    })

    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports={
    connect
};
