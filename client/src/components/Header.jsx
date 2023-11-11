import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        // flexWrap: "wrap",
        padding: "0.5rem",
        gap: 2,
      }}
    >
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/dashboard/add-company">Add Company</NavLink>
    </Box>
  );
};

export default Header;
