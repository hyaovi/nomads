import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileAction";

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
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChangeHandler(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const {
      handle,
      errors,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      displaySocialInputs
    } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChangeHandler}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChangeHandler}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChangeHandler}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChangeHandler}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChangeHandler}
            error={errors.instagram}
          />
        </div>
      );
    }

    //Select options for status
    const options = [
      { label: "* Select professional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Other", value: "Other" }
    ];

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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Handle"
                  type="text"
                  name="handle"
                  value={handle}
                  info="A unique username for your profile URL. Your full name, company name, or nickname"
                  error={errors.handle}
                  onChange={this.onChangeHandler}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={status}
                  info="Where your are at in your career"
                  error={errors.status}
                  onChange={this.onChangeHandler}
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  type="text"
                  name="company"
                  value={company}
                  info="Could be your own company or the one you work for"
                  error={errors.company}
                  onChange={this.onChangeHandler}
                />
                <TextFieldGroup
                  placeholder="Website"
                  type="text"
                  name="website"
                  value={website}
                  info="Could be your own website or a company one"
                  error={errors.website}
                  onChange={this.onChangeHandler}
                />
                <TextFieldGroup
                  placeholder="Location"
                  type="text"
                  name="location"
                  value={location}
                  info="City or city & state suggested (eg. Boston, MA)"
                  error={errors.location}
                  onChange={this.onChangeHandler}
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  type="text"
                  name="skills"
                  value={skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                  error={errors.skills}
                  onChange={this.onChangeHandler}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  type="text"
                  name="githubusername"
                  value={githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                  error={errors.githubusername}
                  onChange={this.onChangeHandler}
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChangeHandler}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-success px-4 shadow-lg btn-sm"
                  >
                    Add Social networks
                  </button>
                  <span className="text-muted text-small m-2">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-lg btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
