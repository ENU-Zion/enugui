const defaultExchangeAccounts = [
];

// exchange accounts by chain id
// if chain id not specified, default will be used 
const exchangeAccounts = {
  default: defaultExchangeAccounts
}

export default (chainId = null) => chainId && exchangeAccounts.hasOwnProperty(chainId) ? exchangeAccounts[chainId] : exchangeAccounts.default;
