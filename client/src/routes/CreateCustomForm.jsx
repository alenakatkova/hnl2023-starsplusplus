import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CARD_STYLES } from "../style-constants.js";

function CreateCustomForm({ onSubmitForm }) {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [events, setEvents] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setEvents(data.data);
  }, [events]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const addFormField = () => {
    setFormFields([
      ...formFields,
      { id: Date.now(), type: "text", label: "", options: [] },
    ]);
  };

  const handleFieldTypeChange = (index, type) => {
    const updatedFields = [...formFields];
    updatedFields[index].type = type;
    setFormFields(updatedFields);
  };

  const handleFieldLabelChange = (index, label) => {
    const updatedFields = [...formFields];
    updatedFields[index].label = label;
    setFormFields(updatedFields);
  };

  const handleAddOption = (index) => {
    const updatedFields = [...formFields];
    updatedFields[index].options.push({ id: Date.now(), value: "" });
    setFormFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options[optionIndex].value = value;
    setFormFields(updatedFields);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    navigate("/sample-form");
    console.log(formFields);
  };

  return (
    <Box>
      <Typography variant="h1">Create Custom Form</Typography>
      <Box
        component="form"
        sx={{
          ...CARD_STYLES,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "70%",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Event</InputLabel>
          <Select
            value={selectedEvent}
            label="Select Event"
            onChange={handleEventChange}
          >
            {events.map((event) => (
              <MenuItem key={event.id} value={event.id}>
                {event.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {formFields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel>Field Type</InputLabel>
              <Select
                value={field.type}
                label="Field Type"
                onChange={(e) => handleFieldTypeChange(index, e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="textarea">Textarea</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label={`Field Label (${index + 1})`}
              value={field.label}
              onChange={(e) => handleFieldLabelChange(index, e.target.value)}
            />
            {field.type === "checkbox" && (
              <Box sx={{ mt: 2 }}>
                {field.options.map((option, optIndex) => (
                  <Box
                    key={option.id}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      label={`Option ${optIndex + 1}`}
                      value={option.value}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                    />
                    <IconButton
                      onClick={() => handleRemoveOption(index, optIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  onClick={() => handleAddOption(index)}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add Option
                </Button>
              </Box>
            )}
          </Box>
        ))}

        <Button onClick={addFormField}>Add Field</Button>
        <Button onClick={handleSubmit}>Create and Share Form</Button>
      </Box>
    </Box>
  );
}

export default CreateCustomForm;
