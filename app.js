const express = require("express");
const cors = require("cors");
const generateSeed = require("./services/generateSeed");
const recoverWallet = require("./services/recoverWallet");
const { getSolanaAccount } = require("./services/getSolanaAccount");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/new-seed", (req, res) => {
  if (!req.query.provider) {
    res.status(401).json({ message: "Should add a provider." }).send();
    return;
  }
  const wallet = generateSeed(req.query.provider);
  res.json(wallet);
});

app.get("/wallet", async (req, res) => {
  const { public_key, provider } = req.query;
  if (!public_key || !provider)
    return res.status(400).json({ message: "Missing publicKey or provider." });
  if (provider === "solana") {
    const data = await getSolanaAccount(public_key);
    return res.json(data);
  }
  if (provider === "ethereum") {
    return res.status(404).json({ message: "This is being developed." });
  }
  res.status(404).end();
});

app.post("/recover", (req, res) => {
  const { phrase, provider } = req.body;
  if (!phrase || !provider) {
    res.status(400).json({ message: "Seed and provider are required." });
    return;
  }
  const wallet = recoverWallet({ phrase, provider });
  res.json(wallet);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
