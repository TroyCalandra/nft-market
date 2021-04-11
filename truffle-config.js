const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require("./app/config");
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    mainnet: { // mainnet
      provider: () => new HDWalletProvider(config.walletPrivateKey, config.mainnetEthClient),
      network_id: 1, // Mainnet's id
      gas: 0,
    },
    goerli: { // goerli
      provider: () => new HDWalletProvider(config.walletPrivateKey, config.goerliEthClient),
      network_id: 5, // Goerli's id
      gas: 8000000, 
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.5.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
