import React, {Component} from "react";
import JoblyApi from "./JoblyApi.js";
import { Link } from "react-router-dom";
import "./JobCard.scss";


class JobCard extends Component {
  constructor(props) {
    super(props);
    this.apply = this.apply.bind(this);
  }

  async apply() {
    let res = await JoblyApi.applyToJob(this.props.job.id);
    await this.props.getCurrentUser();
    return res.message;
    
  }


  render() {
    const { id, title, salary, equity, company_handle } = this.props.job;
    const applied = this.props.applied;
    return (
      <div className="JobCard card mb-2">
        <div className="card-body">
          <h5>{title}</h5>
          <p>Salary: {salary}</p>
          <p>Equity: {equity}</p>
          {company_handle ? <p>Company: <Link to={`companies/${company_handle}`}>{company_handle}</Link></p> : <p></p>}
          <button disabled={applied} onClick={this.apply}>{ !applied ? "Apply" : "Applied"}</button>
        </div>
      </div>
    );
  }
}

export default JobCard;