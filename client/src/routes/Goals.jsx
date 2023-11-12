import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { CARD_STYLES } from "../style-constants.js";

const TABLE_HEAD_STYLES = {
  textTransform: "uppercase",
  fontWeight: 600,
  color: "gray",
  textAlign: "center",
};
function Goals() {
  const [goals, setGoals] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setGoals(
      data.data.map((goal) => ({
        ...goal,
        currentValue: goal.currentValue || 0,
      })),
    );
  }, [data]);

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

  const handleEdit = (index) => {
    const newCurrentValue = prompt("Enter the new current value:");
    if (newCurrentValue !== null && !isNaN(newCurrentValue)) {
      const updatedGoals = goals.map((goal, idx) =>
        idx === index
          ? { ...goal, currentValue: Number(newCurrentValue) }
          : goal,
      );
      setGoals(updatedGoals);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h1">Goals</Typography>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead sx={{ ...CARD_STYLES }}>
            <TableRow>
              <TableCell sx={TABLE_HEAD_STYLES}>Impact Area</TableCell>
              <TableCell sx={TABLE_HEAD_STYLES}>Impact Metric</TableCell>
              <TableCell sx={TABLE_HEAD_STYLES}>Unit</TableCell>
              <TableCell sx={TABLE_HEAD_STYLES}>Reporting Year</TableCell>
              <TableCell sx={TABLE_HEAD_STYLES}>Current Value</TableCell>{" "}
              <TableCell sx={TABLE_HEAD_STYLES}>Target Value</TableCell>
              <TableCell sx={TABLE_HEAD_STYLES}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal, index) => (
              <TableRow key={index}>
                <TableCell>{goal.area}</TableCell>
                <TableCell>{goal.metric}</TableCell>
                <TableCell>{goal.unit}</TableCell>
                <TableCell>{goal.year}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ lineHeight: "24px" }}>
                    {goal.currentValue}
                  </Typography>
                  <IconButton
                    aria-label="edit current value"
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
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

export default Goals;
