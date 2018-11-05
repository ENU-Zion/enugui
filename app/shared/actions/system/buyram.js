import * as types from '../types';

import { getAccount } from '../accounts';
import enu from '../helpers/enu';

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_BUYRAM_PENDING
    });

    const { account } = settings;

    return enu(connection, true).buyram({
      payer: account,
      receiver: account,
      quant: `${amount.toFixed(4)} ${connection.chainSymbol || 'ENU'}`
    }).then((tx) => {
      setTimeout(dispatch(getAccount(account)), 500);

      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_BUYRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_BUYRAM_FAILURE
    }));
  };
}

export default {
  buyram
};
