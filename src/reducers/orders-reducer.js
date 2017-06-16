import Immutable from 'immutable';
import { REQUEST_ORDERS, RECEIVE_ORDERS, FAIL_ORDERS } from '../constants';

const initialState = Immutable.Map({
  isLoading: false,
  data: Immutable.Map(),
  error: '',
});

function fetchedORDERS(state = initialState, action) {
  switch (action.type) {
    case (REQUEST_ORDERS):
      return state.set('isLoading', true);
    case (FAIL_ORDERS):
      return Immutable.fromJS({
        isLoading: false,
        error: action.data,
        data: {},
      });
    case (RECEIVE_ORDERS):
      return Immutable.fromJS({
        isLoading: false,
        data: action.data,
        error: '',
      });
    default:
      return state;
  }
}

export default fetchedORDERS;
