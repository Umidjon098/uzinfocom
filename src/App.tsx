import "./App.css";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

function App() {
  return (
    <div>
      <h1>Effector CRUD App</h1>
      <AddPost />
      <PostList />
      {/* Include UpdatePost when you need to update a specific post */}
    </div>
  );
}

export default App;
