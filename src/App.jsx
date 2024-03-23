import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Exhibit from "./pages/Exhibit/Exhibit";
import Sponsorship from "./pages/Sponsorship/Sponsorship";
import Volunteer from "./pages/Volunteer/Volunteer";
import Login from "./pages/Login";
import Protected from "./Protected";
import Attendees from "./pages/Attendees/Attendees";
import Feedback from "./pages/feedback/feedback";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={Protected}>
          <Route Component={Home} path="/" />
          <Route Component={Attendees} path="/attendees" />
          <Route Component={Exhibit} path="/exhibitors" />
          <Route Component={Sponsorship} path="/sponsorships" />
          <Route Component={Volunteer} path="/volunteers" />
          <Route Component={Feedback} path="/feedback" />
        </Route>
        <Route Component={Login} path="/login" />
      </Routes>
    </HashRouter>
  );
}

export default App;
