# ez-wallet-be

`ez-wallet-be` is a backend service built with Express, ethers.js, and @solana/web3.js. It provides an endpoint to generate new Ethereum (ETH) or Solana (SOL) wallets.

## Features

- Generate new Ethereum and Solana wallets
- Simple and fast API endpoint

## Technologies Used

- [Express](https://expressjs.com/)
- [ethers.js](https://docs.ethers.io/v5/)
- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ez-wallet-be.git
   cd ez-wallet-be
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Server

Start the server:

```bash
npm start
# or
yarn start
```

The server will be available at `http://localhost:3000`.

## API Endpoints

### `/new-seed`

Generates a new Ethereum or Solana wallet.

- **URL**: `/new-seed`
- **Method**: `GET`
- **Query Parameters**:
  - `provider` (required): The wallet provider (`eth` for Ethereum, `sol` for Solana).

- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "address": "wallet_address",
      "privateKey": "wallet_private_key",
      "mnemonic": "seed_phrase"
    }
    ```

- **Error Response**:
  - **Code**: 401
  - **Content**:
    ```json
    {
      "message": "Should add a provider."
    }
    ```

## Project Structure

```plaintext
ez-wallet-be/
├── node_modules/
├── services/
│   └── generateSeed.js
├── .gitignore
├── package.json
├── README.md
└── app.js
```

- `server.js`: Main server file where the Express app is defined and endpoints are set up.
- `services/generateSeed.js`: Service module for generating Ethereum or Solana wallets.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [ziwenw4900@gmail.com](mailto:ziwenw4900@gmail.com).