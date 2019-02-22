import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  componentWillReceiveProps(nextProps) {
    //binding errors from props to component state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const { user } = this.props.auth;
    const newPostData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      id: user.id
    };
    this.props.addPost(newPostData);
    this.setState({ text: "", errors: {} });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3 shadow-sm">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="What do you in mind..."
                  name="text"
                  onChange={this.onChangeHandler}
                  value={this.state.text}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-lg btn-dark ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
