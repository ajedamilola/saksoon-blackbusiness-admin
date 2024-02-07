import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";

function Protected() {
  const [sideOpen, setSideOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <Drawer
      disableEnforceFocus
        open={sideOpen}
        slotProps={{
          backdrop: {
            sx: {
              display: "none",
            },
          },
          root: {
            sx: {
              maxWidth: 200,
            },
          },
          content: {
            sx: {
              maxWidth: 200,
            },
          },
        }}
      >
        <Box bgcolor={"#444"} p={2} pt={4} color={"white"} fontWeight={"bold"}>
          Saskatoon Black Business Expo
        </Box>
        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemContent>Home</ListItemContent>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/attendees")}>
            <ListItemContent>Attendees</ListItemContent>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/exhibitors")}>
            <ListItemContent>Exhibitors</ListItemContent>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/volunteers")}>
            <ListItemContent>Volunteers</ListItemContent>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/sponsorships")}>
            <ListItemContent>Sponsorship Requests</ListItemContent>
          </ListItemButton>
        </List>
      </Drawer>
      <div
        style={{
          height: "100vh",
          position: "fixed",
          width: "100vw",
        //   backgroundColor:"red",
          paddingLeft: 230,
          paddingTop:20,
          paddingRight:20,
          overflow:"auto"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Protected;
