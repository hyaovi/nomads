import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
class Post extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link className="btn btn-light mb-3" to="/feeds">
                back to feeds
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
