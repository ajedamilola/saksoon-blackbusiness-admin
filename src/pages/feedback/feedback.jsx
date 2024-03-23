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
  
  function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const getInfo = async () => {
      Notiflix.Loading.standard("Getting Data");
      try {
        const { data } = await axios.get("/api/feedback/all", {
          headers: {
            auth: "ligmabohls",
          },
        });
        if (!data.err) {
          setFeedback(data.feedbacks.slice().reverse());
        } else {
          Report.failure("Error", data.err);
        }
      } catch (error) {
        console.log(error)
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
    const satisfactions = ["Extremely Satisfied","Satisfied","Neutral","Disatisfied","Extremely Disatisfied"]
    const impressions = ["Very Impressive","Neutral","Disappointing","Very Disappointing"]
    const network = ["Yes, plenty","Yes, but it could be improved"," No, not enough"]
    const sessions = ["Excellent","Good","Fair","Poor","Did not attend any"]
  
    const [pagControl, data] = usePaginator({
      state: feedback,
      showLimiter: true,
      startingLimit: 50,
    });
    console.log(data);
    return (
      <Card
        style={{ width: "fit-content", padding: 10 }}
        sx={{ boxShadow: "lg" }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ maxWidth: "80vw" }}
        >
          <Typography fontWeight={"bold"}>Feedback' List</Typography>
          <Button
            startDecorator={<FaFileExcel />}
            onClick={() =>
              arrayToExcel(
                feedback,
                `feedback-${new Date().toDateString()}.xlsx`
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
              <th>Satisfaction</th>
              <th>Venue</th>
              <th>Exhibitor</th>
              <th>Networkings</th>
              <th>Sessions</th>
              <th>Additional Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((f) => {
              const a = f.data;
              return (
                <tr key={f._id} id={"s" + f._id}>
                  <td>{data.indexOf(a) + 1}</td>
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
                  <td>{satisfactions[a.satisfaction]}</td>
                  <td>{a.venueRating}</td>
                  <td>{impressions[a.exhibitors]}</td>
                  <td>{network[a.networking]}</td>
                  <td>{sessions[a.sessions]}</td>
                  <td>{a.additionalComments}</td>
                  <td>{methods[a.hearingMethod]}</td>
                  <td style={{ maxWidth: 300 }}>{a.additionalcomments}</td>
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
                            Block.standard("#s" + f._id);
                            try {
                              await axios.delete(`/api/feedback/${f._id}`);
                              setFeedback(
                                feedback.filter((d) => d._id != f._id)
                              );
                            } catch (error) {
                              console.log(error);
                              Report.failure(
                                "Error",
                                "Unable to delete record. check internet connection and try again"
                              );
                            } finally {
                              Block.remove("#s" + f._id);
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
  
  export default Feedback;
  