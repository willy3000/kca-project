import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import EventsTable from "./eventsTable";
import NoItems from "./noItems";

export default function Events() {

  const user = useSelector((state) => state.user.user);
  const [addEventOpen, setAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)


  const getEvents = () => {
    axios.get(`http://localhost:5000/api/projects/getStudentEvents/${user.id}`).then((res) => {
      setEvents(res.data.events)
      console.log(res.data.events)
    })
  }


  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>

    {!loading ? (
      events.length > 0 ?

      <Box sx={{maxWidth: '1800px', margin: 'auto'}}>
      <Box>
          <Box>
            <EventsTable {...{events}}/>
          </Box>
      </Box>
      </Box>

      :
      <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <NoItems></NoItems>
    </Box>
    ) : (
      <Box>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ padding: "50px", margin: "15px" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ padding: "50px", margin: "15px" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ padding: "50px", margin: "15px" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ padding: "50px", margin: "15px" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ padding: "50px", margin: "15px" }}
        />
      </Box>
    )}

  </>
  )
}
