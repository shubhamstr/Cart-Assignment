const nodeCache = require("../data/nodeCache")

const addToCart = async (payload) => {
  try {
    let resp = nodeCache.set(payload.id, payload)
    // console.log("addToCart resp", resp)
    return resp
  } catch (error) {
    return error
  }
}

const addToCartMultiple = async (payload) => {
  try {
    let resp = nodeCache.mset(payload)
    return resp
  } catch (error) {
    return error
  }
}

const getAllCartList = async () => {
  try {
    const keys = nodeCache.keys()
    // console.log("getAllCartList keys", keys)
    let resp = nodeCache.mget(keys)
    // console.log("getAllCartList resp", resp)
    return resp
  } catch (error) {
    return error
  }
}

const deleteCart = async (payload) => {
  try {
    let resp = nodeCache.del(payload)
    console.log("deleteCart resp", resp)
    return resp
  } catch (error) {
    return error
  }
}

const updateCart = async (payload) => {
  try {
    let resp = nodeCache.mset(payload)
    console.log("updateCart resp", resp)
    return resp
  } catch (error) {
    return error
  }
}

module.exports = {
  addToCart,
  addToCartMultiple,
  getAllCartList,
  deleteCart,
  updateCart,
}
