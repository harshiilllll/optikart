import { useTheme } from "@emotion/react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const productId = useParams().id;
  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  console.log(product);
  return (
    <Box m="20px">
      <Header title={product.title} subtitle="Edit Product" />
      <ImageList
        sx={{ width: "auto", height: "auto" }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {product.img.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              sx={{ objectFit: "contain" }}
              src={item}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Product;
