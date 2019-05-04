import { ButtonD, InputBox } from "../Styles/StyledOne";
import React, { Fragment, useState, useEffect, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "../Styles/App.css";
import L from "leaflet";
const iURL = require("../Misc/Icon").url;
const Cookie = require("js-cookie");

const ShowMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 51.505,
      lng: -0.09
    },
    marker: {
      lat: 51.505,
      lng: -0.09
    },

    haveUsersLocation: false,
    zoom: 1,
    draggable: false,
    loggedIn: false
  });
  const [label, setLabel] = useState("");

  var myIcon = L.icon({
    iconUrl: iURL,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });

  useEffect(() => {
    if (Cookie.get("auth_t") !== undefined) {
      setState({ ...state, loggedIn: true });
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            marker: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            haveUsersLocation: true,
            zoom: 15
          });
        },
        async () => {
          const resp = await fetch("https://ipapi.co/json/");
          const loc = await resp.json();
          setState({
            center: {
              lat: loc.latitude,
              lng: loc.longitude
            },
            marker: {
              lat: loc.latitude,
              lng: loc.longitude
            },
            haveUsersLocation: true,
            zoom: 15
          });
        },
        { timeout: 2000, enableHighAccuracy: true }
      );
    }
  }, []);

  const updatePosition = e => {
    setState({
      ...state,
      marker: {
        lat: e.target._latlng.lat,
        lng: e.target._latlng.lng
      }
    });
  };

  const toggleDrag = e => {
    e.preventDefault();
    setState({
      ...state,
      draggable: !state.draggable
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    setLabel(e.target.value);
  };

  const position = [state.center.lat, state.center.lng];
  var markerPosition = [state.marker.lat, state.marker.lng];

  if (state.loggedIn === false) {
    return (
      <Fragment>
        <h4>Not Logged IN.</h4>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Map className="map" center={position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <form id="form" onSubmit={handleSubmit}>
          <br />
          <InputBox
            placeholder="Label for this Location."
            onChange={handleChange}
            name="label"
          />
          <br />
          <br />
          <ButtonD type="submit">Save</ButtonD>
          <br />
          <br />
          <ButtonD onClick={toggleDrag}>
            {" "}
            {state.draggable ? "Drag ON" : "Drag OFF"}
          </ButtonD>
        </form>
        {state.haveUsersLocation && (
          <Marker
            position={markerPosition}
            icon={myIcon}
            draggable={state.draggable}
            ondragend={updatePosition}
          />
        )}
      </Map>
    </Fragment>
  );
};

export default ShowMap;
