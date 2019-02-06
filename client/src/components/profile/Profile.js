import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6 float-left">
              <Link to="/profiles" className="btn btn-light mb-3">
                Go back
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propsTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
