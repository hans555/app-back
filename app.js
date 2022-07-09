var express = require("express")
var app = express()
require("dotenv").config() 



var port = process.env.PORT


app.get("/appointment/get", function(req, res) {
    res.send("hello world!")
})

app.post("/appointment/fix", function(req, res) {
    res.send("hello world!")
})

app.post("/appointment/cancel", function(req, res) {
    res.send("hello world!")
})

app.post("/create", function(req, req) {
    res.send("hello wordld!")
})



app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})