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
import BankPage from "../pages/Bank/BankPage";

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
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>
            },
            {
                path: "/admin",
                element: <PrivateRoute> <Admin /></PrivateRoute>
            },
            {
                path: "/bank",
                element: <PrivateRoute><BankPage /> </PrivateRoute>
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