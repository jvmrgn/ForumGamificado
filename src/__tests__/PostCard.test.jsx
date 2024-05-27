import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import PostCard from "../Components/PostCard/PostCard.jsx";

describe("PostCard", () => {
  const post = {
    id: 1,
    title: "Test Title",
    description: "Test Description",
    publishedDate: "2024-05-28",
    creatorEmail: "test@example.com",
    keywords: ["test", "react", "testing"],
    comments: [{id: 1, text: "Test comment"}],
  };

  test("renders post title and description", () => {
    const {getByText} = render(
      <Router>
        <PostCard post={post} />
      </Router>
    );
    expect(getByText(post.title)).toBeTruthy();
    expect(getByText(post.description)).toBeTruthy();
  });

  test("truncates long description properly", () => {
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const truncatedDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";
    const postWithLongDescription = {...post, description: longDescription};
    const {getByText} = render(
      <Router>
        <PostCard post={postWithLongDescription} />
      </Router>
    );
    expect(getByText(truncatedDescription)).toBeTruthy();
  });

  test("navigates to post detail when clicked", () => {
    const navigateMock = jest.fn();
    const {getByText} = render(
      <Router>
        <PostCard post={post} navigate={navigateMock} />
      </Router>
    );
    fireEvent.click(getByText(post.title));
    expect(navigateMock).toHaveBeenCalledWith(`/post/${post.id}`);
  });

  test("renders creator email, published date, keywords, and comment count", () => {
    const {getByText} = render(
      <Router>
        <PostCard post={post} />
      </Router>
    );
    expect(getByText(`Publicado em: ${post.publishedDate}`)).toBeTruthy();
    expect(getByText(`Criador: ${post.creatorEmail}`)).toBeTruthy();
    expect(
      getByText(`Palavras-chave: ${post.keywords.join(", ")}`)
    ).toBeTruthy();
    expect(
      getByText(`Quantidade de comentários: ${post.comments.length}`)
    ).toBeTruthy();
  });
});
