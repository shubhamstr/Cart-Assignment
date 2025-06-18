import React, { useEffect, useState } from "react"
import Header from "./Header/Index"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  IconButton,
} from "@mui/material"
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { setProductList } from "../redux/productSlice"
import Rating from "@mui/material/Rating"
import { SERVER_URL } from "../utils/constants"

const Products = () => {
  const productList = useSelector((state: any) => state.product.productList)
  const dispatch = useDispatch()
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

  const fetchProducts = async () => {
    try {
      const response: any = await axios.get(
        "https://dummyjson.com/products?limit=16&skip=0"
      )
      console.log(response.data)
      dispatch(setProductList(response.data.products))
    } catch (error) {
      console.error(error)
    }
  }

  const setPayload = async (data: any) => {
    const obj: any = { ...data }
    obj["quantity"] = 1
    return [{ key: data.id, val: obj }]
  }

  const addToCart = async (product: any) => {
    try {
      // console.log(SERVER_URL)
      const payload = await setPayload(product)
      const response: any = await axios.post(
        `http://${SERVER_URL}/cart`,
        payload
      )
      console.log(response.data)
      handleClick("Added to Cart.")
      // dispatch(setProductList(response.data.products))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(productList)
  }, [productList])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Header />
      <div className="flex justify-center items-start h-[calc(100vh-70px)]">
        <Container maxWidth="xl" className="w-full mt-15">
          <div className="w-full grid grid-cols-12 gap-4">
            {productList.map((single: any, index: any) => {
              return (
                <div key={index} className="col-span-12 sm:col-span-3">
                  <Card sx={{ maxWidth: "100%" }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={single?.images?.[0]}
                      sx={{ height: "200px", objectFit: "contain" }}
                    />
                    <CardContent>
                      <Rating
                        name="simple-controlled"
                        value={single.rating}
                        readOnly
                        // onChange={(event, newValue) => {
                        //   setValue(newValue)
                        // }}
                      />
                      <Typography gutterBottom variant="body1">
                        {single.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", height: "105px" }}
                      >
                        {single.description}
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        Rs. {single.price}
                      </Typography>
                    </CardContent>
                    <CardActions className="flex justify-center mb-3">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          addToCart(single)
                        }}
                      >
                        Add to Cart
                      </Button>
                      {/* <Button variant="contained" size="small">
                        Learn More
                      </Button> */}
                    </CardActions>
                  </Card>
                </div>
              )
            })}
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

export default Products
