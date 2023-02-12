import { useTheme } from "@emotion/react";
import { AddToPhotosOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  //For handling inputs of title, price, oldPrice, desc.
  const [input, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //For handling category selection
  const [cat, setCat] = useState([]);
  const handleCatCheck = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCat([...cat, value]);
    } else {
      setCat(cat.filter((e) => e !== value));
    }
  };

  //For handling color selection
  const [color, setColor] = useState([]);
  const handleColorCheck = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setColor([...color, value]);
    } else {
      setColor(color.filter((e) => e !== value));
    }
  };

  //For handling size selection
  const [size, setSize] = useState([]);
  const handleSizeCheck = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSize([...size, value]);
    } else {
      setSize(size.filter((e) => e !== value));
    }
  };
  console.log(size);

  //For selecting files i.e images
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setFiles((prev) => [...prev, newFile]);
    }
  };

  //Upload to firebase and set image urls in img array
  const [urls, seturls] = useState([]);
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

  //Add product to db
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
    //Add product Function in apiCalls
    addProducts(product, dispatch);
    toast.success("Product Added Successfully!");
  };

  //Fetch Categories and render in Category selection
  const [catValue, setCatValue] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCatValue(res.data);
    };
    getCats();
  }, []);

  const navigate = useNavigate();

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
        {/* //Select Categories */}
        <Box
          sx={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            maxHeight: "200px",
            overflowY: "auto",
            bgcolor: "rgba(0,0,0, 0.1)",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#777",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Select Categories{" "}
            <Button
              onClick={() => navigate("/categories")}
              sx={{
                bgcolor: colors.greenAccent[300],
                color: colors.greenAccent[900],
                "&:hover": { bgcolor: colors.greenAccent[500] },
              }}
              variant="contained"
            >
              Add Category
            </Button>
          </Typography>
          <br />
          {catValue.map((cat) => (
            <FormControlLabel
              key={cat._id}
              control={
                <Checkbox
                  onChange={handleCatCheck}
                  value={cat.cat}
                  sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
                />
              }
              label={cat.cat}
              sx={{ textTransform: "capitalize" }}
            />
          ))}
        </Box>
        {/* //Select colors */}
        <Box
          sx={{
            gridColumn: "span 1",
            display: "flex",
            flexDirection: "column",
            maxHeight: "200px",
            overflowY: "auto",
            bgcolor: "rgba(0,0,0, 0.1)",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <Typography variant="h5" sx={{ color: "#777" }}>
            Select Color
          </Typography>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleColorCheck}
                value="red"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Red"
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleColorCheck}
                value="blue"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Blue"
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleColorCheck}
                value="yellow"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="yellow"
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleColorCheck}
                value="green"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Green"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
        {/* //Select Size */}
        <Box
          sx={{
            gridColumn: "span 1",
            display: "flex",
            flexDirection: "column",
            maxHeight: "200px",
            overflowY: "auto",
            bgcolor: "rgba(0,0,0, 0.1)",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <Typography variant="h5" sx={{ color: "#777" }}>
            Select Size
          </Typography>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleSizeCheck}
                value="small"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Small"
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleSizeCheck}
                value="medium"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Medium"
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleSizeCheck}
                value="large"
                sx={{ "&.Mui-checked": { color: colors.blueAccent[200] } }}
              />
            }
            label="Large"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
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
          sx={{
            backgroundColor: colors.greenAccent[400],
            borderRadius: "4px",
            color: colors.primary[900],
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            minWidth: "100px",
            "&:hover": { bgcolor: colors.greenAccent[600] },
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
