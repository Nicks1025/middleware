const express = require("express")
const path = require("path")
const fs = require("fs")
const { isBuffer } = require("lodash")

const app = express()

const PORT = process.env.PORT || 3000

app.use(function(req,res,next) {
    console.log("Request Date : " + new Date())
    // res.send("Welcome to Middleware App") 
    next()
})

app.use(function(req,res,next) {
    var filepath = path.join(__dirname,"static",req.url)
    fs.stat(filepath,function(err, fileinfo) {
        if(err) {
            next();
            return
        }
        if(fileinfo.isFile()){
            res.sendFile(filepath)
        }
        else{
            next()
        }
    })
})


app.use(function(req,res){
    res.status(404)
    res.send("File Not Found")
})
app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))