import React, { useState } from "react";

export default function Welcome() {
  let [dataList, setDataList] = useState([]);
  let [nbObject, setNbObject] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dataObject = {
      idData: nbObject,
      nomCarte: event.target.nomCarte.value,
      numeroCarte: event.target.numeroCarte.value,
      dateCarte: event.target.dateCarte.value,
      codeSecuCarte: event.target.codeSecuCarte.value,
    };

    setDataList((prevItems) => [...prevItems, dataObject]);
    setNbObject(nbObject + 1);

    fetch("/api/updateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataObject: dataObject }),
    });
  };

  return (
    <div>
      <p>public component</p>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Subscribe!"></input>
      </form>
      <p>il y a : {nbObject} informations entrées</p>
      {dataList.map((dataObject) => {
        return (
          <div key={dataObject.idData}>
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
