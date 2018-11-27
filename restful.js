const express = require('express');
const app = express();

//get http method
app.get('/',(req,res) => {
    res.send("Hello world .....!");
});

//get with path
app.get('/array', (req, res) => {
    res.send([1,2,3,4,5]);
});

//route parameters
app.get('/array/:id', (req,res) => {
    res.send(req.params.id);
});

app.get('/api/:year/:month', (req,res) => {
    res.send(req.params);
});

//query string parameter
app.get('/ask', (req,res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen (port, () => console.log(`Listening to port number ${port}...`));