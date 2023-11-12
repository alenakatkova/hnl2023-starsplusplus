import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Box, Typography } from "@mui/material";
import { CARD_STYLES } from "../style-constants.js";

const EVENT_LABEL_STYLES = { fontSize: "14px", fontWeight: 600 };
const EVENT_INFO_STYLES = { fontSize: "16px" };
function Dashboard() {
  const [events, setEvents] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setEvents(data.data);
  }, [events]);

  return (
    <Box>
      <Typography variant="h1">Dashboard</Typography>
      <Box sx={{ ...CARD_STYLES, padding: "30px" }}>
        <Typography variant="h2" sx={{ marginBottom: "25px" }}>
          Events
        </Typography>
        {events &&
          events.map((event) => {
            return (
              <Box
                key={event.name}
                sx={{
                  backgroundColor: "#E0E4EA",
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
            height: "100px",
            width: "30%",
          }}
        ></Box>
        <Box
          sx={{
            ...CARD_STYLES,
            padding: "35px",
            height: "100px",
            width: "30%",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
