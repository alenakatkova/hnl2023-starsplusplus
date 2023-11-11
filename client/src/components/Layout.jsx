import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Grid } from "@mui/material";

const Layout = () => {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid md={3} item sx={{ borderRight: "1px solid gray", p: 2 }}>
        <Header />
      </Grid>
      <Grid md={9} item sx={{ p: 2 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
