const express=require('express');
const request=require('request');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine',hbs);

app.use((req,res,next)=>{

fs.appendFile('./server.log',req.method + " " + req.url,(err)=>{console.log(err)});
console.log(req.url.split('?')[1]);
next();

});

app.use(express.static(__dirname + "/public"));



app.get("/",(req,res)=> {

    res.render('home.hbs',{pagetitle:'home',currentdate:new Date().getFullYear()});
});

app.get("/about",(req,res)=>{
res.render('about.hbs',{
    pagetitle:'About page',
    currentdate: new Date().getFullYear()
})
});

app.get("/bad",(req,res)=>{
res.send({
    error : 'error accured',
    errorNumber:312
})

});


app.get('/google',(req,res)=>{
request({url:"http://www.facebook.com",json:false},(error,response,body)=>{
    res.send(body);
    
})

});
app.listen(3000,()=>{console.log('start at port 3000')});