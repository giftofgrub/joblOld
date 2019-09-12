import React, {Component} from "react";
import JoblyApi from "./JoblyApi.js";
import JobCard from "./JobCard.js";
import Search from "./Search.js";
import AppContext from "./AppContext.js";

class Jobs extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      jobs: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  } 

  async handleSearch(searchTerm) {
    let jobs = await JoblyApi.getJobs(searchTerm);
    this.setState({ jobs });
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs });
  }



  render() {
    return (
      <div className="Jobs mx-5">
        <Search search={this.handleSearch}></Search>
        <div className="job-cards-area d-flex flex-wrap">
          {this.state.jobs ? this.state.jobs.map((job) => (
            <AppContext.Consumer>
              { currentUser => (
              <JobCard job={job} applied={currentUser.jobs.map( (job) => (job.id) ).includes(job.id)} getCurrentUser={this.props.getCurrentUser}></JobCard>
              )}
            </AppContext.Consumer>
            )) : <h6>Loading...</h6>}
          {this.state.jobs.length ? "" : <p>no results found...</p>}
        </div>
      </div>
    );
  }
}

export default Jobs;