import { createStore, createEvent, createEffect, sample } from "effector";
import axiosInstance from "../api/axios";

// Define types
interface Post {
  id: number;
  title: string;
  body: string;
}

type PostInput = Omit<Post, "id">;

// Define events
export const fetchPosts = createEvent();
export const addPost = createEvent<PostInput>();
export const updatePost = createEvent<Post>();
export const deletePost = createEvent<number>();

// Define effects
export const fetchPostsFx = createEffect(async () => {
  const response = await axiosInstance.get<Post[]>("/posts");
  return response.data;
});

export const addPostFx = createEffect(async (post: PostInput) => {
  const response = await axiosInstance.post<Post>("/posts", post);
  return response.data;
});

export const updatePostFx = createEffect(async (post: Post) => {
  const response = await axiosInstance.put<Post>(`/posts/${post.id}`, post);
  return response.data;
});

export const deletePostFx = createEffect(async (id: number) => {
  await axiosInstance.delete(`/posts/${id}`);
  return id;
});

// Define store
export const $posts = createStore<Post[]>([])
  .on(fetchPostsFx.doneData, (_, posts) => posts)
  .on(addPostFx.doneData, (state, post) => [...state, post])
  .on(updatePostFx.doneData, (state, updatedPost) =>
    state.map((post) => (post.id === updatedPost.id ? updatedPost : post))
  )
  .on(deletePostFx.doneData, (state, id) =>
    state.filter((post) => post.id !== id)
  );

export const $loading = createStore<boolean>(false).on(
  [
    fetchPostsFx.pending,
    addPostFx.pending,
    updatePostFx.pending,
    deletePostFx.pending,
  ],
  (_, pending) => pending
);

export const $error = createStore<string | null>(null).on(
  [fetchPostsFx.fail, addPostFx.fail, updatePostFx.fail, deletePostFx.fail],
  (_, error) => (error.error as Error).message
);

// Connect events to effects
sample({
  clock: fetchPosts,
  target: fetchPostsFx,
});

sample({
  clock: addPost,
  target: addPostFx,
});

sample({
  clock: updatePost,
  target: updatePostFx,
});

sample({
  clock: deletePost,
  target: deletePostFx,
});
