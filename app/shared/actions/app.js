import * as types from './types';
import enu from './helpers/enu';

export function downloadProgress(progress) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.APP_UPDATE_DOWNLOAD_PROGRESS,
      payload: progress
    });
  };
}

export function initApp() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.APP_INIT
    });
  };
}

export default {
  downloadProgress,
  getConstants,
  initApp
};
