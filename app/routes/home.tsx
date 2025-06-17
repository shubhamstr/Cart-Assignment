import type { Route } from "./+types/home"
// import { Welcome } from "./welcome/welcome";
import Header from "./Header/Index"
import Typography from "@mui/material/Typography"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  // return <Welcome />;
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[calc(100vh-70px)]">
        <Typography variant="h3" className="text-center" gutterBottom>
          Welcome to Shopping Cart
        </Typography>
      </div>
    </>
  )
}
