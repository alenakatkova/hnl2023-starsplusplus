import React from "react";
import { TextField, IconButton, Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

function ImpactAreaComponent({
  impactArea,
  onImpactAreaChange,
  onMetricChange,
  addMetric,
  removeImpactArea,
  removeMetric,
  showAreaDeleteButton,
}) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <TextField
          label="Impact Area"
          variant="outlined"
          value={impactArea.value}
          onChange={onImpactAreaChange}
          required
        />
        {showAreaDeleteButton && (
          <IconButton onClick={removeImpactArea}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      {impactArea.metrics.map((metric, metricIndex) => (
        <Box
          key={metric.id}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
        >
          <TextField
            name="name"
            label="Metric Name"
            variant="outlined"
            value={metric.name}
            required
            onChange={(e) => onMetricChange(metricIndex, e)}
          />
          <TextField
            name="unit"
            label="Measurement Unit"
            variant="outlined"
            value={metric.unit}
            required
            onChange={(e) => onMetricChange(metricIndex, e)}
          />
          {impactArea.metrics.length > 1 && (
            <IconButton onClick={() => removeMetric(metricIndex)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      <Button onClick={addMetric} startIcon={<AddCircleOutlineIcon />}>
        Add Metric
      </Button>
    </Box>
  );
}

export default ImpactAreaComponent;
