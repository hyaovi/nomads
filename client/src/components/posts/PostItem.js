import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickUnlike = this.onClickUnlike.bind(this);
  }
  onClickDelete(postID) {
    this.props.deletePost(postID);
  }
  onClickLike(postID) {
    this.props.addLike(postID);
  }
  onClickUnlike(postID) {
    this.props.removeLike(postID);
  }
  //checks user liked post
  userLiked(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3 border">
        <div className="row align-items-center">
          <div className="col-md-2">
            <Link to={`profile/${post.user}`}>
              <img
                className="rounded-circle img-fluid d-none mx-auto d-md-block"
                style={{ height: "90px", width: "auto" }}
                src={post.avatar}
                alt=""
              />
            </Link>

            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions && (
              <span>
                <button
                  onClick={() => this.onClickLike(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.userLiked(post.likes)
                    })}
                    // Using classnames modules to perform the same thing
                    // className={`fas fa-thumbs-up ${
                    //   this.userLiked(post.likes) ? " text-info" : " text-secondary"
                    // }`}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onClickUnlike(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id && (
                  <button
                    onClick={() => this.onClickDelete(post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true
};
PostItem.propsTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
