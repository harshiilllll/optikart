import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FixedBottomNavigation = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        pb: 7,
        "@media screen and (min-width: 768px)": {
          display: "none",
        },
      }}
    >
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={1}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            bgcolor: "white",
            "& .Mui-selected": {
              "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                color: "var(--accent-color)",
              },
            },
          }}
        >
          <BottomNavigationAction onClick={()=> navigate("/")} icon={<HomeRoundedIcon />} />
          <BottomNavigationAction onClick={()=> navigate("/cart")} icon={<FavoriteIcon />} />
          <BottomNavigationAction onClick={()=> navigate("/cart")} icon={<ShoppingCartIcon />} />
          <BottomNavigationAction onClick={()=> navigate("/")} icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default FixedBottomNavigation;
