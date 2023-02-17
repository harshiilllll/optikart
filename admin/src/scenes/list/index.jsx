import { useTheme } from "@emotion/react";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

  const [content, setContent] = useState({ content: [] });

  const handleChange = (e) => {
    const value = e.target.value;
    setContent({ ...content, [e.target.name]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = content;
    updateList(id, updatedList, dispatch);
    toast.success("List updated")
  };

  useEffect(() => {
    getLists(dispatch);
    setContent({ ...content, _id: id });
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
        UPDATE
      </Button>
      <ToastContainer />
    </form>
  );
};

export default List;
