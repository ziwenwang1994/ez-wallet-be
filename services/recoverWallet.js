const { ethers } = require("ethers");
const bip39 = require("bip39");
const nacl = require("tweetnacl");
const { Keypair } = require("@solana/web3.js");

module.exports = function recoverWallet({ phrase, provider }) {
  try {
    if (provider === "ethereum") {
      const wallet = ethers.Wallet.fromPhrase(phrase);
      return {
        account: wallet.address,
        secretKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        mnemonic: wallet.mnemonic.phrase,
      };
    }

    if (provider === "solana") {
      const seed = bip39.mnemonicToSeedSync(phrase);
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = deriveSeed(seed, path);
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const account = Keypair.fromSecretKey(keypair.secretKey);

      return {
        account: account.publicKey.toBase58(),
        secretKey: Buffer.from(keypair.secretKey).toString("hex"),
        publicKey: account.publicKey.toBase58(),
        mnemonic: phrase,
      };
    }

    throw new Error("Unsupported provider");
  } catch (error) {
    console.error("Error recovering wallet:", error);
    return null;
  }
};

function deriveSeed(seed, path) {
  const { derivePath } = require("ed25519-hd-key");
  return derivePath(path, seed.toString("hex")).key;
}
