import React, {Component} from "react";
import JoblyApi from "./JoblyApi.js";
import JobCard from "./JobCard.js";
import AppContext from "./AppContext.js";


class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null
    }
  }

  async componentDidMount() {
    const { handle } = this.props.match.params;
    const company = await JoblyApi.getCompany(handle);

    this.setState({ company });
  }

  render() {
    if (!this.state.company) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Company">
        <h3>{this.state.company.name}</h3>
        <p>{this.state.company.description}</p>
        <div className="company-jobs mx-2">
          <small>Open Positions</small>
          <div className="job-card-area d-flex flex-wrap">
            {this.state.company.jobs.map( (job) => 
            <AppContext.Consumer>
              { currentUser => (
              <JobCard job={job} applied={currentUser.jobs.map( (job) => (job.id) ).includes(job.id)} getCurrentUser={this.props.getCurrentUser}></JobCard>
              )}
            </AppContext.Consumer>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Company;