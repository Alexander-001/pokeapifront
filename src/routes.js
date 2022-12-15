import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import { HOME_ROUTE } from "./constants/routes";

const routes = (
  <Router>
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
    </Routes>
  </Router>
);

export default routes;
