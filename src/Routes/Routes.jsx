import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Products/Products";
import ItemDetails from "../pages/Item/ItemDetails/ItemDetails";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import Admin from "../pages/Admin/Admin";
import Dashboard from "../Layout/Dashboard";
import Orders from "../pages/Orders/Orders";

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
            },
            {
                path: "/products/:id",
                element: <PrivateRoute><ItemDetails /></PrivateRoute>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <CheckoutPage />
            },
            {
                path: "/admin",
                element: <Admin />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard/orders",
                element: <Orders />
            }
        ]
    }
])