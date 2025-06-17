const nodeCache = require("../data/nodeCache")

const addProduct = async (payload) => {
  try {
    let resp = nodeCache.set(payload.id, payload)
    return resp
  } catch (error) {
    return error
  }
}

const addMultipleProduct = async (payload) => {
  try {
    let resp = nodeCache.mset(payload)
    return resp
  } catch (error) {
    return error
  }
}

module.exports = { addProduct, addMultipleProduct }
