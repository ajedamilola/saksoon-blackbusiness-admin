import { Button, Sheet, Stack, Table, Typography } from "@mui/joy";
import axios from "axios";
import Notiflix, { Loading, Report } from "notiflix";
import React, { useEffect, useState } from "react";
import usePaginator from "../Paginator";
import dayjs from "dayjs";
import { FaFileExcel } from "react-icons/fa";

function Exhibit() {
  const [attendees, setAttendees] = useState([]);
  const getInfo = async () => {
    Notiflix.Loading.standard("Getting Data");
    try {
      const { data } = await axios.get("/api/exhibitor/all", {
        headers: {
          auth: "ligmabohls",
        },
      });
      if (!data.err) {
        setAttendees(data.exhibitors);
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
  const methods = ["", "Social", "Word Of Mouth", "Other"];
  const sizes = ["Small", "Medium", "Large"];

  const [pagControl, data] = usePaginator({
    state: attendees,
    showLimiter: true,
    startingLimit: 50,
  });
  console.log(data);
  return (
    <Sheet style={{ width: "fit-content" }}>
      <Stack p={2}
        direction={"row"}
        justifyContent={"space-between"}
        style={{ maxWidth: "80vw" }}
      >
        <Typography fontWeight={"bold"}>Exhibitors' List</Typography>
        <Button startDecorator={<FaFileExcel />}>Export</Button>
      </Stack>

      <Table style={{ width: "max-content" }}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Organisation</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Website</th>
            <th>Description</th>
            <th>boothSize</th>
            <th>additional</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            return (
              <tr key={a._id}>
                <td>{attendees.indexOf(a) + 1}</td>
                <td>{a.organization}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{dayjs(a.date).format("DD MMMM YYYY hh:mmA")}</td>
                <td>{a.url}</td>
                <td style={{ maxWidth: 300 }}>{a.description}</td>
                <td>{sizes[a.boothSize]}</td>
                <td style={{ maxWidth: 300 }}>{a.additional} Lorem</td>
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

export default Exhibit;
