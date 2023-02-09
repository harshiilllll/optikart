import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cats, setCats] = useState([]);
  const [addCat, setAddCat] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleChange = (e) => {
    setAddCat((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    await axios.post("/categories", addCat, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
  };

  const handleDelete = async (id) => {
    await axios.delete("/categories/" + id, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    await cats.filter((item) => item._id !== id);
  };

  console.log(addCat);

  const columns = [
    { field: "cat", headerName: "Category", width: 180 },
    {
      field: "actions",
      headerName: "Action",
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
      <Box display="flex" justifyContent="space-between">
        <Header title="CATEGORIES" subtitle="Managing the categories" />
      </Box>
      <Box display="flex" gap="10px">
        <TextField
          variant="filled"
          type="text"
          label="Category Title"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          type="text"
          label="Category"
          name="cat"
          onChange={handleChange}
          inputProps={{ style: { textTransform: "lowercase" } }}
        />
        <TextField
          variant="filled"
          type="text"
          label="BgImg"
          name="bgImg"
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          type="text"
          label="Desc"
          name="desc"
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: colors.greenAccent[500] }}
        >
          ADD CATEGORY
        </Button>
      </Box>
      <Box
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
          rows={cats}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Categories;
