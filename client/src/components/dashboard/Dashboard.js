import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check is current profile is empty
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4> TODO: DISPLAY PROFILE</h4>;
      } else {
        //user is logged in but has no profile or has deleted it
        dashboardContent = (
          <div className="">
            <p className="lead text-muted">
              welcome <strong>{user.name}</strong>
            </p>
            <p>You have not set up a profile yet please add some info</p>
            <p>
              <Link
                to="/create-profile"
                className="btn btn-lg btn-success shadow-lg"
              >
                {" "}
                Create profile
              </Link>
            </p>
          </div>
        );
      }
    }
    return (
      <div className="dashborad">
        <div className="container jumbotron bg-transparent ">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.PropTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
