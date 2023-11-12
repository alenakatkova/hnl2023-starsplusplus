import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import { Grid } from "@mui/material";
import logo from "../assets/company_logo.png";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

function DashboardTopBar() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "white",
        boxShadow: "6px 8px 11px 0px #94949440",
        backgroundColor: "white",
        py: "9px",
      }}
    >
      <Toolbar sx={{ px: "50px !important" }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              marginRight: "20px",
            }}
          >
            <img src={logo} alt="Company logo" width="56px" />
          </Box>
          <Typography variant="companyName" component="h2" sx={{ margin: 0 }}>
            Better World
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink to="/dashboard/add-company">
            <IconButton sx={{ color: "#2089EF" }}>
              <EditIcon />
            </IconButton>
          </NavLink>
          <IconButton sx={{ color: "#2089EF" }}>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const Layout = () => {
  return (
    <Grid container sx={{ minHeight: "100vh", flexWrap: "nowrap" }}>
      <Grid md={3} item>
        <Header />
      </Grid>
      <Grid md={9} item sx={{ width: "100%", boxSizing: "border-box" }}>
        <DashboardTopBar />
        <Box sx={{ px: "50px", paddingBottom: "30px", paddingTop: "45px" }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
