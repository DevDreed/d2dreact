import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../actions/sessionActions';

const Dashboard = ({ actions: { logout }, user, authenticated }) => (
  <div>
    <h3>Welcome {user.email}</h3>
    <h5>{authenticated ? 'You are authenticated :)' : 'Error'}</h5>
    {
      withRouter(({ history }) => (
        <button
          onClick={() => logout(history)}
        >
          LOGOUT
        </button>
      ))()
    }
  </div>
);

const { object, bool } = PropTypes;

Dashboard.propTypes = {
  actions: object.isRequired,
  user: object.isRequired,
  authenticated: bool.isRequired,
  orders: object.isRequired
};

const mapState = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  orders: state.orders
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(Dashboard);