import {
  Button,
  Card,
  IconButton,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import axios from "axios";
import Notiflix, { Block, Confirm, Loading, Report } from "notiflix";
import React, { useEffect, useState } from "react";
import usePaginator from "../Paginator";
import dayjs from "dayjs";
import { FaFileExcel } from "react-icons/fa";
import arrayToExcel from "../../export";
import { MdDelete, MdEmail } from "react-icons/md";

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
        setAttendees(data.volunteers.slice().reverse());
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
  const arears = ["Event Setup", "Information Desk", "Social Media Support", "Greeters"];

  const [pagControl, data] = usePaginator({
    state: attendees,
    showLimiter: true,
    startingLimit: 50,
  });
  return (
    <Card
      style={{ width: "fit-content", padding: 10 }}
      sx={{ boxShadow: "lg" }}
    >
      {" "}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        style={{ maxWidth: "80vw" }}
      >
        <Typography fontWeight={"bold"}>Volunteer List</Typography>
        <Button
          startDecorator={<FaFileExcel />}
          onClick={() =>
            arrayToExcel(
              attendees,
              `volunteers-${new Date().toISOString()}.xlsx`
            )
          }
        >
          Export
        </Button>
      </Stack>
      <Table style={{ width: "max-content" }} stripe="even" hoverRow>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Availability</th>
            <th>Areas Of Interest</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            return (
              <tr key={a._id} id={"s" + a._id}>
                <td>{attendees.indexOf(a) + 1}</td>
                <td>{a.name}</td>
                <td>
                  {a.email}{" "}
                  <IconButton
                    onClick={() => window.open(`mailto:${a.email}`)}
                    size="sm"
                    sx={{ ml: 1 }}
                  >
                    <MdEmail />
                  </IconButton>
                </td>
                <td>{a.phone}</td>
                <td>{dayjs(a.date).format("DD MMMM YYYY hh:mmA")}</td>
                <td style={{ maxWidth: 500 }}>{a.reason}</td>
                <td>{av[a.availability]}</td>

                <td>
                  {a.areas.map((a) => arears[a]) + " "}
                  {a.specific}
                </td>
                <td>
                  <IconButton
                    color="danger"
                    onClick={async () => {
                      Confirm.show(
                        "Confirm Action",
                        "Are you sure you want to delete this item?",
                        "Delete",
                        "Cancel",
                        async () => {
                          Block.standard("#s" + a._id);
                          try {
                            await axios.delete(`/api/volunteer/${a._id}`);
                            setAttendees(
                              attendees.filter((d) => d._id != a._id)
                            );
                          } catch (error) {
                            console.log(error);
                            Report.failure(
                              "Error",
                              "Unable to delete record. check internet connection and try again"
                            );
                          } finally {
                            Block.remove("#s" + a._id);
                          }
                        },
                        () => { },
                        { okButtonBackground: "red" }
                      );
                    }}
                  >
                    <MdDelete />
                  </IconButton>
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
    </Card>
  );
}

export default Volunteer;
