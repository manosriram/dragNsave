import React, { Fragment } from "react";
import ShowMap from "./Components/Map";
import Register from "./Components/Register";
import { BrowserRouter, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" />
      <Route exact path="/map" component={ShowMap} />
      <Route exact path="/register" component={Register} />
    </BrowserRouter>
  );
};

export default App;
