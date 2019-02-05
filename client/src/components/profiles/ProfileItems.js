import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validations/isEmpty";

class ProfileItems extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className=" card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className=" rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItems;
