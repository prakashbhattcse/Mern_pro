const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const app = express();


dotenv.config({ path: './config.env' });

require('./db/conn')

app.use(express.json())        // it helps us to read the json data as it converts json to string
const User = require('./model/userSchema');


// middleware  - linking our router file to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// middleware
const middleware = (req, res, next) => {
    console.log("Hello from middleware");
    next();
};


// app.get('/', (req, res) => {
//     res.send("hello")
// });


app.get('/about', middleware, (req, res) => {
    console.log("hello my about");
    res.send("welcome to about")
});

app.get('/contact', (req, res) => {
    res.send("welcome to contact")
})

app.listen(PORT, () => {
    console.log(`server is listining ${PORT}`)
});