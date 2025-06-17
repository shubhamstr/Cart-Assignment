import React from "react"
import Header from "../Header/Index"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
} from "@mui/material"

const Products = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start h-[calc(100vh-70px)]">
        <Container maxWidth="xl" className="w-full mt-15">
          <div className="w-full grid grid-cols-4 gap-4">
            <Card sx={{ maxWidth: 345 }} className="col-span-12 md:col-span-4">
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                // image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Products
