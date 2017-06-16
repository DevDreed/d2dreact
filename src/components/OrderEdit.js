import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as orderActions from '../actions/orderActions';

class OrderForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { order: {} };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/api/orders/${this.props.match.params.cuid}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    })
      .then(res => res.data.order)
      .then(order => {
        this.setState({ order });
      })
      .catch(err => console.log(err));
  }

  onSubmit() {
    let order = {};
    order.content = this.state.order.content;
    order.cuid = this.props.match.params.cuid;
    const { updateOrder } = this.props.actions;
    updateOrder(order);
  }

  handleChange(event) {
    this.setState({ order: { content: event.target.value } });
  }

  render() {
    const submitButton = () => (
      <button
        onClick={() => this.onSubmit(history)}
        type="submit">Submit
      </button>
    );
    return (
      <div>
        <h3>Update Order</h3>
          <input
            type="text"
            className="form-control"
            value={this.state.order.content}
            onChange={this.handleChange}
          />
        { submitButton() }
      </div>
    );
  }
}

const { object } = PropTypes;

OrderForm.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
};

export default connect(null, mapDispatch)(OrderForm);
