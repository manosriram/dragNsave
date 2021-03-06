import SavedLocations from "./SavedLocations";
import "../Styles/App.css";
import React, { Fragment, useEffect, useState } from "react";
const Cookie = require("js-cookie");

const Nav = () => {
  const [token, setToken] = useState("");
  const [savedLocations, setSavedLocations] = useState(false);

  useEffect(() => {
    const cookie = Cookie.get("auth_t");
    setToken(cookie);
  });

  const Logout = () => {
    Cookie.remove("auth_t");
    window.location = "/";
  };

  return (
    <Fragment>
      <nav
        class="navbar navbar-expand-md navbar-light bg-light fixed-top"
        id="navnav"
      >
        <a class="navbar-brand" href="/">
          <h2>HOME</h2>
        </a>
        <button
          id="togglebar"
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        {token !== undefined && (
          <Fragment>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/savedLoc">
                    <h5>Saved Locations </h5>
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <form action="/auth/logout" />
                  <a class="nav-link" onClick={Logout} id="logout">
                    <h5> Logout</h5> <span class="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>
          </Fragment>
        )}
      </nav>
      {savedLocations && <SavedLocations />}
    </Fragment>
  );
};

export default Nav;
