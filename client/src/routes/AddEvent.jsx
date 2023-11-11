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
  Typography,
  Button,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { CARD_STYLES } from "../style-constants.js";

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
    console.log({ eventName, eventDates, location, selectedMetrics });
  };

  return (
    <Box>
      <Typography variant="h1">Create Event</Typography>
      <Box
        component="form"
        sx={{
          ...CARD_STYLES,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "50%",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth>
          <Typography
            component="label"
            sx={{
              fontSize: "18px",
              fontWeight: 400,
              marginBottom: "15px",
            }}
          >
            Event Name
          </Typography>
          <TextField
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography
            component="label"
            sx={{
              fontSize: "18px",
              fontWeight: 400,
              marginBottom: "15px",
            }}
          >
            Event Dates
          </Typography>
          <TextField
            fullWidth
            value={eventDates}
            onChange={(e) => setEventDates(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography
            component="label"
            sx={{
              fontSize: "18px",
              fontWeight: 400,
              marginBottom: "15px",
            }}
          >
            Location
          </Typography>
          <TextField
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ my: 1 }}>
          <Typography
            component="label"
            sx={{
              fontSize: "18px",
              fontWeight: 400,
              marginBottom: "15px",
            }}
          >
            Impact Metrics
          </Typography>
          <Select
            sx={{ backgroundColor: "white" }}
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

        <Button type="submit" sx={{ color: "white" }}>
          Add Event
        </Button>
      </Box>
    </Box>
  );
}

export default AddEvent;
