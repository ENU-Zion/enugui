import * as types from '../types';

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

    return enu(connection).sellram({
      account,
      bytes: Number(amount)
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_SELLRAM_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SELLRAM_FAILURE
    }));
  };
}

export default {
  sellram
};
