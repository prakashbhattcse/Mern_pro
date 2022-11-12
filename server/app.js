const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();


const DBurl = 'mongodb+srv://prakashbhattcse:pcb12345@cluster0.uv6jepn.mongodb.net/?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}
// 
// mongoose.connect(DB, connectionParams).then(() => {
//     console.log('connection succesfull');
// }).catch((err) =>
//     console.log("no connection"));


mongoose.connect(DBurl,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


const middleware = (req, res, next) => {
    console.log("Hello from middleware");
    next();
};




app.get('/', (req, res) => {
    res.send("hello")
});


app.get('/about', middleware, (req, res) => {
    console.log("hello my about");
    res.send("welcome to about")
});

app.get('/contact', (req, res) => {
    res.send("welcome to contact")
})



app.listen(3000, () => {
    console.log("server is listining")
});