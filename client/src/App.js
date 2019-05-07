import React, { Fragment } from "react";
import ShowMap from "./Components/Map";
import Register from "./Components/Register";
import { BrowserRouter, Route } from "react-router-dom";
import SavedLocations from "./Components/SavedLocations";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ShowMap} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/savedLoc" component={SavedLocations} />
    </BrowserRouter>
  );
};

export default App;
