import * as types from '../actions/types';

const initialState = {
  data: false
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_CURRENT_WALLET: {
      return Object.assign({}, state, {
        account: action.payload.account,
        accountData: action.payload.accountData,
        authorization: action.payload.authorization,
        convertParameters: action.payload.convertParameters,
        data: action.payload.data,
        mode: action.payload.mode,
        path: action.payload.path,
        pubkey: action.payload.pubkey
      });
    }
    default: {
      return state;
    }
  }
}
