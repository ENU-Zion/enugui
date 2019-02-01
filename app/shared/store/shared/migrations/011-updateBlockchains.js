const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    chain.supportedContracts = [];
    ['customtokens', 'producerinfo', 'regproxyinfo'].forEach((feature) => {
      chain.supportedContracts.push(feature);
    });
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
