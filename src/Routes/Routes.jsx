import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Products/Products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/products",
                element: <Products />
            }
        ]
    }
])