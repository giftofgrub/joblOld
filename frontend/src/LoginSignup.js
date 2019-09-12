import React, { Component } from "react";
import JoblyApi from "./JoblyApi.js";
import Alert from "./Alert.js";

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "login",
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleView() {
    this.state.activeView === "login" ? this.setState({ activeView: "signup"}) : this.setState({ activeView: "login"});
  }

  async handleSubmit(e) {
    e.preventDefault();
    let data;

    if (this.state.activeView === "signup") {
      data = {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name || null,
        last_name: this.state.last_name || null,
        email: this.state.email || null
      };
    } else if (this.state.activeView === "login") {
      data = {
        username: this.state.username,
        password: this.state.password
      }
    }
    

    let token;
    
    try {
      this.state.activeView === "login" ? token =  await JoblyApi.login(data) : token = await JoblyApi.register(data);
    } catch (errors) {
      return this.setState({ errors });
    }
    localStorage.setItem("jobly-token", token);
    await this.props.getCurrentUser();
    this.props.history.push("/jobs");
  }

  render() {
    var loginView = this.state.activeView === "login";
    var signupFields = (
      <div>
        <div className="form-group">
          <label>First Name</label>
          <input 
            name="first_name"
            className="form-control"
            value={this.state.first_name}
            onChange={this.handleChange}
          >
          </input>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input 
            name="last_name"
            className="form-control"
            value={this.state.last_name}
            onChange={this.handleChange}
          >
          </input>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
          >
          </input>
        </div>
      </div>
    );
    return (
      <div className="LoginSignup">
        <div className="container col-6">
          <div className="d-flex">
            <div className="btn-group w-100">
              <button 
                className={`w-50 btn ${ loginView ? "active btn-primary" : "btn-secondary" }`}
                onClick={this.toggleView}
              >
                Login
              </button>
              <button 
                className={`w-50 btn ${ loginView ? "btn-secondary" : "active btn-primary" }`} 
                onClick={this.toggleView}
              >
                Signup
              </button>
            </div>
          </div>
          <form 
            className="card card-body" 
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <label>Username</label>
              <input 
                name="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleChange}
              >
              </input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                name="password"
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
              >
              </input>
            </div>
            {loginView ? "" : signupFields}
            {this.state.errors.length ? <Alert type="danger" messages={this.state.errors}/>: null}
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>

      </div>
      
    );
  }



}

export default LoginSignup;