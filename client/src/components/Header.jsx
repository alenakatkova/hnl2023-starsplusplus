import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "0.5rem",
      }}
    >
      <Typography component="h1">Todos</Typography>
    </Box>
  );
};

export default Header;
