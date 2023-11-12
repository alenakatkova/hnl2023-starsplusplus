import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

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
        px: "40px",
        paddingTop: "35px",
        paddingBottom: "30px",
        backgroundColor: "#F8F8FB",
        minHeight: "100vh",
        height: "100%",
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
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="Company Logo" width="160px" />
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
            Company Details :: NOT STYLED YET
          </Typography>
        </NavLink>
        <NavLink to="/dashboard/goals">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Goals :: NOT STYLED YET
          </Typography>
        </NavLink>

        <NavLink to="/dashboard/events">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Events :: NOT WORKING YET
          </Typography>
        </NavLink>

        <NavLink to="/dashboard/create-custom-form">
          <Typography component="span" sx={NAV_LINK_STYLES}>
            Create custom from :: SHOULD MOVE TO EVENTS PAGE
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
};

export default Header;
