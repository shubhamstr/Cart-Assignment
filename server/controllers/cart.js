const nodeCache = require("../data/nodeCache")

const addProduct = async (payload) => {
  try {
    let resp = nodeCache.set(payload.id, payload)
    console.log("addProduct resp", resp)
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

const getAllProduct = async () => {
  try {
    const keys = nodeCache.keys()
    console.log("getAllProduct keys", keys)
    let resp = nodeCache.mget(keys)
    console.log("getAllProduct resp", resp)
    return resp
  } catch (error) {
    return error
  }
}

module.exports = { addProduct, addMultipleProduct, getAllProduct }
