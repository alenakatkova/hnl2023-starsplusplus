import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const AAD_NAV_LINK_STYLES = {
  display: "inline-block",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "20px",
  color: "#000000",
  marginBottom: "10px",
};

const NAV_LINK_STYLES = {
  display: "inline-block",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "20px",
  color: "#000000",
  marginBottom: "10px",
};

const PLUS_STYLES = {
  display: "inline-block",
  marginRight: "10px",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  color: "#000000",
};

const Header = () => {
  return (
    <Box
      sx={{
        padding: "70px 40px",
        backgroundColor: "#F8F8FB",
        height: "100vh",
      }}
    >
      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem",
          gap: 2,
        }}
      >
        <Box
          sx={{
            boxSizing: "border-box",
            width: "100%",
            padding: "20px",
            backgroundColor: "gray",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          LOGO
        </Box>
        <NavLink to="/dashboard/add-company">
          <Typography component="span" sx={PLUS_STYLES}>
            +
          </Typography>
          <Typography component="span" sx={AAD_NAV_LINK_STYLES}>
            Add Company
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/set-goals">
          <Typography component="span" sx={PLUS_STYLES}>
            +
          </Typography>
          <Typography component="span" sx={AAD_NAV_LINK_STYLES}>
            Set Goals
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/add-event">
          <Typography component="span" component="span" sx={PLUS_STYLES}>
            +
          </Typography>
          <Typography component="span" sx={AAD_NAV_LINK_STYLES}>
            Add Event
          </Typography>
        </NavLink>
        <NavLink to="/dashboard">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Dashboard
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/company-details">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Company Details
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/goals">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Goals
          </Typography>
        </NavLink>

        <NavLink to="/dashboard/events">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Events
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
};

export default Header;
