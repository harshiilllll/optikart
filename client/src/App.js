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

const user = true;

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <Layout /> : <Login />,
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
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: user ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "/register",
    element: user ? <Navigate to="/" /> : <Register />,
  },
  {
    path: "/payment/",
    element: <Payment />,
  },
  {
    path: "/success/",
    element: <Success />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
