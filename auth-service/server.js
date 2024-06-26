const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const port = 6000;
const server = app.listen(port, () =>
  console.log(`${"*".repeat(50)} Listening on PORT ${port}`)
);
