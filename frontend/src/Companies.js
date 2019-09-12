import React, {Component} from "react";
import JoblyApi from "./JoblyApi.js";
import CompanyCard from "./CompanyCard.js";
import Search from "./Search.js";

class Companies extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      companies: []
    }

    this.handleSearch = this.handleSearch.bind(this);
  } 

  async handleSearch(searchTerm) {
    let companies = await JoblyApi.getCompanies(searchTerm);
    this.setState({ companies });
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({ companies });
  }

  render() {
    return (
      <div className="Companies mx-5">
        <Search search={this.handleSearch}></Search>
        {this.state.companies.map((company) => (<CompanyCard company={company}></CompanyCard>))}
        {this.state.companies.length ? "" : <p>no results found...</p>}
      </div>
    );
  }
}

export default Companies;