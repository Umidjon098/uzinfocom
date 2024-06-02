import { useEffect } from "react";
import { useUnit } from "effector-react";
import {
  $posts,
  $loading,
  $error,
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../stores/posts";

export const usePosts = () => {
  const [posts, loading, error] = useUnit([$posts, $loading, $error]);
  const [fetchPostsFn, addPostFn, updatePostFn, deletePostFn] = useUnit([
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
  ]);

  useEffect(() => {
    fetchPostsFn();
  }, [fetchPostsFn]);

  return {
    posts,
    loading,
    error,
    addPost: addPostFn,
    updatePost: updatePostFn,
    deletePost: deletePostFn,
  };
};
