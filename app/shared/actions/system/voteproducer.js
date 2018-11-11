import * as types from '../types';

import { getAccounts } from '../accounts';
import enu from '../helpers/enu';

export function voteproducers(producers = [], proxy = '') {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_PENDING,
      payload: { connection }
    });
    const { account } = settings;
    // sort (required by ENU)
    producers.sort();
    return enu(connection, true)
      .voteproducer(account, proxy, producers)
      .then((tx) => {
        const accounts = [account];
        // If a proxy is set, that account also needs to be loaded
        if (proxy) {
          accounts.push(proxy);
        }
        // Add a short delay for data processing on the node
        setTimeout(() => {
          dispatch(getAccounts(accounts));
        }, 500);
        return dispatch({
          payload: {
            connection,
            producers,
            proxy,
            tx,
          },
          type: types.SYSTEM_VOTEPRODUCER_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: {
          connection,
          err,
          producers,
          proxy
        },
        type: types.SYSTEM_VOTEPRODUCER_FAILURE
      }));
  };
}

export default {
  voteproducers
};
