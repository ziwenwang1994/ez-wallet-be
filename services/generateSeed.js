module.exports = function generateSeed(provider) {
  const res = {};
  if (provider === "solana") {
    const solanaWeb3 = require("@solana/web3.js");
    const bip39 = require("bip39");
    const nacl = require("tweetnacl");
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
    const keypair = nacl.sign.keyPair.fromSeed(seed);
    const secretKey = keypair.secretKey;
    const account = solanaWeb3.Keypair.fromSecretKey(secretKey);

    res.account = account.publicKey.toBase58();
    res.secretKey = account.secretKey.toString();
    res.mnemonic = mnemonic;
  } else {
    const { ethers } = require("ethers");
    const wallet = ethers.Wallet.createRandom();
    res.account = wallet.address;
    res.secretKey = wallet.privateKey;
    res.mnemonic = wallet.mnemonic.phrase;
  }

  return res;
};
