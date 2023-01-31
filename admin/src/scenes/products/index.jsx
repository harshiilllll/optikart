import { Avatar, Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { format } from "timeago.js";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Fetch products
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const products = useSelector((state) => state.products.products);

  //Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are your sure you want to delete?")) {
      deleteProduct(id, dispatch);
    } else {
      return;
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    {
      field: "img",
      headerName: "Img",
      width: 30,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              sx={{
                bgcolor: colors.greenAccent[300],
                objectFit: "contain",
                height: 28,
                marginRight: 1,
              }}
              alt={params.row.title}
              src={params.row.img[0]}
              variant="rounded"
            />
          </>
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return <div title={params.row.title}>{params.row.title}</div>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "inStock",
      headerName: "In Stock",
      flex: 1,
      renderCell: (params) =>
        params.row.inStock ? (
          <DoneRoundedIcon sx={{ color: colors.greenAccent[300] }} />
        ) : (
          <CloseRoundedIcon sx={{ color: colors.redAccent[500] }} />
        ),
    },
    {
      field: "createdAt",
      headerName: "Created",
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
              to={`/product/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                sx={{ padding: "5px", bgcolor: colors.primary[500] }}
                variant="contained"
              >
                Edit
              </Button>
            </Link>
            <Button
              size="small"
              sx={buttonSX}
              variant="contained"
              onClick={() => handleDelete(params.row._id)}
            >
              DELETE
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="Managing the products" />
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
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = products.filter((product) =>
              selectedIDs.has(product._id.toString())
            );
            console.log(selectedRowData);
          }}
        />
      </Box>
    </Box>
  );
};

export default Products;
