import { useTheme } from "@emotion/react";
import { AddToPhotosOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
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
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [input, setInputs] = useState({});
  const [urls, seturls] = useState([]);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [files, setFiles] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...input,
      color: color,
      categories: cat,
      size: size,
      img: urls,
    };
    console.log(product);
    addProducts(product, dispatch);
    toast.success("Product Added Successfully!");
    setInputs({});
  };

  return (
    <form style={{ margin: "20px" }} onSubmit={handleSubmit}>
      <Header title={`ADD PRODUCT`} subtitle="Create New Product" />
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
          sx={{ gridColumn: "span 2" }}
          required
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Price"
          name="price"
          sx={{ gridColumn: "span 1" }}
          required
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Old Price"
          name="oldPrice"
          sx={{ gridColumn: "span 1" }}
          required
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Description"
          name="desc"
          sx={{ gridColumn: "span 4" }}
          required
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Categories"
          placeholder="Seperate categories by comma ,"
          name="categories"
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          required
          onChange={handleCat}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Colors"
          placeholder="Seperate colors by comma ,"
          name="color"
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          required
          onChange={handleColor}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Size"
          placeholder="Seperate sizes by comma ,"
          name="size"
          sx={{ gridColumn: "span 4" }}
          inputProps={{ style: { textTransform: "lowercase" } }}
          required
          onChange={handleSize}
        />
        <input
          type="file"
          name="img"
          multiple
          id="img"
          style={{ display: "none" }}
          onChange={handleFileChange}
          required
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
        <Box
          display="flex"
          justifyContent="start"
          mt="0px"
          sx={{ gridColumn: "span 4" }}
        >
          <Button type="submit" color="secondary" variant="contained">
            ADd New Product
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </form>
  );
};

export default ProductForm;
