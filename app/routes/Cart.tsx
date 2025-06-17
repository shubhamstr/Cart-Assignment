import React, { useEffect } from "react"
import Header from "./Header/Index"
import { Container } from "@mui/material"
import axios from "axios"
import { SERVER_URL } from "../utils/constants"
import { useSelector, useDispatch } from "react-redux"
import { setCartList } from "../redux/cartSlice"

const Cart = () => {
  const cartList = useSelector((state: any) => state.cart.cartList)
  const dispatch = useDispatch()

  const fetchCartList = async () => {
    try {
      const { data } = await axios.get(`http://${SERVER_URL}/cart`)
      console.log(data)
      dispatch(setCartList(data.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCartList()
  }, [])
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[calc(100vh-70px)]">
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
            const totalPrice = cartList[key].price * quantity
            return (
              <div className="flex" key={index}>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  Image
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  {cartList[key].title}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  Rs. {cartList[key].price}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  {quantity}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  Rs. {totalPrice}
                </div>
                <div className="px-5 py-6 border border-green-200 w-1/6 text-center">
                  Remove
                </div>
              </div>
            )
          })}
        </Container>
      </div>
    </>
  )
}

export default Cart
