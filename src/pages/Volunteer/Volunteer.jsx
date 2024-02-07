import { Button, Sheet, Stack, Table, Typography } from "@mui/joy";
import axios from "axios";
import Notiflix, { Loading, Report } from "notiflix";
import React, { useEffect, useState } from "react";
import usePaginator from "../Paginator";
import dayjs from "dayjs";
import { FaFileExcel } from "react-icons/fa";

function Volunteer() {
  const [attendees, setAttendees] = useState([]);
  const getInfo = async () => {
    Notiflix.Loading.standard("Getting Data");
    try {
      const { data } = await axios.get("/api/volunteer/all", {
        headers: {
          auth: "ligmabohls",
        },
      });
      if (!data.err) {
        setAttendees(data.volunteers);
      } else {
        Report.failure("Error", data.err);
      }
    } catch (error) {
      Report.failure(
        "Error",
        "Unable to connect with server, check internet connection and try again"
      );
    } finally {
      Loading.remove();
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  const av = ["Full Day", "Morning", "Afternoon", "Other"];
  const arears = [
    "Event Setup",
    "Information Desk",
    "Social Media Support",
    "Other (Please specify)",
  ];

  const [pagControl, data] = usePaginator({
    state: attendees,
    showLimiter: true,
    startingLimit: 50,
  });
  console.log(data);
  return (
    <Sheet style={{ width: "fit-content", padding: 10 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        style={{ maxWidth: "80vw" }}
      >
        <Typography fontWeight={"bold"}>Volunteer List</Typography>
        <Button startDecorator={<FaFileExcel />}>Export</Button>
      </Stack>
      <Table style={{ width: "max-content" }}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Specific Requirements</th>
            <th>Avaialablity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            return (
              <tr key={a._id}>
                <td>{attendees.indexOf(a) + 1}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{dayjs(a.date).format("DD MMMM YYYY hh:mmA")}</td>
                <td>{av[a.availability]}</td>
                <td style={{maxWidth:300}}>
                  {a.areas.map((t) => (
                    <span style={{ marginRight: 10 }} key={a}>
                      {t == 3 ? arears[t] : a.specific}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>{pagControl}</td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}

export default Volunteer;
