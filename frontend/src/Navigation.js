import React, { Component } from "react";
import AppContext from "./AppContext.js"
import { Link, NavLink } from "react-router-dom";
import "./Navigation.scss"

class Navigation extends Component {
  
  currentUserNav() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/companies">
            Companies
          </Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/" onClick={this.props.logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  noUserNav() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item mr-2">
          <Link to="/login">
            Login/Signup
          </Link>
        </li>
      </ul>
    );
  }
  
  render() {
    return (
      <nav className="Navigation navbar navbar-expand-md">
        <NavLink className="navbar-brand" to="/">
          Jobly
        </NavLink>
      
        <AppContext.Consumer>
          {currentUser => (
            <div className="navbar-nav ml-auto">  
              {currentUser ? this.currentUserNav() : this.noUserNav()}
            </div>
          )}
        </AppContext.Consumer>
      </nav>
    );
  }
}

export default Navigation;