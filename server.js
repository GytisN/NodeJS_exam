const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


//version route
app.get("/version", (req, res) => {
    res.json({ version: "v0.1.0" });
  });

  //listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
