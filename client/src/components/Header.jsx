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
      <NavLink to="/dashboard/company-details">Company Details</NavLink>
      <NavLink to="/dashboard/set-goals">Set Goals</NavLink>
    </Box>
  );
};

export default Header;