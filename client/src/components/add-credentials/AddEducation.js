import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";
import PropTypes from "prop-types";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="./dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add eduction</h1>
              <p className="lead text-center">
                {" "}
                Add any degree you have completed so far
              </p>
              <small className="pb-3 d-block">* = is Required</small>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="* School"
                  type="text"
                  value={this.state.school}
                  name="school"
                  onChange={this.onChangeHandler}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* degree"
                  type="text"
                  value={this.state.degree}
                  name="degree"
                  onChange={this.onChangeHandler}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* field of study"
                  type="text"
                  value={this.state.fieldofstudy}
                  name="fieldofstudy"
                  onChange={this.onChangeHandler}
                  error={errors.fieldofstudy}
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
                  placeholder="program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                  error={errors.description}
                  info="Tell us about the program you have attempted"
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
                    current program
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
// AddEducation.proptypes = {
//   addEduction: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
