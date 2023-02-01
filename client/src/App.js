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
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import { useDispatch, useSelector } from "react-redux";
import Notice from "./components/Notice/Notice";
import ContactUs from "./pages/ContactUs/ContactUs";
import About from "./pages/About/About";
import { useEffect } from "react";
import { getSettings } from "./redux/apiCalls";

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
      path: "/payment/",
      element: <Payment />,
    },
    {
      path: "/checkout-success",
      element: <Success />,
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    getSettings(dispatch);
  }, [dispatch]);

  return (
    <>
      <title>OPTIKART</title>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
