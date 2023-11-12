import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // Example icon for impact area
import AssessmentIcon from "@mui/icons-material/Assessment"; // Example icon for metrics
import ListAltIcon from "@mui/icons-material/ListAlt"; // Example icon for metric name
import StraightenIcon from "@mui/icons-material/Straighten"; // Example icon for measurement unit

function ImpactAreaDisplay({ impactArea }) {
  return (
    <Card sx={{ marginBottom: 2, borderRadius: 0, height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 2,
          }}
        >
          <BusinessCenterIcon color="primary" />
          <Typography variant="h6" component="div">
            Impact Area Name:
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ marginLeft: 4 }}>
          {impactArea.value}
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <AssessmentIcon color="primary" />
          <Typography variant="h6">Metrics:</Typography>
        </Box>
        {impactArea.metrics.map((metric) => (
          <Box key={metric.id} sx={{ marginLeft: 4, marginTop: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">Name:</Typography>
              <Typography variant="body2">{metric.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">Unit:</Typography>
              <Typography variant="body2">{metric.unit}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ImpactAreaDisplay;
