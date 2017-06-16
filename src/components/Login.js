import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as sessionActions from "../actions/sessionActions";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  height: 350,
  width: 350,
  margin: 20,
  textAlign: "center",
  display: "inline-block",
  padding: 20
};

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(history) {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    const { login } = this.props.actions;
    login(user, history);
  }

  handleChange(event, newValue) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
        // give react a function to set the state asynchronously.
        // here it's using the "name" value set on the TextField
        // to set state.person.[firstname|lastname].
    this.setState((state) => state[event.target.name] = newValue);

  }

  render() {
    const { history } = this.props;
    return (
      
      <Paper style={style} zDepth={3} rounded={false}>
        <h3>LOGIN</h3>
        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <RaisedButton label="Login" primary={true} onClick={() => this.onSubmit(history)}/>
      </Paper>
    );
  }
}

const { object } = PropTypes;

Login.propTypes = {
  actions: object.isRequired,
  history: object.isRequired
};

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default withRouter(connect(null, mapDispatch)(Login));
