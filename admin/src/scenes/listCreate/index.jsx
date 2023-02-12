import { useTheme } from "@emotion/react";
import {
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { addList } from "../../redux/apiCalls";
import { tokens } from "../../theme";

const CreateList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent({ ...content, [e.target.name]: value });
  };

  const [content, setContent] = useState({ content: [] });

  const handleProductSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setContent({ ...content, content: [...content.content, value] });
    } else {
      setContent({
        ...content,
        content: content.content.filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addList(content, dispatch);
      toast.success("List Created");
    } catch (error) {
      toast.error("Something went wrong, try again later");
    }
  };
  return (
    <form style={{ margin: "20px" }}>
      <Header title={`CREATE LIST`} subtitle="Create New List" />
      <Box display="flex" flexDirection="column" gap="30px">
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="List title"
          name="title"
          placeholder="Title"
          sx={{ gridColumn: "span 2" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Description"
          name="desc"
          placeholder="Description"
          sx={{ gridColumn: "span 2" }}
          onChange={handleChange}
        />
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            maxHeight: "200px",
            overflowY: "auto",
            bgcolor: colors.blueAccent[900],
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#777" }}>
            Select Products
          </Typography>
          <br />
          {products.map((product) => (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <FormControlLabel
                key={product._id}
                control={
                  <Checkbox
                    onChange={handleProductSelect}
                    value={product._id}
                    sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
                  />
                }
                label={product.title}
                sx={{ textTransform: "capitalize" }}
              />
              <Typography variant="body1">Rs.{product.price}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        sx={{ marginTop: "20px" }}
        type="submit"
        color="secondary"
        variant="contained"
        onClick={handleSubmit}
      >
        CREATE
      </Button>
      <ToastContainer />
    </form>
  );
};

export default CreateList;
