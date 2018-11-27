const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());  //adding a piece of middleware, when we call express.json() method, this method returns a piece of middleware,
                          // and we call app.use to use that middleware.

const courses = [
    {id:1, name:'javascript'},
    {id:2, name:'nodejs'},
    {id:3, name:'angular'},
    {id:4, name:'jquery'}
];

//GET
//to read all courses in the array
app.get('/courses', (req, res) => {
    res.send(courses);
});

//to read required course from the array
app.get('/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course with given id is not found..");
    res.send(course);
});


//POST using postman
// app.post('/courses', (req, res) => {
//     const course = { id: courses.length + 1 , name:req.body.name };
//     courses.push(course);
//     res.send(course);
// });

//input validation in post using joi
app.post('/courses', (req, res) => {

    const schema = { name: Joi.string().min(3).required() };

    const result = Joi.validate( req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = { id: courses.length + 1 , name:req.body.name };
    courses.push(course);
    res.send(course);
});


//PUT
app.put('/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course with given id is not found..");
    course.name = req.body.name;
    res.send(course);
});


//DELETE
app.delete('/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course with given id is not found..");

    const index = courses.indexOf(course);
    courses.splice(index,1);  // 1 indicates removes one object
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port number ${port}`));