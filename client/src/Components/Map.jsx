import React, { Fragment, useState, useEffect, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "../Styles/App.css";
import L from "leaflet";
const iURL = require("../Misc/Icon").url;

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
    draggable: false
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
          haveUsersLocation: true,
          zoom: 15
        });
      }
    );
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

  const toggleDrag = () => {
    setState({
      ...state,
      draggable: !state.draggable
    });
  };

  const position = [state.center.lat, state.center.lng];
  var markerPosition = [state.marker.lat, state.marker.lng];
  return (
    <Fragment>
      <Map className="map" center={position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {state.haveUsersLocation && (
          <Marker
            position={markerPosition}
            icon={myIcon}
            draggable={state.draggable}
            ondragend={updatePosition}
            onclick={toggleDrag}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </Map>
    </Fragment>
  );
};

export default ShowMap;
