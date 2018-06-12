// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';

class WalletStatusBalances extends Component<Props> {
  render() {
    const {
      accounts,
      balances,
      settings,
      t
    } = this.props;
    const account = accounts[settings.account] || {};
    const {
      self_delegated_bandwidth
    } = account;
    const totalStaked = (parseFloat(self_delegated_bandwidth.cpu_weight) + parseFloat(self_delegated_bandwidth.net_weight));
    const tokens = (balances && balances[settings.account]) ? balances[settings.account] : { ENU: 0 };
    const rows = [
      (
        <Table.Row key="ENU">
          <Table.Cell width={5}>
            ENU
          </Table.Cell>
          <Table.Cell>
            {(tokens.ENU) ? tokens.ENU.toFixed(4) : '0.0000'}
            <span style={{ marginLeft: '0.25em' }}>
              (+{totalStaked.toFixed(4)} ENU {t('wallet_status_resources_staked')})
            </span>
          </Table.Cell>
        </Table.Row>
      )
    ];
    // Add rows for remaining tokens
    forEach(tokens, (amount, token) => {
      if (token === 'ENU') return;
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            {token}
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(4)}
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
      <Segment vertical basic loading={!tokens}>
        <Table
          attached="bottom"
          definition
          unstackable
        >
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusBalances);
