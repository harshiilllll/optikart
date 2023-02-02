import "./app.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";
import { useDispatch, useSelector } from "react-redux";
import Notice from "./components/Notice/Notice";
import ContactUs from "./pages/ContactUs/ContactUs";
import About from "./pages/About/About";
import { useCallback, useEffect } from "react";
import { getCart, getSettings } from "./redux/apiCalls";
import axios from "axios";

const App = () => {
  const user = useSelector((state) => state.user.user);

  const Layout = () => {
    return (
      <div className="App">
        <Notice />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/:category",
          element: <ProductList />,
        },
        {
          path: "/products/",
          element: <ProductList />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/cart/",
          element: user ? <Cart /> : <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact/",
          element: <ContactUs />,
        },

        {
          path: "/login",
          element: user ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/register",
          element: user ? <Navigate to="/" /> : <Register />,
        },
      ],
    },
    {
      path: "/checkout-success",
      element: <Success />,
    },
  ]);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    getSettings(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getCart(dispatch, user?._id);
  }, [dispatch, user?._id]);

  const createOrUpdateCart = useCallback(async () => {
    try {
      const existingCart = await axios.get(`/carts/find/${user?._id}`);
      if (existingCart.data !== null) {
        await axios.patch(`/carts/${user?._id}`, {
          products: cart.products,
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
        });
      } else {
        await axios.post("/carts", {
          userId: user?._id,
          userName: user?.username,
          products: cart.products,
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    cart.products,
    user?._id,
    cart.quantity,
    cart.totalPrice,
    user?.username,
  ]);

  useEffect(() => {
    createOrUpdateCart();
  }, [createOrUpdateCart]);

  return (
    <>
      <title>OPTIKART</title>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
