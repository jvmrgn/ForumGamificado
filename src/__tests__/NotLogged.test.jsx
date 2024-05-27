import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import NotLogged from "../NotLogged";

describe("NotLogged", () => {
  test("renders login and register buttons when user is not logged in", () => {
    const {getByText} = render(
      <MemoryRouter>
        <NotLogged />
      </MemoryRouter>
    );
    expect(getByText("Você não está logado.")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Registro")).toBeInTheDocument();
  });

  test("does not render anything when user is logged in", () => {
    const {queryByText} = render(
      <MemoryRouter>
        <NotLogged />
      </MemoryRouter>,
      {wrapper: ({children}) => <MockLoggedIn>{children}</MockLoggedIn>}
    );
    expect(queryByText("Você não está logado.")).toBeNull();
    expect(queryByText("Login")).toBeNull();
    expect(queryByText("Registro")).toBeNull();
  });
});
