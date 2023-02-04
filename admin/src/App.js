import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Users from "./scenes/users";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import { useSelector } from "react-redux";
import Products from "./scenes/products";
import Product from "./scenes/product";
import ProductForm from "./scenes/productCreate";
import Lists from "./scenes/lists";
import List from "./scenes/list";
import CreateList from "./scenes/listCreate";
import Orders from "./scenes/orders/Orders";
import Order from "./scenes/orders/Order";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const user = useSelector((state) => state.user.user);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user && user.isAdmin ? (
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/users" element={<Users />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/create-list" element={<CreateList />} />
                <Route path="/list/:id" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/form" element={<Form />} />
                <Route path="/add-product" element={<ProductForm />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
