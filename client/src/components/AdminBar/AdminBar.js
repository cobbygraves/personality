import React, { useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function AdminBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const newHandler = () => {
    setAnchorEl(null);
    navigate("/admin/addnew", { replace: true });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    navigate("/");
    localStorage.clear("userDetails");
    ctx.setUserAuth(false);
  };

  const dashboardHandler = () => {
    setAnchorEl(null);
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <Toolbar sx={{ bgcolor: "primary.main", width: "75vw", marginTop: 2 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <AccountCircle />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flex: 1 }}>
        Admin
      </Typography>

      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ marginLeft: 3, marginTop: 1 }}
        >
          <MenuItem onClick={dashboardHandler}>Dashboard</MenuItem>
          <MenuItem onClick={newHandler}>Add New</MenuItem>
          <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
}
