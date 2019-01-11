import {
  SYSTEM_WITHDRAW_PENDING,
  SYSTEM_WITHDRAW_SUCCESS,
  SYSTEM_WITHDRAW_FAILURE
} from "./types";

import ENUContract from "../utils/ENU/Contract";
import enu from "./helpers/enu";
import { getCurrencyBalance } from "./accounts";

export function withdraw(from, to, quantity, storeName) {
  return (dispatch: () => void, getState) => {
    const {
      connection: { supportedContracts }
    } = getState();

    if (!supportedContracts || !supportedContracts.includes("withdraw")) {
      dispatch({ type: SYSTEM_WITHDRAW_FAILURE });
    }

    dispatch({ type: SYSTEM_WITHDRAW_PENDING });

    const { connection } = getState();
    

    enu(connection, true).getAbi(storeName)
      .then((c) => {
        const contract = new ENUContract(c.abi, c.account_name);
        enu(connection, true)
          .contract(contract.account)
          .then(({ withdraw }) => {
            withdraw(
              { from, bts_to: to, quantity },
              {
                broadcast: true,
                sign: connection.sign
              }
            )
              .then(tx => {
                dispatch(getCurrencyBalance(from));
                return dispatch({
                  payload: { tx, connection },
                  type: SYSTEM_WITHDRAW_SUCCESS
                });
              })
              .catch(err => {
                dispatch({
                  payload: { err },
                  type: SYSTEM_WITHDRAW_FAILURE
                });
              });
          })
          .catch(err => {
            dispatch({
              payload: { err },
              type: SYSTEM_WITHDRAW_FAILURE
            });
          });
      }).catch(err => {
        dispatch({
          payload: { err },
          type: SYSTEM_WITHDRAW_FAILURE
        });
      });
  };
}

export default { withdraw };
