/*--------------------------------------------------------------------------------
################################################################################
 * DESCRIPTION :
 * express server with the definition of backend api for writing new data 
   received from the front or sending data to the front
################################################################################
------------------------------------------------------------------------------*/

//import of needed express function
const express = require("express");
const bodyParser = require("body-parser");

//initialization of express app
const app = express();

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post for adding new data in the database
app.post("/api/updateData", (req, res) => {
  let fs = require("fs");
  let rawdata = fs.readFileSync("data.json");
  let data = JSON.parse(rawdata);
  let cardAlreadyStorred = false;

  data.listeInfoBancaire.forEach((element) => {
    if (element.numeroCarte === req.body.dataObject.numeroCarte) {
      cardAlreadyStorred = true;
    }
  });

  if (!cardAlreadyStorred) {
    data.listeInfoBancaire.push(req.body.dataObject);
    fs.writeFile(
      "data.json",
      JSON.stringify({ listeInfoBancaire: data.listeInfoBancaire }),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Data written to file");
        res.send("");
      }
    );
  } else {
    res.send("error");
  }
});

//get to send the data to the front
app.get("/api/getData", (req, res) => {
  let fs = require("fs");
  let rawdata = fs.readFileSync("data.json");
  let data = JSON.parse(rawdata);
  res.send({ listeInfoBancaire: data.listeInfoBancaire });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
