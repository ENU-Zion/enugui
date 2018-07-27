import * as types from '../types';

import { getAccount } from '../accounts';
import enu from '../helpers/enu';

export function sellram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_SELLRAM_PENDING
    });

    const { account } = settings;

    return enu(connection, true).sellram({
      account,
      bytes: Number(amount)
    }).then((tx) => {
      setTimeout(dispatch(getAccount(account)), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SELLRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SELLRAM_FAILURE
    }));
  };
}

export default {
  sellram
};
