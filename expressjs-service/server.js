const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();

function startServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  const db = require('./src/models');

  db.sequalize.sync()
    .then(() => {
      console.log("Synced db.");
    }).catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

    require("./src/routes/customer.routes")(app);

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = { start: startServer };