import * as types from './types';
import ENUContract from '../utils/ENU/Contract';
import enu from './helpers/enu';

export function getAbi(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETABI_REQUEST
    });
    const { connection } = getState();
    return enu(connection, true).getAbi(account).then((contract) => {
      if (!contract.abi) {
        return dispatch({
          type: types.SYSTEM_GETABI_FAILURE
        });
      }
      return dispatch({
        payload: {
          contract
        },
        type: types.SYSTEM_GETABI_SUCCESS
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETABI_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getAbi
};
