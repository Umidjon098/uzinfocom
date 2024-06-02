import React from "react";
import { useForm } from "react-hook-form";
import { useUnit } from "effector-react";
import { addPost, fetchPosts } from "../stores/posts";

interface PostInput {
  title: string;
  body: string;
}

const AddPost: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostInput>();
  const [fetchPostsFn, addPostFn] = useUnit([fetchPosts, addPost]);

  const onSubmit = (data: PostInput) => {
    addPostFn(data);
    reset();
    fetchPostsFn();
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <label>Body</label>
          <textarea {...register("body", { required: true })}></textarea>
          {errors.body && <span>This field is required</span>}
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPost;
