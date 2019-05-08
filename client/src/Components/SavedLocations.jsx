import React, { Fragment, useEffect, useState } from "react";
import Nav from "./Nav";
import "../Styles/App.css";
import { ButtonTwo } from "../Styles/StyledOne";

const SavedLocations = () => {
  const [locations, setLocations] = useState([]);

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

    return () => console.log(locations);
  }, []);

  return (
    <Fragment>
      <Nav />
      {locations.map((el, elInd) => {
        return (
          <Fragment key={elInd}>
            <div id="locBoxOne" key={elInd}>
              <br />
              <strong>
                <h3>{el.label}</h3>
              </strong>
              <h5>Latt : {el.lat}</h5>
              <h5>Lng : {el.lng}</h5>
              <br />
              <ButtonTwo>Go There</ButtonTwo>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default SavedLocations;
