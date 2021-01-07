import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addExperience } from "../../actions/profileActions";
import PropTypes from "prop-types";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
  }
  onCheckHandler(event) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  onChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const expData = {
      company: this.state.company,
      location: this.state.location,
      title: this.state.title,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="./dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add experience</h1>
              <p className="lead text-center">
                {" "}
                Add any current or passed job or position
              </p>
              <small className="pb-3 d-block">* = is Required</small>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="* company"
                  type="text"
                  value={this.state.company}
                  name="company"
                  onChange={this.onChangeHandler}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="title"
                  type="text"
                  value={this.state.title}
                  name="title"
                  onChange={this.onChangeHandler}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="location"
                  type="text"
                  value={this.state.location}
                  name="location"
                  onChange={this.onChangeHandler}
                  error={errors.location}
                />
                <h6>from date</h6>
                <TextFieldGroup
                  placeholder="from"
                  type="date"
                  value={this.state.from}
                  name="from"
                  onChange={this.onChangeHandler}
                  error={errors.from}
                />
                <h6>to date</h6>
                <TextFieldGroup
                  placeholder="to date"
                  type="date"
                  value={this.state.to}
                  name="to"
                  onChange={this.onChangeHandler}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                  error={errors.description}
                  info="Tell us about the the position"
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheckHandler}
                    id="current"
                  />
                  <label htmlFor="current" className=" mx-2 form-check-label">
                    current job
                  </label>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-lg btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// AddExperience.proptypes = {
//   addExperience: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
