import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (passwordError) setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ width: "320px", display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {passwordError && (
        <Typography color="error" variant="body2">
          {passwordError}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUp;
