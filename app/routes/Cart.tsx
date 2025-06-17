import React, { useEffect, useState } from "react"
import Header from "./Header/Index"
import { Button, ButtonGroup, Container, IconButton } from "@mui/material"
import axios from "axios"
import { SERVER_URL } from "../utils/constants"
import { useSelector, useDispatch } from "react-redux"
import { setCartList } from "../redux/cartSlice"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import CloseIcon from "@mui/icons-material/Close"

const Cart = () => {
  const cartList = useSelector((state: any) => state.cart.cartList)
  const dispatch = useDispatch()
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState(false)

  const handleClick = (msgVal: any) => {
    setOpen(true)
    setMsg(msgVal)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const fetchCartList = async () => {
    try {
      const { data } = await axios.get(`http://${SERVER_URL}/cart`)
      console.log(data)
      dispatch(setCartList(data.data))
      setFinalTotal(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const setPayload = async (data: any) => {
    const obj: any = {}
    Object.keys(data).map((key: any) => {
      obj[key] = data[key]
    })
    // console.log(obj)
    return obj
  }

  const updateCart = async () => {
    try {
      // console.log(SERVER_URL)
      const payload = await setPayload(cartList)
      // console.log(payload)
      const response: any = await axios.put(
        `http://${SERVER_URL}/cart`,
        payload
      )
      console.log(response.data)
      handleClick("Cart is updated.")
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCart = async (key: any) => {
    try {
      // console.log(SERVER_URL)
      const payload = {
        data: {
          key: key,
        },
      }
      const response: any = await axios.delete(
        `http://${SERVER_URL}/cart`,
        payload
      )
      console.log(response.data)
      handleClick("Product removed from the cart.")
      fetchCartList()
    } catch (error) {
      console.error(error)
    }
  }

  const setFinalTotal = (obj: any) => {
    let subTotalvalue: any = 0
    let totalValue: any = 0
    Object.keys(obj).forEach((key) => {
      const element = obj[key]
      subTotalvalue = element.price * element.quantity
    })
    totalValue = subTotalvalue + 50
    subTotalvalue = subTotalvalue.toFixed(2)
    setSubTotal(subTotalvalue)
    totalValue = totalValue.toFixed(2)
    setTotal(totalValue)
  }

  const decreaseQuantity = (keyValue: any) => {
    // console.log(cartList)
    let obj: any = { ...cartList }
    let item: any = { ...obj[keyValue] }
    item.quantity -= 1
    obj[keyValue] = item
    console.log(obj)
    dispatch(setCartList(obj))
    setFinalTotal(obj)
    handleClick("Quantity updated.")
  }

  const increaseQuantity = (keyValue: any) => {
    // console.log(cartList)
    let obj: any = { ...cartList }
    let item: any = { ...obj[keyValue] }
    item.quantity += 1
    obj[keyValue] = item
    console.log(obj)
    dispatch(setCartList(obj))
    setFinalTotal(obj)
    handleClick("Quantity updated.")
  }

  useEffect(() => {
    fetchCartList()
  }, [])
  return (
    <>
      <Header />
      <div className="flex justify-center mt-10 h-[calc(100vh-70px)]">
        <Container maxWidth="lg">
          <div className="flex">
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Image
            </div>
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Product
            </div>
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Price
            </div>
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Quantity
            </div>
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Total
            </div>
            <div className="px-5 py-6 border border-green-200 w-1/6 text-center font-semibold">
              Remove
            </div>
          </div>
          {Object.keys(cartList).map((key: any, index: any) => {
            const quantity = cartList[key]?.quantity || 1
            let totalPrice: any = cartList[key].price * quantity
            totalPrice = totalPrice.toFixed(2)
            return (
              <div className="flex" key={index}>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  <img
                    src={`${cartList[key]?.images?.[0]}`}
                    alt={"image"}
                    className="h-40"
                    loading="lazy"
                  />
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  {cartList[key].title}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  Rs. {cartList[key].price}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() => {
                        if (quantity !== 1) {
                          decreaseQuantity(key)
                        }
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <span className="px-6 py-2">{quantity}</span>
                    <Button
                      onClick={() => {
                        if (quantity < 15) {
                          increaseQuantity(key)
                        }
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  Rs. {totalPrice}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 flex justify-center items-center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteCart(key)
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </div>
              </div>
            )
          })}
          <div className="flex justify-between mt-10">
            <div className="flex flex-col">
              <Button variant="contained" color="error" onClick={updateCart}>
                Update Cart
              </Button>
            </div>
            <div className="flex flex-col w-50">
              <h2 className="border-b border-green-200 text-right font-semibold mb-2">
                Cart Total
              </h2>
              <p className="mb-2 flex justify-between">
                <span className="">Subtotal</span>
                <span className="">Rs. {subTotal}</span>
              </p>
              <p className="mb-2 flex justify-between">
                <span className="">Delivery Charges</span>
                <span className="">Rs. 50</span>
              </p>
              <p className="mb-2 flex justify-between">
                <span className="">Total</span>
                <span className="">Rs. {total}</span>
              </p>
              <Button variant="contained" color="error">
                Checkout
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </>
  )
}

export default Cart
