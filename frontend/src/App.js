import React, { Component } from "react";
import JoblyApi from "./JoblyApi.js";
import Navigation from "./Navigation.js"
import Routes from "./Routes.js"
import AppContext from "./AppContext.js";
import { BrowserRouter } from "react-router-dom";
import { decode } from "jsonwebtoken"
import "./App.scss";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userInfoLoaded: false
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    const token = localStorage.getItem("jobly-token");

    try {
      let decodedUser = decode(token);
      let currentUser = await JoblyApi.getCurrentUser(decodedUser.username);
      this.setState({ currentUser, userInfoLoaded: true });
    } catch (error) {
      this.setState({ currentUser: null, userInfoLoaded: true});
    }
  }

  handleLogout() {
    localStorage.removeItem("jobly-token");
    this.setState({ currentUser: null });
  }

  render(){
    
    return (
      <div className="App">
        <AppContext.Provider value={this.state.currentUser}>
          <BrowserRouter>
            <Navigation logout={this.handleLogout}/>
            <Routes getCurrentUser={this.getCurrentUser}/>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
    );
  }
}


export default App;
