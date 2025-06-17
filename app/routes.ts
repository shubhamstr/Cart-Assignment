import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("products", "routes/Products.tsx"),
  route("cart", "routes/Cart.tsx"),
] satisfies RouteConfig
