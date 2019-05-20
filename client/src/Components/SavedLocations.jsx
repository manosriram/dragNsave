import React, { Fragment, useEffect, useState } from "react";
import Nav from "./Nav";
import "../Styles/App.css";
import { ButtonTwo } from "../Styles/StyledOne";
import ShowMap from "./Map";

const SavedLocations = props => {
  const [locations, setLocations] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [mapDetails, setMapDetails] = useState(null);
  const [erMessage, setErMessage] = useState(undefined);

  const deleteLocation = async id => {
    try {
      const resp = await fetch("/loc/deleteLocation", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ locID: id })
      });
      const data = await resp.json();
      if (data.success === true) {
        props.history.push("/");
      } else if (data.error === true) {
        setErMessage("User Not Logged IN");
      }
    } catch (er) {
      console.log(er);
    }
  };

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
      {locations.length === 0 && <h4 id="noSave">No Saved Locations.</h4>}
      {erMessage !== undefined && <h4>{erMessage}</h4>}
      {locations.map((el, elInd) => {
        return (
          <div key={elInd} id="locBoxOne">
            <div id="content" key={elInd}>
              <br />
              <strong>
                <h3>
                  {el.label}
                  &nbsp;
                  <i
                    class="far fa-trash-alt"
                    id="deleteIcon"
                    onClick={() => deleteLocation(el._id)}
                  />
                </h3>
              </strong>
              <br />
              <h5>Lat : {el.lat}</h5>
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
