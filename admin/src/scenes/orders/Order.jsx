import { Box, Button, Typography, useTheme } from "@mui/material";
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
          <Box
            display="flex"
            flexDirection="column"
            height="400px"
            sx={{
              bgcolor: colors.blueAccent[900],
              borderRadius: "8px",
              padding: "10px 10px",
              boxShadow: "0 0 30px rgba(0,0,0,0.1)",
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4" sx={{ color: "black" }}>
                Delivery Status:{" "}
              </Typography>
              <Box
                backgroundColor={colors.greenAccent[500]}
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default Order;
