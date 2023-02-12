import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";

const Order = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();
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

  const [selectedOption, setSelectedOption] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setSelectedOption(e.currentTarget.textContent.toLowerCase());
    setAnchorEl(null);
  };

  const handleSave = async () => {
    if (selectedOption === "") return;

    await axios.put(
      "/orders?id=" + id,
      { delivery_status: selectedOption },
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
              .user.accessToken,
        },
      }
    );
  };

  const handleDelete = async () => {
    await axios.delete("/orders/" + id, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    navigate("/orders");
  };

  return (
    <Box m="20px">
      {order && (
        <>
          <Box display="flex" gap="10px" alignItems="center">
            <Box m="0 0 20px 0">
              <Typography variant="h1" textTransform="uppercase">
                Order Number
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  bgcolor: colors.grey[900],
                  borderRadius: "8px",
                  padding: "2px 4px",
                  color: colors.greenAccent[500],
                  height: "fit-content",
                }}
              >
                #{order?._id}
              </Typography>
            </Box>
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
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                sx={{ bgcolor: colors.greenAccent[700] }}
              >
                {selectedOption || order.delivery_status}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>DISPATCHED</MenuItem>
                <MenuItem onClick={handleClose}>DELIVERED</MenuItem>
                <MenuItem onClick={handleClose}>PENDING</MenuItem>
              </Menu>
              <Button
                onClick={handleSave}
                variant="outlined"
                sx={{
                  color: colors.greenAccent[500],
                  borderColor: colors.greenAccent[500],
                }}
              >
                SAVE
              </Button>
              <Button
                onClick={handleDelete}
                variant="outlined"
                sx={{
                  color: colors.redAccent[500],
                  borderColor: colors.redAccent[500],
                }}
              >
                DELETE
              </Button>
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
                  {order?.userId}
                </span>{" "}
                <br />
                <label style={{ width: "700px" }}>customerId: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order?.customerId}
                </span>{" "}
                <br />
                <label style={{ width: "700px" }}>paymentIntentId: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order?.paymentIntentId}
                </span>{" "}
                <br />
                <label style={{ width: "700px" }}>Customer Name: </label>
                <span style={{ color: colors.greenAccent[500] }}>
                  {order?.shipping.name}
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

            <Box display="flex">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Price (INR)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.product_info.map((info) => (
                    <TableRow key={info.productId}>
                      <TableCell>{info.productId}</TableCell>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          sx={{ width: "100px" }}
                          src={info.img[0]}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {info.size}
                      </TableCell>
                      <TableCell>{info.color}</TableCell>
                      <TableCell align="right">{info.quantity}</TableCell>
                      <TableCell align="right">{info.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Total (INR)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.description}
                      </TableCell>
                      <TableCell align="right">
                        {product.amount_total / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Order;
