import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import { withRouter } from "react-router-dom";
import * as sessionActions from "../actions/sessionActions";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const styles = {
  drawerHeader: {
    backgroundColor: "rgb(13, 71, 161)",
    minHeight: 100,
    color: "white",
    fontSize: 26
  }
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  Logged() {
    const { actions: { logout }, history } = this.props;
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem primaryText="Refresh" onClick={() => location.reload()} />
        <MenuItem primaryText="Sign out" onClick={() => logout(history)} />
      </IconMenu>
    );
  }

  Login() {
    return <FlatButton label="Login" />;
  }

  render() {
    const { authenticated, history } = this.props;
    return (
      <div>
        <AppBar
          title="D2D Dashboard"
          onLeftIconButtonTouchTap={() => this.toggleDrawer()}
          iconElementRight={authenticated ? this.Logged() : this.Login()}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div style={styles.drawerHeader}>D2D Dashboard</div>
          <MenuItem
            onTouchTap={() => {
              history.push("/dashboard");
              this.setState({ open: false });
            }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onTouchTap={() => {
              history.push("/orders");
              this.setState({ open: false });
            }}
          >
            Orders
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

const { object, bool } = PropTypes;

Home.propTypes = {
  actions: object.isRequired,
  user: object.isRequired,
  authenticated: bool.isRequired
};

const mapState = state => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default withRouter(connect(mapState, mapDispatch)(Home));
