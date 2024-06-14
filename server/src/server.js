const express = require("express");

const app = express();
app.disable("x-powered-by");

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
