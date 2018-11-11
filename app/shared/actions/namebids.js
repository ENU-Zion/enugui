import { findIndex } from 'lodash';

import * as types from './types';
import enu from './helpers/enu';
import { setSetting } from './settings';

export function getBidForName(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_NAMEBID_PENDING
    });
    const { connection, settings } = getState();

    const query = {
      code: 'enumivo',
      json: true,
      limit: 1,
      lower_bound: name,
      scope: 'enumivo',
      table: 'namebids'
    };

    enu(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const namebid = rows[0];

      const recentBids = (settings.recentBids && settings.recentBids) || {};

      const bidIndex = findIndex(recentBids[settings.account] || [], { newname: namebid.newname });

      if (bidIndex > -1) {
        recentBids[settings.account][bidIndex] =
          {
            newname: namebid.newname,
            bid: recentBids[settings.account][bidIndex].bid,
            highestBid: `${namebid.high_bid / 10000} ENU`
          };

        dispatch(setSetting('recentBids', recentBids));
      }

      return dispatch({
        type: types.SYSTEM_NAMEBID_SUCCESS,
        payload: {
          namebid
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_NAMEBID_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getBidForName
};
