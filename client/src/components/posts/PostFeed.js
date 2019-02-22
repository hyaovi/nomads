import React, { Component } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map(post => <PostItem post={post} key={post._id} />);
  }
}
PostFeed.propsTypes = {
  post: PropTypes.array.isRequired
};
export default PostFeed;
