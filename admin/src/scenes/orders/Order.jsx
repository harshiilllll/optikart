import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Order = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [order, setOrder] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get("/orders/" + id, {
        headers: {
          token:
            "Bearer " +
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
              .user.accessToken,
        },
      });
      setOrder(res.data);
    };
    getOrder();
  }, [id]);

  return (
    <Box m="20px">
      {order && (
        <>
          <Box display="flex" gap="10px">
            <Header title={`Order Number`} />
            <Typography variant="h2" sx={{ color: colors.greenAccent[500] }}>
              #{order._id}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              gap="10px"
              p="10px 0px"
              alignItems="center"
              borderBottom="1px solid white"
            >
              <Typography variant="h4">Delivery Status: </Typography>
              <Box
                backgroundColor={colors.greenAccent[500]}
                color="white"
                maxWidth="80px"
                width="80px"
                display="flex"
                justifyContent="center"
                p="4px 10px"
                borderRadius="4px"
                textTransform="uppercase"
              >
                {order.delivery_status}
              </Box>
            </Box>
            <Box
              display="flex"
              gap="10px"
              p="10px 0px"
              alignItems="center"
              // borderBottom="1px solid white"
            >
              <Typography variant="h4">
                <label style={{ width: "700px" }}>userId: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order.userId}
                </span>{" "}
                <br />
                <label style={{ width: "700px" }}>customerId: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order.customerId}
                </span>{" "}
                <br />
                <label style={{ width: "700px" }}>paymentIntentId: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order.paymentIntentId}
                </span>{" "}
                <br />
              </Typography>
            </Box>
            <Box
              display="flex"
              gap="10px"
              p="10px 0px"
              alignItems="center"
              borderBottom="1px solid white"
              mt="20px"
            >
              <Typography variant="h4">Ordered Products:</Typography>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Img</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price (INR)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>
                      <Avatar
                        sx={{ width: "100px" }}
                        src={product.img[0]}
                        variant="rounded"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.title}
                    </TableCell>
                    <TableCell align="right">{product.color}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Order;
