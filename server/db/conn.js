const express = require('express');
const { default: mongoose } = require('mongoose');

const DB = process.env.DATABASE; 


const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}


mongoose.connect(DB, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database.${err}`);
    })
