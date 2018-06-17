import * as types from './types';

import enu from './helpers/enu';

export function getGlobals() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GLOBALS_REQUEST
    });
    const { connection } = getState();
    enu(connection).getTableRows(true, 'enumivo', 'enumivo', 'global').then((results) => dispatch({
      type: types.GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getCurrencyStats() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    enu(connection).getCurrencyStats("enu.token", "ENU").then((results) => dispatch({
      type: types.GET_CURRENCYSTATS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_CURRENCYSTATS_FAILURE,
      payload: { err },
    }));
  };
}



export default {
  getCurrencyStats,
  getGlobals
};
