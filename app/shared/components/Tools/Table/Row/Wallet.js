// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Dropdown, Header, Label, Popup, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../../../containers/Global/Button/Elevate';
import GlobalFragmentAuthorization from '../../../Global/Fragment/Authorization';
import GlobalButtonWalletUpgrade from '../../../../containers/Global/Button/Wallet/Upgrade';
import ENUAccount from '../../../../utils/ENU/Account';

class ToolsTableRowWallet extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {}
    );
  }
  removeWallet = (account, authorization) => {
    const { actions } = this.props;
    actions.removeWallet(account, authorization);
  }
  swapWallet = (account, authorization, password = false) => {
    const { actions } = this.props;
    actions.useWallet(account, authorization);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  render() {
    const {
      current,
      settings,
      status,
      t,
      validate,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey
    } = wallet;
    const {
      accountData
    } = current;
    const data = new ENUAccount(accountData).getPermission(authorization);
    let modal;
    let color = 'grey';
    const items = [
      (
        <Dropdown.Header icon="warning sign" content={t('wallet:wallet_advanced_header')} />
      )
    ];
    // Is this the current wallet? Account + Authorization must match
    const isCurrentWallet = (
      account === current.account
      && authorization === current.authorization
    );

    let icon = 'disk';
    // Create delete button based on wallet
    switch (mode) {
      case 'watch': {
        color = 'grey';
        icon = 'eye';
        items.push((
          <Dropdown.Item
            content={t('wallet:wallet_remove')}
            disabled={isCurrentWallet}
            icon="trash"
            key="delete"
            onClick={() => this.removeWallet(account, authorization)}
          />
        ));
        break;
      }
      default: {
        color = 'green';
        icon = 'id card';
        items.push((
          <GlobalButtonElevate
            onSuccess={() => this.removeWallet(account, authorization)}
            settings={settings}
            trigger={(
              <Dropdown.Item
                disabled={isCurrentWallet}
                icon="trash"
                key="delete"
                text={t('wallet:wallet_remove')}
              />
            )}
            validate={validate}
            wallet={wallet}
          />
        ));
      }
    }
    return (
      <Table.Row key={`${account}-${authorization}`}>
        <Table.Cell collapsing>
          {modal}
          <Header>
            <GlobalFragmentAuthorization
              account={account}
              authorization={authorization}
              pubkey={pubkey}
            />
            {(wallet.blockchain)
              ? (
                <Header.Subheader>
                  {t('blockchain')}: {wallet.blockchain}
                </Header.Subheader>
              )
              : false
            }
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Popup
            content={t(`wallet:wallet_mode_explain_${mode}`)}
            inverted
            trigger={(
              <Label
                basic
                color={color}
                content={t(`global:global_modal_account_import_${mode}_wallet`)}
                icon={icon}
                position="left center"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell collapsing textAlign="right">
          <GlobalButtonWalletUpgrade
            wallet={wallet}
          />
          {(mode === 'hot' || mode === 'cold')
            ? (
              <GlobalButtonElevate
                onSuccess={(password) => this.swapWallet(account, authorization, password)}
                settings={settings}
                trigger={(
                  <Button
                    color="green"
                    content={t('tools_wallets_swap')}
                    disabled={isCurrentWallet}
                    icon="random"
                  />
                )}
                validate={validate}
                wallet={wallet}
              />
            )
            : false
          }
          {(mode === 'watch')
            ? (
              <Button
                color="green"
                content={t('tools_wallets_swap')}
                disabled={isCurrentWallet}
                icon="random"
                onClick={() => this.swapWallet(account, authorization)}
              />
            )
            : false
          }
          <Dropdown
            direction="left"
            floating
            button
            className="icon"
            icon="ellipsis vertical"
          >
            <Dropdown.Menu>
              {items}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('tools')(ToolsTableRowWallet);
