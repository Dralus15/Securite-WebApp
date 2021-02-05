import React, { useState } from "react";
import "./style.css";
// noinspection ES6CheckImport
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login'
import Preference from './Preference';
import useToken from './useToken'




function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
      <h1> Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/preference">
            <Preference/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
