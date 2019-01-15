import { uniq } from 'lodash';

const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // Ensure array exists for value
    if (!chain.excludeFeatures) {
      chain.excludeFeatures = [];
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
