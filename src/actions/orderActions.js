import axios from 'axios';
import { REQUEST_ORDERS, FAIL_ORDERS, RECEIVE_ORDERS } from '../constants';

function requestData() {
  return {
    type: REQUEST_ORDERS,
  };
}

function failData(err) {
  return {
    type: FAIL_ORDERS,
    data: err,
  };
}

function receiveData(data) {
  return {
    type: RECEIVE_ORDERS,
    data,
  };
}

export const getOrders = () => {
  return (dispatch) => {
    dispatch(requestData());
    return axios.get(`http://localhost:8080/api/orders`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    }).then(res => res.data.orders)
      .then(res => {
        console.log(res); dispatch(receiveData(res));
      })
      .catch(err => dispatch(failData(err)));
  };
};

export const getWeeklyOrderCountByUser = () => {
  return (dispatch) => {
    dispatch(requestData());
    return axios.get(`http://localhost:8080/api/orders/weekly/count`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    }).then(res => res.data.orders)
      .then(res => {
        console.log(res); dispatch(receiveData(res));
      })
      .catch(err => dispatch(failData(err)));
  };
};

export const saveOrder = (order) => {
  return (dispatch) => {
    dispatch(requestData());
    return axios.post(`http://localhost:8080/api/orders`, { order: order },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => dispatch(getOrders()))
      .catch(err => dispatch(failData(err)));
  };
};

export const updateOrder = (order) => {
  return (dispatch) => {
    dispatch(requestData());
    return axios.put(`http://localhost:8080/api/orders/${order.cuid}`, {
      order
    },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => dispatch(getOrders()))
      .catch(err => dispatch(failData(err)));
  };
};

