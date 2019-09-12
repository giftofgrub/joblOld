import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import AppContext from "./AppContext";

class ProtectedRoute extends Component {
  static contextType = AppContext;
  //this.context value will be set at runtime equal to the value passed onto it

  render() {
    if ( !this.context || !this.context.username ) {
      return (<Redirect to="/login"/>);
    } else {
      return (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          render={this.props.render}
        />
      );
    }
  }

}

export default ProtectedRoute;
