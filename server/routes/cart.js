const express = require("express")
const { addProduct } = require("../controllers/cart")

const router = express.Router()

router.get("/", function (req, res) {
  res.send("Hello from APIv1 root route.")
  // res
  //   .send({
  //     msg: "Products fetched successfully.",
  //     data: products.data,
  //   })
  //   .status(200)
})

router.post("/", function (req, res) {
  console.log(req.body)
  addProduct({
    id: "1",
    title: "product1",
  })
  res
    .send({
      msg: "Products added to the cart.",
      data: req.body,
    })
    .status(200)
})

module.exports = router
