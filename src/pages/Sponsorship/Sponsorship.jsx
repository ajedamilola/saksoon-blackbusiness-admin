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

function Sponsorship() {
  const [attendees, setAttendees] = useState([]);
  const getInfo = async () => {
    Notiflix.Loading.standard("Getting Data");
    try {
      const { data } = await axios.get("/api/sponsorship/all", {
        headers: {
          auth: "ligmabohls",
        },
      });
      if (!data.err) {
        setAttendees(data.sponsorRequests.slice());
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
        <Typography fontWeight={"bold"}>Sponsorship Request</Typography>
        <Button
          startDecorator={<FaFileExcel />}
          onClick={() =>
            arrayToExcel(
              attendees,
              `sponsorship-requests-${new Date().toDateString()}.xlsx`
            )
          }
        >
          Export
        </Button>
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
            <th>Level</th>
            <th>Specific Requirments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            return (
              <tr key={a._id} id={"s" + a._id}>
                <td>{attendees.indexOf(a) + 1}</td>
                <td>{a.name}</td>
                <td>
                  {a.email}
                  <IconButton
                    onClick={() => window.open(`mailto:${a.email}`)}
                    size="sm"
                    sx={{ ml: 1 }}
                  >
                    <MdEmail />
                  </IconButton>
                </td>
                <td>{a.phone}</td>
                <td>{a.organization}</td>
                <td>{dayjs(a.date).format("DD MMMM YYYY hh:mmA")}</td>
                <td>{methods[a.level]}</td>
                <td style={{ maxWidth: 300 }}>{a.specific}</td>
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
                            await axios.delete(`/api/sponsorship/${a._id}`);
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
                        () => {},
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

export default Sponsorship;
