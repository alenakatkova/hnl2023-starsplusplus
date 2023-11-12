import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Grid } from "@mui/material";

import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

function DashboardTopBar() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "white",
        boxShadow: "0px 2px 11px 0px #94949440",
        backgroundColor: "white",
        py: "9px",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {/*<SearchIcon sx={{ mr: 1 }} />*/}
          {/*<InputBase*/}
          {/*  placeholder="Search…"*/}
          {/*  inputProps={{ "aria-label": "search" }}*/}
          {/*  sx={{*/}
          {/*    flex: 1,*/}
          {/*    border: "1px solid lightgray",*/}
          {/*    borderRadius: "10px",*/}
          {/*    paddingX: "10px",*/}
          {/*    marginX: "10px",*/}
          {/*  }}*/}
          {/*/>*/}
          <Typography variant="companyName" component="h2" sx={{ margin: 0 }}>
            Global Humanitarian Aid
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            component="a"
            href="/account"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <AccountCircle sx={{ mr: 0.5 }} />
            Account
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const Layout = () => {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
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
