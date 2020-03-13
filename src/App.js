import React from "react";
import { withRouter } from "react-router-dom";
import routes from "./routes";
import Header from './components/header/Header'
import Nav from './components/nav/Nav'

import "./app.scss";

function App(props) {
  return (
    <div className="App">
      <Header />
      {routes}
      <Nav />
    </div>
  );
}

export default withRouter(App);
