import createElectronStorage from 'redux-persist-electron-storage';

const persistConfig = {
  key: 'enu-voter-config',
  storage: createElectronStorage(),
  whitelist: [
    'settings',
    'wallet'
  ]
};

export default persistConfig;
