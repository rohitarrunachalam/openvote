require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    cosvm: {
      chainId: 323,
      url: 'https://rpc.cosvm.net',
      accounts: ['33ede857b31390a391413429aae423c6aee28b5521f4c3e8d4e39dd72e394a84'],
    },
  },
};