import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig";
import PostsList from "../PostList/PostList.jsx";
import style from "./SearchPosts.module.css";

const SearchPosts = ({authenticatedUser}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const postsRef = firebase.database().ref("posts");
    postsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const postsArray = data ? Object.keys(data).map((key) => data[key]) : [];
      setPosts(postsArray);
      setFilteredPosts(postsArray);
    });

    return () => {
      postsRef.off();
    };
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.keywords &&
          Array.isArray(post.keywords) &&
          post.keywords.some((keyword) =>
            keyword.toLowerCase().includes(lowerCaseSearchTerm)
          )
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={style.searchContainer}>
      <input
        type="text"
        placeholder="Procure um post pelas palavras chave"
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput}
      />
      <PostsList posts={filteredPosts} authenticatedUser={authenticatedUser} />
    </div>
  );
};

export default SearchPosts;
