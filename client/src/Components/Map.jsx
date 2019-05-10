import Nav from "./Nav";
import { ButtonD, InputBox } from "../Styles/StyledOne";
import React, { Fragment, useState, useEffect, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "../Styles/App.css";
import L from "leaflet";
import Register from "./Register";
const iURL = require("../Misc/Icon").url;
const Cookie = require("js-cookie");

const ShowMap = props => {
  const [label, setLabel] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [ret, setReturn] = useState(false);
  const [msg, setMessage] = useState("");
  const [state, setState] = useState({
    center: {
      lat: 51.505,
      lng: -0.09
    },
    marker: {
      lat: 51.505,
      lng: -0.09
    },

    mapSpinning: true,
    haveUsersLocation: false,
    zoom: 1,
    draggable: false,
    loggedIn: true
  });

  var myIcon = L.icon({
    iconUrl: iURL,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });

  useEffect(() => {
    setSpinner(true);
    if (Cookie.get("auth_t") !== undefined) {
      if (props.props !== undefined) {
        setState({
          center: {
            lat: props.props.lat,
            lng: props.props.lng
          },
          marker: {
            lat: props.props.lat,
            lng: props.props.lng
          },

          haveUsersLocation: true,
          zoom: 11,
          draggable: true,
          loggedIn: true
        });
      }

      if (props.props === undefined) {
        navigator.geolocation.getCurrentPosition(
          position => {
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
              loggedIn: true,
              mapSpinning: false,
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
              zoom: 15,
              loggedIn: true,
              mapSpinning: false
            });
          },
          {
            timeout: 2000,
            enableHighAccuracy: true
          }
        );
      }
      setSpinner(false);
    } else {
      setState({
        ...state,
        loggedIn: false,
        mapSpinning: false
      });
    }
    setSpinner(false);
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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (label !== "") {
        const resp = await fetch("/loc/pushLocations", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            markerPosition,
            label
          })
        });
        const data = await resp.json();
        console.log(data);
      } else {
        setMessage("Enter Label.");
      }
    } catch (er) {
      console.log(er);
    }
  };

  const handleChange = e => {
    setLabel(e.target.value);
  };

  const position = [state.center.lat, state.center.lng];
  var markerPosition = [state.marker.lat, state.marker.lng];

  if (spinner === true || state.mapSpinning === true) {
    return (
      <div>
        <div className="spinner-border text-dark" role="status" id="spinner">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (state.loggedIn === false) {
    return <Register />;
  }

  return (
    <Fragment>
      <Nav />
      <Map className="map" center={position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <form id="form" onSubmit={handleSubmit}>
          <h5 id="messageAlert">{msg}</h5>
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
