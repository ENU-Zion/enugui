import createElectronStorage from 'redux-persist-electron-storage';

const persistConfig = {
  key: 'enugui-config',
  storage: createElectronStorage(),
  whitelist: [
    'settings',
    'wallet'
  ]
};

export default persistConfig;
