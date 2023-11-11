import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    console.log(data);
    setEvents(data.data);
  }, [events]);
  return (
    <div>
      {events &&
        events.map((event) => {
          return <div key={event.name}>{JSON.stringify(event)}</div>;
        })}
    </div>
  );
}

export default Dashboard;
