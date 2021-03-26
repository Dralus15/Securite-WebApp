const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/updateData", (req, res) => {
  let fs = require("fs");
  let rawdata = fs.readFileSync("data.json");
  let data = JSON.parse(rawdata);
  data.listeInfoBancaire.push(req.body.dataObject);
  fs.writeFile(
    "data.json",
    JSON.stringify(data.listeInfoBancaire),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
});

app.get("/api/getData", (req, res) => {
  let fs = require("fs");
  let rawdata = fs.readFileSync("data.json");
  let listeInfoBancaire = JSON.parse(rawdata);
  console.log(listeInfoBancaire);
  res.send({ listeInfoBancaire: listeInfoBancaire });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
