import React, { Component } from "react";
import AppContext from "./AppContext.js";
import JoblyApi from "./JoblyApi.js";
import Alert from "./Alert.js";

const MESSAGE_TIMEOUT = 1000;

class Profile extends Component {
  static contextType = AppContext

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      username: this.context.username || "",
      password: "",
      first_name: this.context.first_name || "",
      last_name: this.context.last_name || "",
      email: this.context.email || "",
      photo_url: this.context.photo_url || "",
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      let username = this.state.username;
      let profileData = {
        first_name : this.state.first_name || undefined,
        last_name : this.state.last_name || undefined,
        email : this.state.email || undefined,
        photo_url : this.state.photo_url || undefined
      };

      if (this.state.password !== "") {
        profileData.password = this.state.password
      };
      
      await JoblyApi.updateProfile(username, profileData);
      this.setState({ 
        errors: [],
        saveConfirmed: true,
        password: ""
       }, () => {
         setTimeout(() => this.setState({saveConfirmed: false}), 
          MESSAGE_TIMEOUT)
       });
    } catch (errors) {
      return this.setState({ errors });
    }
    

  }

  render() {
    return (
      <div className="Profile col-md-6 offset-md-3 text-left">
        <h4>Profile</h4>
        <div className="card">
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{this.state.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="first_name"
                  className="form-control"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="last_name"
                  className="form-control"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input
                  name="photo_url"
                  className="form-control"
                  value={this.state.photo_url}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Update password (leave empty to keep current)</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              {this.state.errors.length ? (
                <Alert type="danger" messages={this.state.errors} />
              ) : null}

              {this.state.saveConfirmed ? (
                <Alert type="success"
                       messages={["User updated successfully."]} />
              ) : null}

              <button 
                className="btn btn-primary"
                onClick={this.handleSubmit}>
                Update my Profile
              </button>
            </div>
          </form>
        </div>
        
      </div>
      
    );
  }



}

export default Profile;