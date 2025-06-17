const express = require("express")

const router = express.Router()

router.get("/", function (req, res) {
  res.send("Hello from APIv1 root route.")
})

router.get("/users", function (req, res) {
  res.send("List of APIv1 users.")
})

module.exports = router
