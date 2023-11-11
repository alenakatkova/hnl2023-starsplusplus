import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
  const [goals, setGoals] = useState([]);
  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setSelectedMetric(""); // Reset metric selection when area changes
  };

  const determineStatus = (year) => {
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      return "Planned";
    } else if (year === currentYear) {
      return "In Progress";
    } else {
      return "Finished";
    }
  };

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGoal = {
      area: ngoDetails.impactAreas.find((area) => area.id === selectedArea)
        ?.value,
      metric: ngoDetails.impactAreas
        .find((area) => area.id === selectedArea)
        ?.metrics.find((metric) => metric.id === selectedMetric)?.name,
      year: reportingYear,
      target: targetValue,
      unit: ngoDetails.impactAreas
        .find((area) => area.id === selectedArea)
        ?.metrics.find((metric) => metric.id === selectedMetric)?.unit,
    };

    setGoals([...goals, newGoal]);
    console.log({ selectedArea, selectedMetric, reportingYear, targetValue });
    setSelectedArea("");
    setSelectedMetric("");
    setReportingYear("");
    setTargetValue("");
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiFormControl-root": { m: 1, minWidth: 200 } }}
      >
        <FormControl fullWidth>
          <InputLabel>Impact Area</InputLabel>
          <Select
            value={selectedArea}
            label="Impact Area"
            onChange={handleAreaChange}
          >
            {ngoDetails.impactAreas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Impact Metric</InputLabel>
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

        <TextField
          label="Reporting Year"
          type="number"
          value={reportingYear}
          onChange={(e) => setReportingYear(e.target.value)}
          fullWidth
        />

        <TextField
          label="Target Value"
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Set Goal
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Impact Area</TableCell>
              <TableCell>Impact Metric</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reporting Year</TableCell>
              <TableCell>Target Value</TableCell>
              <TableCell>Status</TableCell> {/* New Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal, index) => (
              <TableRow key={index}>
                <TableCell>{goal.area}</TableCell>
                <TableCell>{goal.metric}</TableCell>
                <TableCell>{goal.unit}</TableCell>
                <TableCell>{goal.year}</TableCell>
                <TableCell>{goal.target}</TableCell>
                <TableCell>
                  {determineStatus(parseInt(goal.year, 10))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SetGoals;
