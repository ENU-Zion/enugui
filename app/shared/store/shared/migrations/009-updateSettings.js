import { uniq } from 'lodash';

const update = (settings, defaultChainId) => {
  const newSettings = Object.assign({}, settings);
  // Create or update the `customTokens` setting
  const customTokens = [`${defaultChainId}:enu.token:ENU`];
  settings.customTokens.forEach((token) => {
    if (token.split(':').length < 3) {
      customTokens.push(`${defaultChainId}:${token}`);
    } else {
      customTokens.push(token);
    }
  });
  newSettings.customTokens = uniq(customTokens);
  return newSettings;
};

export default { update };
