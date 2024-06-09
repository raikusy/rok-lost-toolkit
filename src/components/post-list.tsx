import React from "react";

type PostListProps = {
  posts: any[];
};

const PostList = ({ posts }: PostListProps) => {
  console.log(posts);
  return <div>PostList</div>;
};

export default PostList;
