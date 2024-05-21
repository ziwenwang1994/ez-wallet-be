const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { programs } = require("@metaplex/js");

async function getSolanaAccount(publicKeyString) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const publicKey = new PublicKey(publicKeyString);
  try {
    const data = await getAccountInfo({
      publicKey,
      connection,
      TOKEN_PROGRAM_ID,
    }).catch((err) => {
      console.error(err);
    });
    return data;
  } catch (e) {
    return null;
  }
}

async function getAccountInfo({ publicKey, connection, TOKEN_PROGRAM_ID }) {
  const accountInfo = await connection.getAccountInfo(publicKey);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );
  const tokens = [];
  for(const tokenAccount of tokenAccounts.value) {
    const mintAddress = tokenAccount?.account?.data?.parsed?.info?.mint;
      const metadata = await getTokenMetadata({ mintAddress, connection });
      tokens.push({ metadata, tokenAccount });
  }
  return { accountInfo, tokens };
}

async function getTokenMetadata({ mintAddress, connection }) {
  try {
    const { Metadata } = programs.metadata;
    const metadataPDA = await Metadata.getPDA(new PublicKey(mintAddress));
    const metadata = await Metadata.load(connection, metadataPDA);
    return metadata;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getSolanaAccount, getAccountInfo, getTokenMetadata };
