import React, {Component} from "react";
import { Link } from "react-router-dom";
import defaultLogo from "./default-logo.png";
import "./CompanyCard.scss";

class CompanyCard extends Component {

  render() {
    const { name, handle, description, logo_url } = this.props.company;
    return (
      <Link className="CompanyCard card mb-2"to={`companies/${this.props.company.handle}`}>
        <div className="card-body row">
          <div className="col-4">
            <img src={logo_url || defaultLogo} alt={`${name} logo`}></img>
          </div>
          <div className="col-8">
            <h3>{handle}</h3>
            <p>{description}</p>
          </div>
          
        </div>
      </Link>
    );
  }
}

export default CompanyCard;