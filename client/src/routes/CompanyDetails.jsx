import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ImpactAreaDisplay from "../components/ImpactAreaDisplay.jsx";

const ngoDetails = {
  companyName: "Global Humanitarian Aid",
  address: "456 Peace Road, Geneva, Switzerland",
  impactAreas: [
    {
      id: 1,
      value: "Healthcare Assistance",
      metrics: [
        { id: 101, name: "Number of Clinics Set Up", unit: "clinics" },
        { id: 102, name: "Grant Allocated", unit: "grants" },
      ],
    },
    {
      id: 2,
      value: "Education for Children",
      metrics: [
        { id: 201, name: "Schools Built", unit: "schools" },
        { id: 202, name: "Children Enrolled", unit: "students" },
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

function CompanyDetails() {
  const [companyData, setCompanyData] = useState(ngoDetails);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1">Company Details</Typography>

      <Typography sx={{ my: 2 }} variant="h2">
        Address
      </Typography>
      <Typography sx={{ my: 2 }}>{companyData.address}</Typography>

      <Typography sx={{ my: 2 }} variant="h2">
        Impact Areas
      </Typography>
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {companyData.impactAreas.map((impactArea) => (
          <Grid key={impactArea.id} xs={12} md={6} item>
            <ImpactAreaDisplay impactArea={impactArea} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CompanyDetails;
