 
const mongoose = require('mongoose');
const dbHOST = process.env.DBHOST;

mongoose.connect(dbHOST)
    .then(() => {
        console.log('MongoDB Connnected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    })

// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/bookstore");