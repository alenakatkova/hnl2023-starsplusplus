import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImpactAreaComponent from "../components/ImpactAreaFieldset.jsx";

function AddCompany() {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    address: "",
    impactAreas: [],
  });

  const handleCompanyChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const addMetric = (areaIndex) => {
    const newImpactAreas = [...companyData.impactAreas];
    const newMetrics = [
      ...newImpactAreas[areaIndex].metrics,
      { id: Date.now().toString(), name: "", unit: "" },
    ];
    newImpactAreas[areaIndex].metrics = newMetrics;
    setCompanyData({ ...companyData, impactAreas: newImpactAreas });
  };

  const handleMetricChange = (areaIndex, metricIndex, e) => {
    const newImpactAreas = [...companyData.impactAreas];
    newImpactAreas[areaIndex].metrics[metricIndex][e.target.name] =
      e.target.value;
    setCompanyData({ ...companyData, impactAreas: newImpactAreas });
  };

  const handleImpactAreaChange = (index, e) => {
    const newImpactAreas = [...companyData.impactAreas];
    newImpactAreas[index].value = e.target.value;
    setCompanyData({
      ...companyData,
      impactAreas: newImpactAreas,
    });
  };

  const addImpactArea = () => {
    setCompanyData({
      ...companyData,
      impactAreas: [
        ...companyData.impactAreas,
        { id: Date.now().toString(), value: "", metrics: [] },
      ],
    });
  };

  const removeImpactArea = (index) => {
    const newImpactAreas = [...companyData.impactAreas];
    newImpactAreas.splice(index, 1);
    setCompanyData({ ...companyData, impactAreas: newImpactAreas });
  };

  const removeMetric = (areaIndex, metricIndex) => {
    const newImpactAreas = [...companyData.impactAreas];
    newImpactAreas[areaIndex].metrics.splice(metricIndex, 1);
    setCompanyData({ ...companyData, impactAreas: newImpactAreas });
  };

  const isFormValid = () => {
    if (!companyData.companyName.length) {
      return false;
    }

    if (companyData.impactAreas.length < 1) {
      return false;
    }

    for (let impactArea of companyData.impactAreas) {
      if (!impactArea.value) {
        return false;
      }
      if (impactArea.metrics.length < 1) {
        return false;
      }
      for (let metric of impactArea.metrics) {
        if (!metric.name || !metric.unit) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(companyData);
    fetch("http://localhost:8000/add-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    }).then((res) => console.log(res));
  };

  return (
    <Box
      component="form"
      sx={{ width: "520px", display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="companyName"
        label="Company Name"
        variant="outlined"
        value={companyData.companyName}
        onChange={handleCompanyChange}
        required={true}
      />
      <TextField
        name="address"
        label="Address"
        variant="outlined"
        value={companyData.address}
        onChange={handleCompanyChange}
      />
      {companyData.impactAreas.map((impactArea, areaIndex) => (
        <ImpactAreaComponent
          showAreaDeleteButton={companyData.impactAreas.length > 1}
          key={impactArea.id}
          impactArea={impactArea}
          onImpactAreaChange={(e) => handleImpactAreaChange(areaIndex, e)}
          onMetricChange={(metricIndex, e) =>
            handleMetricChange(areaIndex, metricIndex, e)
          }
          addMetric={() => addMetric(areaIndex)}
          removeImpactArea={() => removeImpactArea(areaIndex)}
          removeMetric={(metricIndex) => removeMetric(areaIndex, metricIndex)}
        />
      ))}
      <Button onClick={addImpactArea} startIcon={<AddCircleOutlineIcon />}>
        Add Impact Area
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormValid()}
      >
        Submit
      </Button>
    </Box>
  );
}

export default AddCompany;
