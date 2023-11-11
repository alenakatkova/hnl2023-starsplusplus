// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
//
// function Goals() {
//   const [goals, setGoals] = useState([]);
//   const data = useLoaderData();
//
//   useEffect(() => {
//     setGoals(data.data);
//   }, [data]);
//   const determineStatus = (year) => {
//     const currentYear = new Date().getFullYear();
//     if (year > currentYear) {
//       return "Planned";
//     } else if (year === currentYear) {
//       return "In Progress";
//     } else {
//       return "Finished";
//     }
//   };
//
//   return (
//     <TableContainer
//       component={Paper}
//       sx={{ border: "1px solid red", width: "100%" }}
//     >
//       <Table sx={{ width: "100%" }}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Impact Area</TableCell>
//             <TableCell>Impact Metric</TableCell>
//             <TableCell>Unit</TableCell>
//             <TableCell>Reporting Year</TableCell>
//             <TableCell>Target Value</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {goals.map((goal, index) => (
//             <TableRow key={index}>
//               <TableCell>{goal.area}</TableCell>
//               <TableCell>{goal.metric}</TableCell>
//               <TableCell>{goal.unit}</TableCell>
//               <TableCell>{goal.year}</TableCell>
//               <TableCell>{goal.target}</TableCell>
//               <TableCell>{determineStatus(parseInt(goal.year, 10))}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
//
// export default Goals;

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
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

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
    <Box sx={{ width: "100%", border: "1px solid red" }}>
      <Typography component="h1" sx={{ mb: 2 }}>
        Goals
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Impact Area</TableCell>
              <TableCell>Impact Metric</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reporting Year</TableCell>
              <TableCell>Current Value</TableCell> {/* New Column */}
              <TableCell>Target Value</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal, index) => (
              <TableRow key={index}>
                <TableCell>{goal.area}</TableCell>
                <TableCell>{goal.metric}</TableCell>
                <TableCell>{goal.unit}</TableCell>
                <TableCell>{goal.year}</TableCell>
                <TableCell>
                  {goal.currentValue}
                  <Button onClick={() => handleEdit(index)}>
                    <EditIcon /> {/* Edit button with icon */}
                  </Button>
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
