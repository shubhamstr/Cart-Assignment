const express = require("express")
const { addToCartMultiple, getAllCartList } = require("../controllers/cart")

const router = express.Router()

router.get("/", async function (req, res) {
  try {
    const getResp = await getAllCartList()
    return res
      .send({
        msg: "Cart list fetched successfully.",
        data: getResp,
      })
      .status(200)
  } catch (error) {
    return res
      .send({
        msg: "error while fetching cart list.",
        data: error,
      })
      .status(200)
  }
})

router.post("/", async function (req, res) {
  try {
    console.log("req.body", req.body)
    const addResp = await addToCartMultiple(req.body)
    if (addResp) {
      const getResp = await getAllCartList()
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
