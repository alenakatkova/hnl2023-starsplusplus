import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";

const getMetricsWithArea = (ngo) => {
  return ngo.impactAreas.flatMap((impactArea) =>
    impactArea.metrics.map((metric) => ({
      id: metric.id,
      name: metric.name,
      area: impactArea.value,
      unit: metric.unit,
    })),
  );
};

function AddEvent() {
  const data = useLoaderData();
  const [eventName, setEventName] = useState("");
  const [eventDates, setEventDates] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    setMetrics(getMetricsWithArea(data.data));
  }, [data]);

  const handleMetricChange = (event) => {
    setSelectedMetrics(event.target.value);
  };

  const handleDeleteMetric = (metricToDelete) => {
    setSelectedMetrics((metrics) =>
      metrics.filter((metric) => metric !== metricToDelete),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic here
    console.log({ eventName, eventDates, location, selectedMetrics });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", "& .MuiTextField-root": { m: 1 } }}
    >
      <TextField
        label="Event Name"
        fullWidth
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <TextField
        label="Event Dates"
        fullWidth
        value={eventDates}
        onChange={(e) => setEventDates(e.target.value)}
      />

      <TextField
        label="Location"
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel>Impact Metrics</InputLabel>
        <Select
          multiple
          value={selectedMetrics}
          onChange={handleMetricChange}
          input={<OutlinedInput label="Impact Metrics" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDeleteMetric(value)}
                />
              ))}
            </Box>
          )}
        >
          {metrics.map((metric) => (
            <MenuItem key={metric.id} value={metric.name}>
              {metric.name} ({metric.area})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button type="submit">Add Event</button>
    </Box>
  );
}

export default AddEvent;
