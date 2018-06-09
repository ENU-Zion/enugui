import * as types from '../types';

import enu from '../helpers/enu';

export function voteproducers(producers = []) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_REQUEST
    });
    const { account } = settings;
    producers.sort();
    return enu(connection).voteproducer(account, '', producers)
      .then((tx) => dispatch({
        payload: { tx, producers },
        type: types.SYSTEM_VOTEPRODUCER_SUCCESS
      }))
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_VOTEPRODUCER_FAILURE
      }));
  };
}

export default {
  voteproducers
};
