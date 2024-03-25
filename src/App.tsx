import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Posts from "./features/Posts";
import CreatePost from "./features/CreatePost";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="post">
          <Route index element={<CreatePost />} />
          <Route path=":postId" element={<PostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
