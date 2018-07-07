// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';

import DangerLink from '../../Modal/DangerLink';

class GlobalTransactionMessageSuccess extends Component<Props> {
  render() {
    const {
      onClose,
      t,
      transaction,
      transactions
    } = this.props;
    const links = [];
    if (transaction) {
      links.push(<DangerLink
        content={`${transaction.transaction_id.substr(0, 8)}...${transaction.transaction_id.substr(-8)}`}
        link={`http://enumivo.qsx.io/transactions/${transaction.transaction_id}`}
      />);
    }
    if (transactions) {
      transactions.map((tx) =>
        links.push(<DangerLink
          content={`${tx.transaction_id.substr(0, 8)}...${tx.transaction_id.substr(-8)}`}
          link={`https://enumivo.qsx.io/transactions/${tx.transaction_id}`}
        />));
    }
    return (
      <Segment basic>
        <Header
          content={t('global_transaction_complete_title')}
          icon="checkmark"
          size="large"
        />
        <Modal.Content>
          <p>{t('global_transaction_complete_message')}</p>
          <Segment padded textAlign="center">
            <p>txids</p>
            {links.map((link, idx) => (
              <p key={idx}>
                #{idx+1}
                {' - '}
                {link}
              </p>
            ))}
            <p>(linked to http://enumivo.qsx.io/)</p>
          </Segment>
          <Message
            icon
            size="large"
            warning
          >
            <Icon
              name="info circle"
            />
            <Message.Content>
              <Message.Header>{t('global_transaction_complete_warning_title')}</Message.Header>
              {t('global_transaction_complete_warning_message')}
            </Message.Content>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button color="green" floated="right" onClick={onClose}>
              <Icon name="checkmark" /> {t('close')}
            </Button>
          </Segment>
        </Modal.Actions>
      </Segment>

    );
  }
}

export default translate('global')(GlobalTransactionMessageSuccess);
