import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = [
  {
    "_id": "enu-mainnet",
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "keyPrefix": "ENU",
    "name": "ENU",
    "node": "https://api.enumivo.org",
    "supportedContracts": [
      "customtokens",
      "producerinfo",
      "regproxyinfo"
    ],
    "symbol": "ENU",
    "testnet": false
  }
];

export default function blockchains(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SYSTEM_BLOCKCHAINS_ENSURE: {
      const [existing, others] = partition(state, {
        chainId: action.payload.chainId,
      });
      // If this blockchain doesn't exist in state, add it as an unknown entry that can be edited later
      if (!existing.length) {
        return [{
          _id: `unknown-${action.payload.chainId}`,
          chainId: action.payload.chainId,
          keyPrefix: 'ENU',
          name: `Unknown (${action.payload.chainId.substr(0, 5)})`,
          node: action.payload.node,
          supportedContracts: [],
          symbol: 'ENU',
          testnet: false
        }, ...others];
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
