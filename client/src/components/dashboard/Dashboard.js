import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.deleteAccountHandler = this.deleteAccountHandler.bind(this);
  }
  deleteAccountHandler(e) {
    this.props.deleteAccount();
  }
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              welcome{" "}
              <Link to={`/profile/${profile.handle}`}>
                <strong>{user.name}</strong>
              </Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            {/* TODO exp & edu */}
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.deleteAccountHandler}
                className="btn btn-danger"
              >
                Delete account
              </button>
            </div>
          </div>
        );
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
        <div className="container bg-transparent ">
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
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
