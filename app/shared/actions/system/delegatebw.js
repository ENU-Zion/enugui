import * as types from '../types';
import * as AccountActions from '../accounts';
import enu from '../helpers/enu';

export function delegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_DELEGATEBW_PENDING
    });

    return enu(connection, true).transaction(tr => {
      tr.delegatebw(delegatebwParams(delegator, receiver, netAmount, cpuAmount));
    }).then((tx) => {
      dispatch(AccountActions.getAccount(delegator));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_DELEGATEBW_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_DELEGATEBW_FAILURE
    }));
  };
}

export function delegatebwParams(delegator, receiver, netAmount, cpuAmount, transferTokens) {
  const stakeNetAmount = parseFloat(netAmount) || 0;
  const stakeCpuAmount = parseFloat(cpuAmount) || 0;

  return {
    from: delegator,
    receiver,
    stake_net_quantity: `${stakeNetAmount.toFixed(4)} ENU`,
    stake_cpu_quantity: `${stakeCpuAmount.toFixed(4)} ENU`,
    transfer: transferTokens ? 1 : 0
  };
}

export default {
  delegatebw
};
