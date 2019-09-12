import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.searchTerm);
  }

  render() {
    return(
      <div className="Search">
        <form className="form-inline w-100" onSubmit={this.handleSubmit}>
          <input 
            className="form-control flex-grow-1"
            name="search"
            placeholder="Search here..."
            value={this.state.searchTerm}
            onChange={this.handleChange}
          ></input>
          <button type="submit" className="btn btn-primary btn-lg">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
