import React, { useEffect } from "react"
import Header from "./Header/Index"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
} from "@mui/material"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { setProductList } from "../redux/productSlice"
import Rating from "@mui/material/Rating"

const Products = () => {
  const productList = useSelector((state: any) => state.product.productList)
  const dispatch = useDispatch()
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
                <div className="col-span-12 sm:col-span-3">
                  <Card key={index} sx={{ maxWidth: "100%" }}>
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
                      <Button variant="contained" size="small">
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
    </>
  )
}

export default Products
