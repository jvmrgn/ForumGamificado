import React from "react";
import {render, fireEvent} from "@testing-library/react";
import CommentModal from "../Components/CommentModal/CommentModal.jsx";

describe("CommentModal", () => {
  test("renders modal with comment form", () => {
    const postId = "1";
    const {getByText} = render(
      <CommentModal isOpen={true} onClose={() => {}} postId={postId} />
    );
    expect(getByText("Comentar")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const {getByText} = render(
      <CommentModal isOpen={true} onClose={onCloseMock} postId="1" />
    );
    fireEvent.click(getByText("Fechar"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
