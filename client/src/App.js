import React, { Fragment, useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Styles/App.css";
import L from "leaflet";
const iURL = require("./Misc/Icon").url;

const App = () => {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
    haveUsersLocation: false,
    zoom: 1
  });

  var myIcon = L.icon({
    iconUrl: iURL,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          haveUsersLocation: true,
          zoom: 15
        });
      },
      async () => {
        const resp = await fetch("https://ipapi.co/json/");
        const loc = await resp.json();
        setState({
          lat: loc.latitude,
          lng: loc.longitude,
          haveUsersLocation: true,
          zoom: 15
        });
      }
    );
  }, []);

  const position = [state.lat, state.lng];
  return (
    <Fragment>
      <Map className="map" center={position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {state.haveUsersLocation && (
          <Marker position={position} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </Map>
    </Fragment>
  );
};

export default App;
