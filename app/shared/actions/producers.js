import * as types from './types';
import sortBy from 'lodash/sortBy';

import enu from './helpers/enu';

export function clearProducerCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_PRODUCER_CACHE
    });
  };
}

export function getProducers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    const { connection } = getState();
    enu(connection).getTableRows({
      json: true,
      code: 'enumivo',
      scope: 'enumivo',
      table: 'producers',
      limit: 1000
    }).then((results) => {
      const relevant = results.rows.map((producer) => Object.assign({}, {
        key: `${producer.owner}-${producer.last_produced_block_time}`,
        last_produced_block_time: producer.last_produced_block_time,
        owner: producer.owner,
        url: producer.url,
        votes: parseInt(producer.total_votes, 10)
      }));
      const list = sortBy(relevant, 'votes').reverse();
      return dispatch({
        type: types.GET_PRODUCERS_SUCCESS,
        payload: {
          list
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_PRODUCERS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getProducers
};
