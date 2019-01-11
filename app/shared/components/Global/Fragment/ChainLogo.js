// @flow
import React, { PureComponent } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import enuLogo from '../../../../renderer/assets/images/enu.png';

const logos = {
  'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f': enuLogo, // mainnet (enu)
};

class GlobalFragmentChainLogo extends PureComponent<Props> {
  render() {
    const {
      avatar,
      className,
      chainId,
      name,
      size,
      style,
      t,
    } = this.props;
    let src = logos[chainId];
    if (!logos[chainId]) {
      src = enuLogo;
    }
    return (
      <Popup
        content={t('tools:tools_wallets_blockchain')}
        header={name}
        inverted
        position="top center"
        style={{ textAlign: 'center' }}
        trigger={(
          <Image
            avatar={avatar}
            centered
            className={className}
            size={size}
            src={src}
            style={style}
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalFragmentChainLogo);
