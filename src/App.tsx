import React from "react";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./view/Home";
import Edit from "./view/Edit";

Axios.defaults.baseURL = "http://localhost:4000/api/";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/edit/:id" component={Edit} />
      </Router>
    </>
  );
};

export default App;
