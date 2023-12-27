const express = require('express');
const app = express();
const config = require("config");

require("./startup/config");
require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || config.get("port");
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
