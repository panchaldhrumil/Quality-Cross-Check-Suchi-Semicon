const express = require('express')
const app = express() ;


const path = require('path') ;
const cookieparser = require('cookie-parser') ;

app.set("viewengine" , "ejs" ) ;
app.use(express.jaon()) ;
app.use(express.urlencoded({extended : true})) ;
app.use(express.static(path.join(__dirname,'public'))) ;
app.use(cookieparser()) ;

app.get('/' , function(req,res){
    res.render('index') ;
})


app.listen('3000') ;











