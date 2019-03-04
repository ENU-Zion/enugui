import * as types from '../actions/types';


const contractBasedFeatures = [
  'customtokens',
  'producerinfo',
  'regproxyinfo'
];

const initialState = {
  constants: {},
  download: undefined,
  features: contractBasedFeatures
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case types.APP_UPDATE_DOWNLOAD_PROGRESS: {
      return Object.assign({}, state, {
        download: action.payload
      });
    }
    case types.SYSTEM_GETCONSTANTS_SUCCESS: {
      return Object.assign({}, state, {
        constants: action.payload.data
      });
    }
    case types.SYSTEM_GETCONSTANTS_FAILURE: {
      return Object.assign({}, initialState);
    }
    default: {
      return state;
    }
  }
}
