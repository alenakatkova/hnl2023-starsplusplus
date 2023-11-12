import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { CARD_STYLES } from "../style-constants.js";
import {
  ArrowUpwardOutlined,
  FileDownload,
  ShareSharp,
} from "@mui/icons-material";

const demoFiles = [
  { name: "Document_09.csv", uploaded: "14.04.2023", src: "templateDataTable" },
  { name: "Document_10.csv", uploaded: "17.04.2023", src: "templateDataTable" },
];
const EVENT_LABEL_STYLES = { fontSize: "14px", fontWeight: 600 };
const EVENT_INFO_STYLES = { fontSize: "16px" };
function Dashboard() {
  const [events, setEvents] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setEvents(data.data);
  }, [events]);

  const [pieChart, setPieChart] = useState(<svg />);
  useEffect(() => {
    fetch("http://localhost:8000/get_piechart/?name=test")
      .then((res) => {
        return res.text();
      })
      .then((res) => setPieChart(res))
      .then(() => console.log(pieChart));
  }, []);

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `template_data_table.csv`;
    link.href = "../assets/template_data_table.csv";
    link.click();
  };
  return (
    <Box>
      <Typography variant="h1">Dashboard</Typography>
      <Box sx={{ ...CARD_STYLES, padding: "30px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Typography variant="h2">Events</Typography>
          <Button
            sx={{
              color: "#2089EF",
              padding: 0,
              margin: 0,
              backgroundColor: "transparent",
              minWidth: "unset",
            }}
          >
            <ShareSharp sx={{ marginRight: "10px" }} />
            Share
          </Button>
        </Box>

        {events &&
          events.map((event) => {
            return (
              <Box
                key={event.name}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "17px",
                  paddingY: "15px",
                  paddingX: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Box>
                  <Typography sx={EVENT_LABEL_STYLES}>Name:</Typography>
                  <Typography sx={EVENT_INFO_STYLES}>{event.name}</Typography>
                </Box>
                <Box>
                  <Typography sx={EVENT_LABEL_STYLES}>Dates:</Typography>
                  <Typography sx={EVENT_INFO_STYLES}>{event.dates}</Typography>
                </Box>
                <Box>
                  <Typography sx={EVENT_LABEL_STYLES}>Location:</Typography>
                  <Typography sx={EVENT_INFO_STYLES}>
                    {event.location}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={EVENT_LABEL_STYLES}>Participants:</Typography>
                  <Typography sx={EVENT_INFO_STYLES}>
                    {event.participants}
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          rowWrap: "nowrap",
        }}
        gap={2}
      >
        <Box
          sx={{
            ...CARD_STYLES,
            padding: "35px",
            height: "100px",
            width: "30%",
          }}
        ></Box>
        <Box
          sx={{
            ...CARD_STYLES,
            padding: "35px",
            width: "30%",
          }}
        >
          <object
            width="100%"
            type="image/svg+xml"
            data={`data:image/svg+xml;utf8,${encodeURIComponent(pieChart)}`}
          ></object>
        </Box>
        <Box
          sx={{
            ...CARD_STYLES,
            padding: "35px",
            width: "30%",
          }}
        >
          <Typography variant="h2" sx={{ marginBottom: "10px" }}>
            Documents
          </Typography>
          {demoFiles.map((document) => {
            return (
              <Box
                sx={{
                  borderRadius: "17px",
                  py: "10px",
                  paddingLeft: "15px",
                  paddingRight: "5px",
                  width: "100%",
                  backgroundColor: "#2089EF",
                  color: "white",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>{document.name}</Typography>
                  <Typography>
                    <ArrowUpwardOutlined
                      sx={{ color: "white", marginRight: "5px" }}
                    />
                    {document.uploaded}
                  </Typography>
                </Box>
                <IconButton onClick={onDownload}>
                  <FileDownload sx={{ color: "white" }} />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
