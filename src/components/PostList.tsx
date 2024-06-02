import React from "react";
import { usePosts } from "../hooks/usePosts";
import UpdatePost from "./UpdatePost";

const PostList: React.FC = () => {
  const { posts, loading, error, deletePost } = usePosts();

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: {error}{" "}
        <button onClick={() => window.location.reload()}>Reaload</button>
      </p>
    );

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="d-flex">
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <UpdatePost
                id={post.id}
                initialTitle={post.title}
                initialBody={post.body}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
