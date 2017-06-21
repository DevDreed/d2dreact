import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../actions/orderActions";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const style = {
  margin: 0,
  textAlign: "center",
  display: "inline-block",
  padding: 20
};

class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: "300px"
    };
  }
  componentDidMount() {
    const { getOrders } = this.props.actions;
    getOrders();
  }

  deleteOrder(cuid) {
    const { getOrders } = this.props.actions;
    axios
      .delete(`http://localhost:8080/api/orders/${cuid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
      .then(() => getOrders())
      .catch(err => console.log(err));
  }
  render() {
    const { orders } = this.props;
    if (orders === undefined || Object.keys(orders.data).length === 0)
      return null;
    return (
      <div>
        <div className="content">
          <div className="list-center">
            <div style={style}>
              <Table
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
              >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan="3"
                      tooltip="This Weeks Orders"
                      style={{ textAlign: "center" }}
                    >
                      This Weeks Orders
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn tooltip="Order #">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Name">
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                >
                  {orders.data.map((row, index) =>
                    <TableRow key={index}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>
                        <Link to={`/orders/${row.cuid}`}>
                          <span>{row.firstName} {row.lastName}</span>
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn>
                        <button
                          onClick={() => this.deleteOrder(row.cuid)}
                          type="button"
                        >
                          x
                        </button>
                      </TableRowColumn>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
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

const mapState = state => ({
  orders: state.orders.toJS()
});

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(OrderList);
