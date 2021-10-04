const express = require('express');

//server creation
const app=express();
let port='8080';
app.listen(port , function(){
    console.log(`server is listening on port ${port}`);
});

//types of request -> get post put delete
app.get('/' , (req,res)=>{
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log("hello from home page");
    res.send('<h1>hello hi from backend </h1>');
});

let obj = {
    'name':'Shahrukh'
}
app.get('/user' , (req , res)=>{
    console.log('users');
    res.json(obj);
})

app.get('/home' , (req , res)=>{
    console.log('users');
// console.log(__dirname);
    res.sendFile('./views/index.html' , {root:__dirname});
})



