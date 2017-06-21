import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessionActions from "../actions/sessionActions";
import spacing from "material-ui/styles/spacing";
import transitions from "material-ui/styles/transitions";
import typography from "material-ui/styles/typography";
import { grey400 } from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import OrderList from "./OrderList";
import OrderForm from "./OrderForm";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      orderCount: 0,
      zDepth: 3
    };
  }
  componentWillMount() {
    axios
      .get(`http://localhost:8080/api/orders/weekly/count`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => res.data.orders)
      .then(res => this.setState({ orderCount: res }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orders !== nextProps.orders) {
      axios
        .get(`http://localhost:8080/api/orders/weekly/count`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => res.data.orders)
        .then(res => this.setState({ orderCount: res }));
    }
  }

  handleMouseEnterOnSector(sector) {
    this.setState({ expandedSector: sector });
  }
  getStyles() {
    //const desktopGutter = spacing.desktopGutter;
    const desktopKeylineIncrement = spacing.desktopKeylineIncrement;
    const styles = {
      widgetSmall: {
        transition: transitions.easeOut(),
        //margin: `0 auto ${desktopGutter}px auto`,
        float: "left",
        width: "calc(33% - 20px)",
        margin: 10
      },
      widgetMedium: {
        transition: transitions.easeOut(),
        //margin: `0 auto ${desktopGutter}px auto`,
        float: "left",
        width: "calc(66% - 20px)",
        margin: 10
      },
      widgetLarge: {
        transition: transitions.easeOut(),
        //margin: `0 auto ${desktopGutter}px auto`,
        float: "left",
        width: 'calc(100% - 40px)',
        margin: 10
      },
      heading: {
        border: "1px solid #999",
        fontSize: 20,
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
        backgroundColor: grey400,
        textAlign: "center",
        margin: 0,
        padding: 0,
        lineHeight: `${desktopKeylineIncrement}px`
      },
      rootWhenLastChild: {
        marginBottom: 0
      },
      rootWhenMediumAndLastChild: {
        marginRight: 0,
        marginBottom: 0
      },
      rootWhenMediumAndFirstChild: {
        marginLeft: 0
      },
      content: {
        height: "100%",
        border: "1px solid #999",
        padding: 10
      }
    };
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const goalMinusOrderTotal = this.props.user.goal - this.state.orderCount;
    const data = {
      labels: ["Orders", "# to Goal"],
      datasets: [
        {
          data: [
            this.state.orderCount,
            goalMinusOrderTotal > 0 ? goalMinusOrderTotal : 0
          ],
          backgroundColor: [(goalMinusOrderTotal > 0)?"#36A2EB": "#00ab00", "#999"],
          hoverBackgroundColor: [(goalMinusOrderTotal > 0)?"#36A2EB": "#00ab00", "#999"]
        }
      ]
    };
    return (
      <div>
        <Paper
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={styles.widgetMedium}
        >
          <h3 style={styles.heading}>Add Order</h3>
          <div style={styles.content}>
            <OrderForm />
          </div>
        </Paper>
        <Paper
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={styles.widgetSmall}
        >
          <h3 style={styles.heading}>This Weeks Goal</h3>
          <div style={styles.content}>
            <Doughnut data={data} />
            <div>Your goal this week is {this.props.user.goal}</div>
            <div>You currently have {this.state.orderCount} orders</div>
          </div>
        </Paper>
        <Paper
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={styles.widgetLarge}
        >
          <h3 style={styles.heading}>Orders</h3>
          <div style={styles.content}>
            <OrderList />
          </div>
        </Paper>
      </div>
    );
  }
}

const { object, bool } = PropTypes;

Dashboard.propTypes = {
  actions: object.isRequired,
  user: object.isRequired,
  authenticated: bool.isRequired,
  orders: object.isRequired
};

const mapState = state => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  orders: state.orders
});

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(Dashboard);
