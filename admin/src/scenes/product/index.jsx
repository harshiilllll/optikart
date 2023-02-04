import { useTheme } from "@emotion/react";
import { AddToPhotosOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [input, setInputs] = useState({});
  const [urls, seturls] = useState([]);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProduct = {};
    for (const [key, value] of Object.entries(input)) {
      if (product[key] !== value) {
        updatedProduct[key] = value;
      }
    }
    if (cat.length) updatedProduct.categories = cat;
    if (color.length) updatedProduct.color = color;
    if (size.length) updatedProduct.size = size;
    if (urls.length) updatedProduct.img = urls;
    if (input.price) updatedProduct.price = Number(input.price);
    updatedProduct = { ...product, ...updatedProduct };
    updateProduct(id, updatedProduct, dispatch)
      .then(() => {
        toast.success("Product Updated Successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log("Inputs:", input);
  // console.log("Cat:", cat);
  // console.log("Colors:", color);
  // console.log("Images:", files);
  // console.log("Urls:", urls);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setFiles((prev) => [...prev, newFile]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const promises = [];
    files.map((file) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            seturls((prev) => [...prev, urls]);
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => toast("File uploaded"))
      .catch((err) => console.log(err));
  };

  const id = useParams().id;

  const product = useSelector((state) =>
    state.products.products.find((item) => item._id === id)
  );

  return (
    <form style={{ margin: "20px" }} onSubmit={handleSubmit}>
      <Header title={`EDIT PRODUCT`} subtitle={product.title} />

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Product Name"
          name="title"
          placeholder={product?.title}
          sx={{ gridColumn: "span 2" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Price"
          name="price"
          placeholder={`${product?.price}`}
          sx={{ gridColumn: "span 1" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Old Price"
          name="oldPrice"
          placeholder={`${product?.oldPrice}`}
          sx={{ gridColumn: "span 1" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Description"
          name="desc"
          placeholder={product?.desc}
          sx={{ gridColumn: "span 4" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Categories"
          name="categories"
          placeholder={`${product?.categories}`}
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          onChange={handleCat}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Colors"
          name="color"
          placeholder={`${product?.color}`}
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          onChange={handleColor}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Size"
          placeholder={product.size}
          name="size"
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          onChange={handleSize}
        />
        <input
          type="file"
          name="img"
          multiple
          id="img"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <InputLabel
          htmlFor="img"
          style={{
            backgroundColor: colors.greenAccent[400],
            borderRadius: "4px",
            color: colors.primary[900],
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <AddToPhotosOutlined />
          Choose Images
        </InputLabel>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={handleUpload}
        >
          UPLOAD
        </Button>
        <FormControl fullWidth>
          <InputLabel>In Stock</InputLabel>
          <Select defaultValue="true" name="inStock" onChange={handleChange}>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="end" mt="0px">
          <Button type="submit" color="secondary" variant="contained">
            SAVE
          </Button>
        </Box>
      </Box>
      <ImageList
        sx={{ width: "auto", height: "auto" }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {product?.img.map((item) => (
          <ImageListItem key={item} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              sx={{ objectFit: "contain" }}
              src={item}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ToastContainer />
    </form>
  );
};

export default Product;
