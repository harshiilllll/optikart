import { useTheme } from "@emotion/react";
import { Button, FormLabel, TextField } from "@mui/material";
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

  const [content, setContent] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent({ ...content, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setContent({ ...content, [e.target.name]: value });
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
        <select
          style={{
            width: "100%",
            height: "200px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: colors.blueAccent[900],
            color: colors.primary[100],
            borderRadius: "4px",
            border: "none",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottom: "1px solid #eee",
          }}
          multiple
          name="content"
          id="content"
          onChange={handleSelect}
        >
          <option disabled>
            Select Multiple Products by ctrl + click. (Total products:{" "}
            {products.length})
          </option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>
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
