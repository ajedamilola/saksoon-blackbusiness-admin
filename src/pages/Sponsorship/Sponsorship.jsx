import { Button, Sheet, Stack, Table, Typography } from "@mui/joy";
import axios from "axios";
import Notiflix, { Loading, Report } from "notiflix";
import React, { useEffect, useState } from "react";
import usePaginator from "../Paginator";
import dayjs from "dayjs";
import { FaFileExcel } from "react-icons/fa";

function Sponsorship() {
  const [attendees, setAttendees] = useState([]);
  const getInfo = async () => {
    Notiflix.Loading.standard("Getting Data");
    try {
      const { data } = await axios.get("/api/attendee/all", {
        headers: {
          auth: "ligmabohls",
        },
      });
      if (!data.err) {
        setAttendees(data.attendees);
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
  const methods = ["Social", "Word Of Mouth", "Other"];
  const rType = ["General", "Student"];

  const [pagControl, data] = usePaginator({
    state: attendees,
    showLimiter: true,
    startingLimit: 50,
  });
  console.log(data);
  return (
    <Sheet style={{ width: "fit-content", padding:10 }}>
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
            <th>Organisation</th>
            <th>Date</th>
            <th>Hearing Method</th>
            <th>Registration Type</th>
            <th>Notes</th>
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
                <td>{a.organization}</td>
                <td>{dayjs(a.date).format("DD MMMM YYYY hh:mmA")}</td>
                <td>{methods[a.hearingMethod]}</td>
                <td>{rType[a.regType]}</td>
                <td style={{ maxWidth: 300 }}>{a.notes}</td>
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

export default Sponsorship;
