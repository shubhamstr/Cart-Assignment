const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("Server is Running!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
