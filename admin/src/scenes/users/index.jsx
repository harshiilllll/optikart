import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Avatar, Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCustomer, getCustomers } from "../../redux/apiCalls";
import { format } from "timeago.js";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    getCustomers(dispatch);
  }, [dispatch]);

  const customers = useSelector((state) => state.customers.customers);
  console.log(customers.length);

  //Delete
  const handleDelete = (id) => {
    if (window.confirm("Are your sure you want to delete?")) {
      deleteCustomer(id, dispatch);
    } else {
      return;
    }
  };

  const columns = [
    { field: "_id", headerName: "User ID", flex: 0.5 },
    {
      field: "profilePic",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => (
        <Avatar
          sx={{ bgcolor: "secondary.main" }}
          src={params.row.profilePic}
          alt=""
        >
          {params.row.profilePic}
        </Avatar>
      ),
    },
    {
      field: "username",
      headerName: "Name",
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Account Created",
      flex: 1,
      renderCell: (params) => <span>{format(params.row.createdAt)}</span>,
    },
    {
      field: "delete",
      headerName: "Delete",
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
      <Header title="USERS" subtitle="List of Users for Reference" />
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
          rows={customers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Users;
