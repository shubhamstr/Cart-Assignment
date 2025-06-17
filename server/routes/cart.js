const express = require("express")
const { addMultipleProduct, getAllProduct } = require("../controllers/cart")

const router = express.Router()

router.get("/", async function (req, res) {
  try {
    const getResp = await getAllProduct()
    return res
      .send({
        msg: "Products added to the cart.",
        data: getResp,
      })
      .status(200)
  } catch (error) {
    return res
      .send({
        msg: "error while adding product to the cart.",
        data: error,
      })
      .status(200)
  }
})

router.post("/", async function (req, res) {
  try {
    console.log("req.body", req.body)
    const addResp = await addMultipleProduct(req.body)
    if (addResp) {
      const getResp = await getAllProduct()
      return res
        .send({
          msg: "Products added to the cart.",
          data: getResp,
        })
        .status(200)
    }
    return res
      .send({
        msg: "error while adding product to the cart.",
        data: error,
      })
      .status(200)
  } catch (error) {
    return res
      .send({
        msg: "error while adding product to the cart.",
        data: error,
      })
      .status(200)
  }
})

module.exports = router
