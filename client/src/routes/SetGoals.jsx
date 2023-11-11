import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { FORM_STYLES } from "../style-constants.js";

const ngoDetails = {
  companyName: "Global Humanitarian Aid",
  address: "456 Peace Road, Geneva, Switzerland",
  impactAreas: [
    {
      id: 1,
      value: "Healthcare Assistance",
      metrics: [{ id: 101, name: "Number of Clinics Set Up", unit: "clinics" }],
    },
    {
      id: 2,
      value: "Education for Children",
      metrics: [
        { id: 201, name: "Schools Built", unit: "schools" },
        { id: 202, name: "Children Enrolled", unit: "students" },
        { id: 203, name: "Grant Allocated", unit: "grants" },
      ],
    },
    {
      id: 3,
      value: "Emergency Relief",
      metrics: [
        { id: 301, name: "Relief Packages Distributed", unit: "packages" },
        { id: 302, name: "Families Assisted", unit: "families" },
      ],
    },
  ],
};

function SetGoals() {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");
  const [reportingYear, setReportingYear] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setSelectedMetric(""); // Reset metric selection when area changes
  };

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ selectedArea, selectedMetric, reportingYear, targetValue });
    setSelectedArea("");
    setSelectedMetric("");
    setReportingYear("");
    setTargetValue("");
  };

  return (
    <Box>
      <Typography variant="h1">Set Goal</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          ...FORM_STYLES,
          width: "50%",
          "& .MuiFormControl-root": { m: 1 },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontSize: "18px",
                  fontWeight: 400,
                  marginBottom: "15px",
                }}
              >
                Impact Area
              </Typography>
              <Select value={selectedArea} onChange={handleAreaChange}>
                {ngoDetails.impactAreas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontSize: "18px",
                  fontWeight: 400,
                  marginBottom: "15px",
                }}
              >
                Impact Metric
              </Typography>
              <Select
                value={selectedMetric}
                label="Impact Metric"
                onChange={handleMetricChange}
                disabled={!selectedArea}
              >
                {selectedArea &&
                  ngoDetails.impactAreas
                    .find((area) => area.id === selectedArea)
                    ?.metrics.map((metric) => (
                      <MenuItem key={metric.id} value={metric.id}>
                        {metric.name} in {metric.unit}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="label"
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                marginBottom: "15px",
              }}
            >
              Reporting Year
            </Typography>
            <TextField
              type="number"
              value={reportingYear}
              onChange={(e) => setReportingYear(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="label"
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                marginBottom: "15px",
              }}
            >
              Target Value
            </Typography>
            <TextField
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              fullWidth
            />
          </Grid>
          <Box sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ display: "block", margin: "0 auto", mt: 2 }}
            >
              Set Goal
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default SetGoals;
