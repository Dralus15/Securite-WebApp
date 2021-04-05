/*--------------------------------------------------------------------------------
################################################################################
 * DESCRIPTION :
 * components setting up the routes of the webapp and two links redirecting to 
   the two pages of the webapp
################################################################################
------------------------------------------------------------------------------*/

import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import Secured from "./Secured";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li>
              <Link to="/">page d'enregistrement de données bancaires</Link>
            </li>
            <li>
              <Link to="/secured">page d'administration</Link>
            </li>
          </ul>
          <Route exact path="/" component={Welcome} />
          <Route path="/secured" component={Secured} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
