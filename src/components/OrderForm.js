import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../actions/orderActions";
import MuiGeoSuggest from "material-ui-geosuggest";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class OrderForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        location: { coordinates: [] }
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { saveOrder } = this.props.actions;
    saveOrder(this.state.order);
  }

  setAddressFields(place) {
    let streetNumber,
      route,
      locality,
      administrative_area_level_1,
      postal_code = "";
    let location = {};

    place.address_components.map(ac => {
      if (ac.types.includes("street_number")) {
        streetNumber = ac.short_name;
      }
      if (ac.types.includes("route")) {
        route = ac.short_name;
      }
      if (ac.types.includes("locality")) {
        locality = ac.short_name;
      }
      if (ac.types.includes("administrative_area_level_1")) {
        administrative_area_level_1 = ac.short_name;
      }
      if (ac.types.includes("postal_code")) {
        postal_code = ac.short_name;
      }
    });
    this.setState(state => (state.order.address1 = `${streetNumber} ${route}`));
    this.setState(state => (state.order.city = `${locality}`));
    this.setState(state => (state.order.state = `${administrative_area_level_1}`));
    this.setState(state => (state.order.zipcode = `${postal_code}`));

    location = place.geometry.location;
    if (location) {
      this.setState(state => (state.order.location.coordinates = [location.lng(), location.lat()]));
    }
  }

  handleChange(event, newValue) {
    event.persist();
    this.setState(state => (state.order[event.target.name] = newValue));
  }

  render() {
    return (
      <div>
        <h3>Add Order</h3>
        <TextField
          hintText="First Name"
          floatingLabelText="First Name"
          type="text"
          name="firstName"
          value={this.state.order.firstName}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="Last Name"
          floatingLabelText="Last Name"
          type="text"
          name="lastName"
          value={this.state.order.lastName}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="Phone"
          floatingLabelText="Phone"
          type="tel"
          name="phone"
          value={this.state.order.phone}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          type="text"
          name="email"
          value={this.state.order.email}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <MuiGeoSuggest
          options={{
            types: ["geocode"],
            componentRestrictions: { country: "us" }
          }}
          onPlaceChange={place => this.setAddressFields(place)}
          style={{ width: "100%" }}
        />
        <br />
        <TextField
          hintText="Street Address"
          floatingLabelText="Address"
          type="text"
          name="address1"
          value={this.state.order.address1}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          type="text"
          name="address2"
          value={this.state.order.address2}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="City"
          floatingLabelText="City"
          type="text"
          name="city"
          value={this.state.order.city}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="State"
          floatingLabelText="State"
          type="text"
          name="state"
          value={this.state.order.state}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <TextField
          hintText="Zipcode"
          floatingLabelText="Zipcode"
          type="text"
          name="zipcode"
          value={this.state.order.zipcode}
          onChange={this.handleChange}
          errorText="This field is required"
        />
        <br />
        <RaisedButton
          onClick={() => this.onSubmit(history)}
          type="submit"
          label="Submit"
          primary={true}
        />
      </div>
    );
  }
}

const { object } = PropTypes;

OrderForm.propTypes = {
  actions: object.isRequired
};

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
};

export default connect(null, mapDispatch)(OrderForm);
