import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../actions/orderActions';
import OrderForm from './OrderForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrderList extends Component {

  componentDidMount() {
    const { getOrders } = this.props.actions;
    getOrders();
  }

  deleteOrder(cuid) {
    const { getOrders } = this.props.actions;
    axios.delete(`http://localhost:8080/api/orders/${cuid}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    })
      .then(() => getOrders())
      .catch(err => console.log(err));
  }
  render() {
    const { orders } = this.props;
    if (orders === undefined || Object.keys(orders.data).length === 0) return null;
    return (
      <div>
        <h3>ORDERS</h3>
          <OrderForm />
          <div className="content">
            <div className="list-center">
              <ul>
                {orders.data.map(
                  order =>
                  <li key={order._id}><Link to={`/orders/${order.cuid}`}><span>{order.firstName} {order.lastName}</span></Link>
                    <button
                      onClick={() => this.deleteOrder(order.cuid)}
                      type="button">x
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
      </div>
    );
  }
}

const { object, shape } = PropTypes;

OrderList.propTypes = {
  actions: object.isRequired,
  orders: shape({}).isRequired
};

const mapState = (state) => ({
  orders: state.orders.toJS(),
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(OrderList);
