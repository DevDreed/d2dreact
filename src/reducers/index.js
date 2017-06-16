import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import ordersReducer from './orders-reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  orders: ordersReducer
});

export default rootReducer;
