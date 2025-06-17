const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const cart = require("./routes/cart")
const product = require("./routes/product")

const port = process.env.PORT || 5000
const API_PREFIX = process.env.API_PREFIX || "api"

app.use(cors())
app.use(bodyParser.json({ type: "application/*+json" }))

app.get("/", (req, res) => {
  res.send("Server is Running!")
})

app.use(`/${API_PREFIX}/cart`, cart)
app.use(`/${API_PREFIX}/products`, product)

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`)
})
