import sortBy from 'lodash/sortBy';

import * as types from './types';
import enu from './helpers/enu';

export function getBlockExplorers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_PENDING
    });
    // const { connection } = getState();
    // const query = {
    //   json: true,
    //   code: 'blockexplorers',
    //   scope: 'blockexplorers',
    //   table: 'blockexplorers',
    //   limit: 100,
    // };

    const rows = [
      {
        name: 'qsx.io',
        patterns: {
          account: 'http://enumivo.qsx.io/accounts/{account}',
          txid: 'http://enumivo.qsx.io/transactions/{txid}'
        }
      }
    ];

    // enu(connection).getTableRows(query).then((results) => {
    //   const { rows } = results;

    const sortedList = sortBy(rows, 'name');

    const blockExplorers = {};

    sortedList.forEach((bE) => {
      blockExplorers[bE.name] = bE.patterns;
    });

    return dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_SUCCESS,
      payload: {
        blockExplorers
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_BLOCKEXPLORERS_FAILURE,
    //   payload: { err },
    // }));
  };
}

export default {
  getBlockExplorers
};
