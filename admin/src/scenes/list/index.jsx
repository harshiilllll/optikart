import { useTheme } from "@emotion/react";
import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { getLists, updateList } from "../../redux/apiCalls";
import { tokens } from "../../theme";

const List = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const id = useParams().id;

  const list = useSelector((state) =>
    state.lists.lists.find((item) => item._id === id)
  );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedList = {};
    for (const [key, value] of Object.entries(content)) {
      if (content[key] !== value && key !== "title") {
        updatedList[key] = value;
      }
    }
    updatedList = { ...content, ...updatedList };
    updateList(id, updatedList, dispatch);
  };

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  console.log(content);
  return (
    <form style={{ margin: "20px" }}>
      <Header title={`EDIT LIST`} subtitle={list.title} />
      <Box display="flex" flexDirection="column" gap="30px">
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="List title"
          name="title"
          placeholder={list?.title}
          sx={{ gridColumn: "span 2" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Description"
          name="desc"
          placeholder={list?.desc}
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
          {products.map((product) => (
            <option key={product?._id} value={product?._id}>
              {product?.title}
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

export default List;
