const CONTRACT_NAME = process.env.CONTRACT_NAME || "null_address.testnet";

module.exports = {
  CONTRACT_ID: process.env.CONTRACT_ID || "priceoracle.testnet",
  NEAR_ACCOUNT_ID: process.env.NEAR_ACCOUNT_ID || "zavodil.testnet",
  // Will report the prices at least every 50 seconds
  MAX_NO_REPORT_DURATION: process.env.MAX_NO_REPORT_DURATION
    ? parseFloat(process.env.MAX_NO_REPORT_DURATION)
    : 50000,
  // Relative difference. Default 0.005 or 0.5%
  RELATIVE_DIFF: process.env.RELATIVE_DIFF
    ? parseFloat(process.env.RELATIVE_DIFF)
    : 0.005,
  // Each price is reported with 4 digits after floating point.
  FRACTION_DIGITS: process.env.FRACTION_DIGITS
    ? parseInt(process.env.FRACTION_DIGITS)
    : 4,
  // Time out is milliseconds when the process is killed.
  REPORT_TIMEOUT: process.env.REPORT_TIMEOUT
    ? parseInt(process.env.REPORT_TIMEOUT)
    : 15000,

  API_SERVER_URL: "https://rest.nearapi.org",
  MAINNET_RPC: "https://rpc.mainnet.near.org",
  getConfig: (env) => {
    switch (env) {
      case "production":
      case "mainnet":
        return {
          networkId: "mainnet",
          nodeUrl: "https://rpc.mainnet.near.org",
          contractName: CONTRACT_NAME || "null_address.near",
          walletUrl: "https://wallet.near.org",
          helperUrl: "https://helper.mainnet.near.org",
          explorerUrl: "https://explorer.mainnet.near.org",
        };
      case "development":
      case "testnet":
        return {
          networkId: "testnet",
          nodeUrl: "https://rpc.testnet.near.org",
          contractName: CONTRACT_NAME || "null_address.testnet",
          walletUrl: "https://wallet.testnet.near.org",
          helperUrl: "https://helper.testnet.near.org",
          explorerUrl: "https://explorer.testnet.near.org",
        };
      case "betanet":
        return {
          networkId: "betanet",
          nodeUrl: "https://rpc.betanet.near.org",
          contractName: CONTRACT_NAME,
          walletUrl: "https://wallet.betanet.near.org",
          helperUrl: "https://helper.betanet.near.org",
          explorerUrl: "https://explorer.betanet.near.org",
        };
      case "local":
        return {
          networkId: "local",
          nodeUrl: "http://localhost:3030",
          keyPath: `${process.env.HOME}/.near/validator_key.json`,
          walletUrl: "http://localhost:4000/wallet",
          contractName: CONTRACT_NAME,
        };
      case "test":
      case "ci":
        return {
          networkId: "shared-test",
          nodeUrl: "https://rpc.ci-testnet.near.org",
          contractName: CONTRACT_NAME,
          masterAccount: "test.near",
        };
      case "ci-betanet":
        return {
          networkId: "shared-test-staging",
          nodeUrl: "https://rpc.ci-betanet.near.org",
          contractName: CONTRACT_NAME,
          masterAccount: "test.near",
        };
      default:
        throw Error(
          `Unconfigured environment '${env}'. Can be configured in src/config.js.`
        );
    }
  },
};
