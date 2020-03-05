import React from "react";
import { withRouter } from "react-router-dom";
import routes from "./routes";
import Header from './components/header/Header'

import "./app.css";

function App(props) {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default withRouter(App);
