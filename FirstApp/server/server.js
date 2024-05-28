const express = require("express")
const app = express()
const cors = require('cors')

//GLOBAL VARIABLES
const PORT = 8000
const DB = "CommunicateSocket"

app.use( express.json() ,express.urlencoded({ extended: true }),cors()) ;

require('./config/configs.mongoose')(DB)
require('./routes/user.routes')(app)

app.listen(PORT,()=>console.log(`>>>SERVER IS RUNNING ON PORT ${PORT}<<<`))