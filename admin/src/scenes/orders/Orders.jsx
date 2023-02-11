import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect } from "react";
import { getOrders } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { format } from "timeago.js";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Fetch products
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);
  const orders = useSelector((state) => state.orders.orders);

  //Delete product
  //   const handleDelete = (id) => {
  //     if (window.confirm("Are your sure you want to delete?")) {
  //       deleteProduct(id, dispatch);
  //     } else {
  //       return;
  //     }
  //   };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 180 },
    {
      field: "shipping.email",
      headerName: "Customer Email",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <div title={params.row.shipping.name}>
            {params.row.shipping.email}
          </div>
        );
      },
    },
    {
      field: "total_products",
      headerName: "Products",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <div>{params.row.products.length}</div>
          </>
        );
      },
    },
    {
      field: "total",
      headerName: "Total amt.",
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <>
            <div>{params.row.total / 100}</div>
          </>
        );
      },
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      flex: 1,
      renderCell: (params) =>
        params.row.payment_status === "paid" ? (
          <DoneRoundedIcon sx={{ color: colors.greenAccent[300] }} />
        ) : (
          <CloseRoundedIcon sx={{ color: colors.redAccent[500] }} />
        ),
    },
    {
      field: "delivery_status",
      headerName: "Delivery Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.delivery_status === "pending") {
          return (
            <Box
              backgroundColor={colors.redAccent[300]}
              color={colors.redAccent[800]}
              fontWeight="700"
              maxWidth="80px"
              width="80px"
              display="flex"
              justifyContent="center"
              p="5px 7px"
              borderRadius="14px"
            >
              PENDING
            </Box>
          );
        } else if (params.row.delivery_status === "delivered") {
          return (
            <Box
              backgroundColor={colors.greenAccent[200]}
              color={colors.greenAccent[800]}
              fontWeight="700"
              maxWidth="80px"
              width="80px"
              display="flex"
              justifyContent="center"
              p="5px 7px"
              borderRadius="14px"
            >
              DELIVERED
            </Box>
          );
        } else if (params.row.delivery_status === "dispatched") {
          return (
            <Box
              backgroundColor={colors.blueAccent[200]}
              color={colors.blueAccent[800]}
              fontWeight="700"
              maxWidth="80px"
              display="flex"
              justifyContent="center"
              p="5px 7px"
              borderRadius="14px"
            >
              DISPATCHED
            </Box>
          );
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Order Recieved",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {format(params.row.createdAt)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "left",
      renderCell: (params) => {
        const buttonSX = {
          padding: "5px",
          bgcolor: colors.redAccent[500],
          "&:hover": {
            bgcolor: colors.redAccent[600],
          },
        };
        return (
          <Box display="flex" gap="10px">
            <Link
              to={`/order/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                sx={{ padding: "5px", bgcolor: colors.blueAccent[400] }}
                variant="contained"
              >
                VIEW
              </Button>
            </Link>
            {/* <Button
              size="small"
              sx={buttonSX}
              variant="contained"
              onClick={() => handleDelete(params.row._id)}
            >
              DELETE
            </Button> */}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="ORDERS" subtitle="Managing the orders" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={orders}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
