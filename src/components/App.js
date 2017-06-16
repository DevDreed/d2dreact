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
import OrderEdit from './OrderEdit';
import AppBar from 'material-ui/AppBar';

const App = ({ authenticated, checked }) => (
  <Router>
    { checked &&
      <div>
        <AppBar
          title="D2D Dashboard"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <PrivateRoute exact path="/" component={Home} authenticated={authenticated}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute exact path="/orders" component={OrderList} authenticated={authenticated}/>
        <PrivateRoute exact path="/orders/:cuid" component={OrderEdit} authenticated={authenticated}/>
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
