import { decrypt } from '../wallet';

const CryptoJS = require('crypto-js');
const ecc = require('enujs-ecc');
const Enu = require('enujs');

export default function enu(connection, signing = false) {
  const decrypted = Object.assign({}, connection);
  if (signing && decrypted.keyProviderObfuscated) {
    const {
      hash,
      key
    } = decrypted.keyProviderObfuscated;
    if (hash && key) {
      const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(wif) === true) {
        decrypted.keyProvider = [wif];
      }
    }
  }
  return Enu(decrypted);
}
