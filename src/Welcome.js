/*--------------------------------------------------------------------------------
################################################################################
 * DESCRIPTION : Public components of the webapp allowing user to submit banking 
                 infos and visualizing the infos he submitted since he arrived 
                 on the site
 * STATES (input) :
          - dataList : state containing the list of the data submitted by the user 
            since he arrived on the site
          - nbObject : state containing the number of info sent since the user 
            arrived on the site 
 * OUTPUT : on form validation, data is sent to the server and aded to the data base
################################################################################
------------------------------------------------------------------------------*/

import React, { useState } from "react";

export default function Welcome() {
  //state containing info submitted during this session
  let [dataList, setDataList] = useState([]);

  //state containing the number of info submitted during this session
  let [nbObject, setNbObject] = useState(0);

  let [errorInsertion, setErrorInsertion] = useState(false);

  //actions on form validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    //creation of the object beeing sent to the server
    let dataObject = {
      idData: nbObject,
      nomCarte: event.target.nomCarte.value,
      numeroCarte: event.target.numeroCarte.value,
      dateCarte: event.target.dateCarte.value,
      codeSecuCarte: event.target.codeSecuCarte.value,
    };

    //POST request to the server sending the object of the user
    let response = await fetch("/api/updateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataObject: dataObject }),
    });
    const res = await response.text();
    if (!res.localeCompare("error")) {
      setErrorInsertion(true);
    } else {
      //setting of the states
      setDataList((prevItems) => [...prevItems, dataObject]);
      setNbObject(nbObject + 1);
      setErrorInsertion(false);
    }
  };

  return (
    <div>
      <p className={"test-class"}>bienvenue sur le composant public</p>
      {/*form for entering banking info*/}
      {errorInsertion && (
        <p>
          <mark>Une carte ayant le même numéro est déjà enregistré</mark>
        </p>
      )}
      <form id="card-form" className={"card-form"} onSubmit={handleSubmit}>
        <p>Entrez le nom associé à la carte</p>
        <input
          autoComplete="off"
          type="text"
          name="nomCarte"
          id="nomCarte"
          required
        ></input>
        <br />
        <p>Entrez le numéro associé à la carte</p>
        <input
          autoComplete="off"
          type="text"
          name="numeroCarte"
          id="numeroCarte"
          // pattern="[0-9]+"
          required
        ></input>
        <br />
        <p>Entrez la date de validité</p>
        <input
          autoComplete="off"
          type="text"
          name="dateCarte"
          id="dateCarte"
          // pattern="[0-9]{2}\/[0-9]{2}"
          required
        ></input>
        <br />
        <p>Entrez le code de sécurité</p>
        <input
          autoComplete="off"
          type="text"
          name="codeSecuCarte"
          id="codeSecuCarte"
          // pattern="[0-9]{3}"
          required
        ></input>
        <br />
        <input type="submit" value="Subscribe!" id="submit"></input>
      </form>
      {/*displaying info sent by the user during this session*/}
      <p>vous avez entré {nbObject} nouvelles entrées</p>
      {dataList.map((dataObject) => {
        return (
          <div className={"dataObject"} key={dataObject.idData}>
            <p>information bancaire n°{dataObject.idData}</p>
            <p>nom : {dataObject.nomCarte}</p>
            <p>numero : {dataObject.numeroCarte}</p>
            <p>date validité : {dataObject.dateCarte}</p>
            <p>code sécurité : {dataObject.codeSecuCarte}</p>
            <p>........................</p>
          </div>
        );
      })}
    </div>
  );
}
