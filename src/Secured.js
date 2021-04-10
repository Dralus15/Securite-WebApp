/*--------------------------------------------------------------------------------
################################################################################
 * DESCRIPTION : component accessible only if the user can be authenticated by 
                 the keycloak. It show the banking data stored in the server
 * STATES (input) :
          - keycloak : state containing the keycloak configuration of the app
          - authenticated : state containing a boolean telling if the user is 
            authenticated or not
          - listeInfoBancaire : state containing the banking info of the server
################################################################################
------------------------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export default function Secured() {
  //state initialization
  let [keycloak, setKeycloak] = useState(null);
  let [authenticated, setauthenticated] = useState(false);
  let [listeInfoBancaire, setListInfoBancaire] = useState([]);

  //actions to do when component is mounting
  useEffect(() => {
    console.log("componentDidMount 1");
    const keycloak = Keycloak("keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      console.log("componentDidMount 2");
      setKeycloak(keycloak);
      setauthenticated(authenticated);
    });
    handleRefresh();
  }, []);

  //fetch the data from server
  const handleRefresh = async () => {
    //GET request for data from server
    const response = await fetch("/api/getData");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    setListInfoBancaire(body.listeInfoBancaire);
    console.log("DEBUG, front", body.listeInfoBancaire);
  };

  //if user is authenticated show info
  if (keycloak) {
    if (authenticated)
      return (
        <div>
          <p>
            This is a Keycloak-secured component of your application. You
            shouldn't be able to see this unless you've authenticated with
            Keycloak.
          </p>
        </div>
      );
    else return <div>Unable to authenticate!</div>;
  }
  return (
    <div>
      <p>Initializing Keycloak...</p>
      <button onClick={handleRefresh}>réactualiser les données</button>
      {listeInfoBancaire.map((dataObject) => {
        return (
          <div key={dataObject.idData}>
            <p>........................</p>
            <p>nom : {dataObject.nomCarte}</p>
            <p>numero carte : {dataObject.numeroCarte}</p>
            <p>date validité : {dataObject.dateCarte}</p>
            <p>code sécurité : {dataObject.codeSecuCarte}</p>
          </div>
        );
      })}
    </div>
  );
}