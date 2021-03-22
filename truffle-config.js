const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = ''
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
      provider: () => new HDWalletProvider(privateKey, ''),
      network_id: 1, // Mainnet's id
      gas: 0,
    },
    ropsten: { // ropsten
      provider: () => new HDWalletProvider(privateKey, ''),
      network_id: 3, // Ropsten's id
      gas: 8000000, // Ropsten has a lower block limit than mainnet
    },
    kovan: { // kovan
      provider: () => new HDWalletProvider(privateKey, ''),
      network_id: 42, // Kovan's id
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
