import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-success">
                Create your profile
              </h1>
              <p className="lead text-center">
                {" "}
                Let's make your profile stand out{" "}
              </p>
              <small className="d-block pb-3 text-danger">
                * = are required
              </small>
              <form action="">
                <TextAreaFieldGroup />
                <TextFieldGroup />
                <SelectListGroup options={["lol", "sas"]} />
                <InputGroup />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.PropTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps)(CreateProfile);
