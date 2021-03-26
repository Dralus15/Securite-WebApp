import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export default function Secured() {
  let [keycloak, setKeycloak] = useState(null);
  let [authenticated, setauthenticated] = useState(false);
  let [listeInfoBancaire, setListInfoBancaire] = useState([]);

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

  const handleRefresh = async () => {
    const response = await fetch("/api/getData");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("DEBUG, front", body.listeInfoBancaire);
  };

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
      <button onClick={handleRefresh}>click here</button>
    </div>
  );
}
