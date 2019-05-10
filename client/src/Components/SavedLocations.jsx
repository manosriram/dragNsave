import React, { Fragment, useEffect, useState } from "react";
import Nav from "./Nav";
import "../Styles/App.css";
import { ButtonTwo } from "../Styles/StyledOne";
import ShowMap from "./Map";

const SavedLocations = () => {
  const [locations, setLocations] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [mapDetails, setMapDetails] = useState(null);

  const handleGT = e => {
    setMapDetails({
      lat: e.lat,
      lng: e.lng,
      label: e.label
    });
  };

  const grabLocations = async () => {
    const resp = await fetch("/loc/getUserLocations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await resp.json();
    setLocations(data.loc);
  };

  useEffect(() => {
    grabLocations();

    setSpinner(false);
    return () => console.log(locations);
  }, []);

  if (spinner === true) {
    return (
      <div class="spinner-border text-dark" role="status" id="spinner">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  if (mapDetails !== null) {
    return <ShowMap props={mapDetails} />;
  }

  return (
    <Fragment>
      <Nav />
      <br />
      {locations.map((el, elInd) => {
        return (
          <div key={elInd} id="locBoxOne">
            <div id="content" key={elInd}>
              <br />
              <strong>
                <h3>{el.label}</h3>
              </strong>
              <br />
              <h5>Latt : {el.lat}</h5>
              <h5>Lng : {el.lng}</h5>
              <br />
              <ButtonTwo value={el} onClick={() => handleGT(el)}>
                Go There
              </ButtonTwo>
              <br />
              <br />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default SavedLocations;
