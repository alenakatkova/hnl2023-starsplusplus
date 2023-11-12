import React from "react";
import {
  TextField,
  IconButton,
  Box,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
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
          <TextField
            variant="outlined"
            value={impactArea.value}
            onChange={onImpactAreaChange}
            required
          />
        </FormControl>
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
          <FormControl fullWidth>
            <Typography
              component="label"
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                marginBottom: "15px",
              }}
            >
              Metric Name
            </Typography>
            <TextField
              name="name"
              variant="outlined"
              value={metric.name}
              required
              onChange={(e) => onMetricChange(metricIndex, e)}
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
              Measurement Unit
            </Typography>
            <TextField
              name="unit"
              variant="outlined"
              value={metric.unit}
              required
              onChange={(e) => onMetricChange(metricIndex, e)}
            />
          </FormControl>
          {impactArea.metrics.length > 1 && (
            <IconButton onClick={() => removeMetric(metricIndex)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      <Button
        onClick={addMetric}
        startIcon={<AddCircleOutlineIcon />}
        sx={{ backgroundColor: "white", color: "gray" }}
      >
        Add Metric
      </Button>
    </Box>
  );
}

export default ImpactAreaComponent;
