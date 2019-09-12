import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.js";
import Companies from "./Companies.js";
import Company from "./Company.js";
import Jobs from "./Jobs.js";
import LoginSignup from "./LoginSignup.js";
import Profile from "./Profile.js";
import ProtectedRoute from "./ProtectedRoute.js";

class Routes extends Component {
    render() {
        return (
            <div className="Routes">
              <Switch>
                  <Route 
                    exact 
                    path="/"
                    render={() => <Home></Home>}
                  />

                  <ProtectedRoute 
                    exact
                    path="/companies"
                    render={(props) => <Companies {...props} getCurrentUser={this.props.getCurrentUser}></Companies>}
                  />

                  <ProtectedRoute 
                    exact
                    path="/jobs"
                    render={(props) => <Jobs {...props} getCurrentUser={this.props.getCurrentUser}></Jobs>}
                  />

                  <Route 
                    exact
                    path="/login"
                    render={(props) => <LoginSignup {...props} getCurrentUser={this.props.getCurrentUser}></LoginSignup>}
                  />

                  <ProtectedRoute 
                    exact
                    path="/profile"
                    render={(props) => <Profile {...props}/>}
                  />

                  <ProtectedRoute 
                    path="/companies/:handle"
                    render={props => <Company {...props} getCurrentUser={this.props.getCurrentUser}/>}
                  />

              </Switch>
            </div>
        );
    }

}

export default Routes;