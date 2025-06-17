const express = require("express")
const products = require("../data/products.json")

const router = express.Router()

router.get("/", function (req, res) {
  console.log(products)
  res.send(products.data).status(200)
})

module.exports = router
