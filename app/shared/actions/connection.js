import * as types from './types';
import enu from './helpers/enu';

export function setConnectionBroadcast(enable = true) {
  return (dispatch: () => void) => {
    dispatch({
      payload: { enable },
      type: types.SET_CONNECTION_BROADCAST
    });
  };
}

export function setConnectionSign(enable = true) {
  return (dispatch: () => void) => {
    dispatch({
      payload: { enable },
      type: types.SET_CONNECTION_SIGN
    });
  };
}

export function historyPluginCheck() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
    } = getState();
    let historyAccount;
    historyAccount = 'aiden.pearce';
    return enu(connection).getActions(historyAccount).then((result) => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: (result.actions && result.actions.length !== 0) }
    })).catch(() => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: false }
    }));
  };
}

export function setChainId(chainId) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_CHAIN_ID,
      payload: { chainId }
    });
  };
}

export default {
  historyPluginCheck,
  setChainId,
  setConnectionBroadcast,
  setConnectionSign,
};
