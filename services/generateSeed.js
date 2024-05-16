const solanaWeb3 = require("@solana/web3.js");
const bip39 = require("bip39");
const nacl = require("tweetnacl");
const { ethers } = require("ethers");

module.exports = function generateSeed(provider) {
  try {
    const res = {};

    if (provider === "solana") {
      const mnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = deriveSeed(seed, path);
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const account = solanaWeb3.Keypair.fromSecretKey(keypair.secretKey);

      res.publicKey = account.publicKey.toBase58();
      res.account = account.publicKey.toBase58();
      res.secretKey = Buffer.from(keypair.secretKey).toString("hex");
      res.mnemonic = mnemonic;
    } else if (provider === "ethereum") {
      const wallet = ethers.Wallet.createRandom();
      res.account = wallet.address;
      res.secretKey = wallet.privateKey;
      res.mnemonic = wallet.mnemonic.phrase;
      res.publicKey = wallet.publicKey;
    } else {
      throw new Error("Unsupported provider");
    }

    return res;
  } catch (error) {
    console.error("Error generating seed:", error);
    return null;
  }
};

function deriveSeed(seed, path) {
  const { derivePath } = require("ed25519-hd-key");
  return derivePath(path, seed.toString("hex")).key;
}
