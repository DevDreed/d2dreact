// This component handles the App template used on every page.
import 'material-design-icons';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import Dashboard from './Dashboard';

const App = ({ authenticated, checked }) => (
  <Router>
    { checked &&
      <div>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute exact path="/orders" component={OrderList} authenticated={authenticated}/>
        <PrivateRoute exact path="/orders/:cuid" component={OrderForm} authenticated={authenticated}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard} authenticated={authenticated}/>
      </div>
    }
  </Router>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);
