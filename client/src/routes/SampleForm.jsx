import React, { useEffect, useState } from "react";
import { Box, FormControl, TextField, Typography, Button } from "@mui/material";
import logo from "../assets/logo_big.png";

const sampleFormFields = [
  {
    id: 1699792921886,
    type: "number",
    label: "Age",
    options: [],
  },
  {
    id: 1699792930416,
    type: "textarea",
    label: "Feedback",
    options: [],
  },
  {
    id: 1699792937915,
    type: "text",
    label: "Where are you from?",
    options: [],
  },
];
function SampleForm() {
  const [formData, setFormData] = useState(
    sampleFormFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {}),
  );

  const handleFieldChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const renderFormField = (field) => {
    return (
      <FormControl fullWidth sx={{ my: 1, border: "none" }} key={field.id}>
        <Typography
          component="label"
          sx={{
            fontSize: "1em",
            fontWeight: 400,
            marginBottom: "10px",
          }}
        >
          {field.label}
        </Typography>
        <TextField
          fullWidth
          type={field.type === "textarea" ? "text" : field.type}
          value={formData[field.id]}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
          multiline={field.type === "textarea"}
          rows={field.type === "textarea" ? 4 : 1}
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "17px",
            border: "none",
          }}
        />
      </FormControl>
    );
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Box sx={{ width: "320px", margin: "0 auto" }}>
      <Box sx={{ width: "160px", margin: "0 auto", my: "50px" }}>
        <img src={logo} alt="Company logo" width="160px" />
      </Box>

      <Typography
        variant="h1"
        sx={{
          margin: "0 auto",
          display: "block",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Education Awareness Week
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {sampleFormFields.map(renderFormField)}

        <Button type="submit" sx={{ color: "white" }}>
          Submit Report
        </Button>
      </Box>
    </Box>
  );
}

export default SampleForm;
