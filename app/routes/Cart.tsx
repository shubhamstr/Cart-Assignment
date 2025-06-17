import React from "react"
import Header from "./Header/Index"
import { Container } from "@mui/material"

const Cart = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <div className="flex justify-center items-center h-[calc(100vh-70px)]"></div>
      </Container>
    </>
  )
}

export default Cart
