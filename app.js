const express = require("express");
const cors = require("cors");
const generateSeed = require("./services/generateSeed");

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get("/new-seed", (req, res) => {
  if (!req.query.provider) {
    res.status(401).json({ message: "Should add a provider." }).send();
    return;
  }
  const wallet = generateSeed(req.query.provider);
  res.json(wallet);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
