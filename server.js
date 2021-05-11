const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

require("./config/database")
require("dotenv").config()



app.use("/api", require("./routes/index"))

app.listen( 4000, ()=> console.log("Server listening on port 4000") )