import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Link } from "@mui/material";
import { CARD_STYLES } from "../style-constants.js";

const EVENT_LABEL_STYLES = { fontSize: "14px", fontWeight: 600 };
const EVENT_INFO_STYLES = { fontSize: "16px" };
function Events() {
  const [events, setEvents] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setEvents(data.data);
  }, [events]);

  return (
    <Box>
      <Typography variant="h1">Events</Typography>
      <Box sx={{ ...CARD_STYLES, padding: "30px" }}>
        <Typography variant="h2" sx={{ marginBottom: "25px" }}>
          Future Events
        </Typography>
        {events &&
          events.map((event) => {
            return (
              <Box
                key={event.name}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginBottom: "1rem",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#E0E4EA",
                    borderRadius: "17px",
                    paddingY: "15px",
                    paddingX: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    flexGrow: 1,
                  }}
                >
                  <Box>
                    <Typography sx={EVENT_LABEL_STYLES}>Name:</Typography>
                    <Typography sx={EVENT_INFO_STYLES}>{event.name}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={EVENT_LABEL_STYLES}>Dates:</Typography>
                    <Typography sx={EVENT_INFO_STYLES}>
                      {event.dates}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={EVENT_LABEL_STYLES}>Location:</Typography>
                    <Typography sx={EVENT_INFO_STYLES}>
                      {event.location}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={EVENT_LABEL_STYLES}>
                      Participants:
                    </Typography>
                    <Typography sx={EVENT_INFO_STYLES}>
                      {event.participants}
                    </Typography>
                  </Box>
                </Box>
                <Box
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
                  <Link href="/sample-form">Form for the event</Link>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default Events;
