import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext.js";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className="Home">

        <div className="container text-center landing-header">
          <h1 className="mb-4 font-weight-bold">
            Jobly
          </h1>
          <p>A job for you, a job for you, a job for everyone!</p>
          <AppContext.Consumer>
            {currentUser => (
             <div>
               { currentUser ? <Link className="btn btn-primary" to="/companies">Start Looking at Companies</Link> : <Link className="btn btn-primary" to="/login">Login</Link>}
             </div>
              
            )}
          </AppContext.Consumer>
        </div>

        <ul class="slideshow">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>


      </div>
    );
  }
}

export default Home;
