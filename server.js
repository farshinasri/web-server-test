const express=require('express');
const request=require('request');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname + "/views/partials");
const port=process.env.PORT || 3000;
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
    error : 'error error error ',
    errorNumber:312
})

});

var ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
app.get('/bbcp',(req,res)=>{
request({url:"http://www.bbc.com/persian",json:false,headers: {
    'User-Agent': ua
  }},(error,response,body)=>{
    res.send(body);
    
    })

});
app.listen(port,()=>{console.log('start at port ' + port)});