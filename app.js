const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const gridCharacterRoutes = require("./routes/routes.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/SpreedSheet", gridCharacterRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
