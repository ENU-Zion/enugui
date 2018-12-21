import { find, forEach, partition } from 'lodash';

import * as types from './types';
import { getAccount } from './accounts';
import { setSettings } from './settings';
import { decrypt, encrypt, setWalletMode } from './wallet';

import ENUAccount from '../utils/ENU/Account';
import enu from './helpers/enu';

const ecc = require('enujs-ecc');
const CryptoJS = require('crypto-js');

export function importWallet(
  chainId,
  account,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot',
  publicKey = undefined,
  path = undefined,
) {
  return (dispatch: () => void, getState) => {
    const { accounts, settings } = getState();
    const data = (key && password) ? encrypt(key, password) : undefined;
    const accountData = accounts[account];
    let pubkey = (key) ? ecc.privateToPublic(key) : publicKey;
    if (!pubkey && accountData) {
      const auths = new ENUAccount(accountData).getKeysForAuthorization(authorization);
      if (auths.length > 0) {
        ([{ pubkey }] = auths);
      }
    }
    // Detect if the current account/authorization is being reimported/replaced, and set mode
    if (
      settings.account === account
      && settings.authorization === authorization
    ) {
      dispatch(setSettings(Object.assign({}, settings, {
        walletMode: mode
      })));
    }
    dispatch({
      type: types.SYSTEM_BLOCKCHAINS_ENSURE,
      payload: {
        chainId,
        node: settings.node,
      }
    });
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account,
        accountData,
        authorization,
        chainId,
        data,
        mode,
        path,
        pubkey
      }
    });
  };
}

export function importWallets(
  chainId,
  accounts,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot'
) {
  return (dispatch: () => void) =>
    forEach(accounts, (account) =>
      dispatch(importWallet(chainId, account, authorization, key, password, mode)));
}

export function removeWallet(chainId, account, authorization) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.REMOVE_WALLET,
      payload: {
        account,
        authorization,
        chainId,
      }
    });
  };
}

export function useWallet(chainId, account, authorization) {
  return (dispatch: () => void, getState) => {
    const { wallet, wallets } = getState();
    // Find the wallet by account name + authorization
    const newWallet = find(wallets, { account, authorization, chainId });
    // Lock the wallet to remove old account keys
    dispatch({
      type: types.WALLET_LOCK
    });
    // Set the wallet mode configuration
    dispatch(setWalletMode(newWallet.mode));
    // Update the settings for the current account
    dispatch(setSettings({
      account,
      authorization
    }));
    if (newWallet.mode !== 'cold') {
      // Update the account in local state
      dispatch(getAccount(account));
    }
    if (newWallet.account !== wallet.account || newWallet.authorization !== wallet.authorization) {
      // Set the active wallet to remember the last used
      return dispatch({
        type: types.SET_CURRENT_WALLET,
        payload: newWallet
      });
    }
  };
}

// Upgrades a legacy hot wallet to the newest version
export function upgradeWallet(account, authorization, password = false, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const [current] = partition(wallets, {
      account,
      authorization
    });
    if (current.length > 0) {
      enu(connection).getAccount(account).then((accountData) => {
        const wallet = current[0];
        const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
        const pubkey = (key) ? ecc.privateToPublic(key) : undefined;
        const derived = new ENUAccount(accountData).getAuthorization(pubkey);
        const [, auth] = derived.split('@');
        dispatch({
          type: types.UPGRADE_WALLET,
          payload: {
            account,
            accountData,
            authorization: auth,
            chainId: connection.chainId,
            oldAuthorization: wallet.authorization,
            pubkey,
          }
        });
        if (swap === true) {
          dispatch(useWallet(current.chainId, account, auth));
        }
        return false;
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
    }
  };
}

// Upgrades a legacy watch wallet (with no authorization) to a watch wallet with set authorization
export function upgradeWatchWallet(account, authorization, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const [current] = partition(wallets, {
      account,
      authorization: false,
      chainId: connection.chainId,
      mode: 'watch'
    });
    if (current.length > 0) {
      enu(connection).getAccount(account).then((accountData) => {
        const model = new ENUAccount(accountData);
        const keys = model.getKeysForAuthorization(authorization);
        if (keys.length > 0) {
          const { pubkey } = keys[0];
          dispatch({
            type: types.UPGRADE_WALLET,
            payload: {
              account,
              accountData,
              authorization,
              chainId: connection.chainId,
              oldAuthorization: false,
              pubkey,
            }
          });
          if (swap === true) {
            dispatch(useWallet(current.chainId, account, authorization));
          }
        }
        return false;
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
    }
  };
}

export default {
  importWallet,
  importWallets,
  upgradeWallet,
  upgradeWatchWallet,
  useWallet,
  removeWallet,
};
