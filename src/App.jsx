import "the-new-css-reset/css/reset.css";
import "./App.css";
import AppBar from "./Components/AppBar/AppBar.jsx";
import PostsListPage from "./Components/PostsListPage/PostsListPage.jsx";

function App() {
  return (
    <>
      <AppBar />
      <PostsListPage />
    </>
  );
}

export default App;
