import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
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
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(newUser, this.props.history);
  }
  componentDidMount() {
    //hide auth pages and redirect to dashboard if user is logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  UNSAFE_componentWillReceiveProps(nextprops) {
    //push or redirect to dashboard when logged in
    if (nextprops.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    //binding errors from props to component state
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  error={errors.email}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  error={errors.password}
                  onChange={this.onChangeHandler}
                />
                <input
                  type="submit"
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
Login.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { loginUser }
)(Login);
