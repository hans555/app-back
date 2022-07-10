var express = require("express")
var app = express()
require("dotenv").config() 
var port = process.env.PORT
const { handleGetAppointment, handleFixAppointment, handleCancelAppointment } = require("./appointmentHandler")

app.use(express.json())
app.get("/appointment/get", handleGetAppointment)

app.post("/appointment/fix", handleFixAppointment)

app.post("/appointment/cancel", handleCancelAppointment)

app.post("/create", function(req, req) {
    res.send("hello wordld!")
})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})