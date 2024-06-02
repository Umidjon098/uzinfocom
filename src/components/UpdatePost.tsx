import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useUnit } from "effector-react";
import { updatePost } from "../stores/posts";

interface UpdatePostProps {
  id: number;
  initialTitle: string;
  initialBody: string;
}

interface PostInput {
  title: string;
  body: string;
}

const UpdatePost: React.FC<UpdatePostProps> = ({
  id,
  initialTitle,
  initialBody,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostInput>({
    defaultValues: { title: initialTitle, body: initialBody },
  });
  const updatePostFn = useUnit(updatePost);

  const onSubmit = (data: PostInput) => {
    updatePostFn({ id, ...data });
    setModalIsOpen(false);
    reset();
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Edit</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Update Post</h2>
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
          <button type="submit">Update</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdatePost;
