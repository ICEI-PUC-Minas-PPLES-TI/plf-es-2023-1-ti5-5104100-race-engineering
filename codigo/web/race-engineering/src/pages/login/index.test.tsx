import { render, screen } from "@testing-library/react";

import Home from "./";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Home", () => {
  test("renders the correct title", () => {
    render(<Home />);
    const title = screen.getByText(/Gerenciamento Porsche Cup/i);
    expect(title).toBeInTheDocument();
  });

  test("renders all cards", () => {
    render(<Home />);
    const cards = screen.getAllByRole("card");
    expect(cards.length).toBe(3);
  });

  test("clicking on a secondary button navigates to the correct page", () => {
    render(<Home />);
    const secondaryButton = screen.getAllByRole("button", {
      name: /Listar/i,
    })[0];
    secondaryButton.click();
    expect(window.location.pathname).toBe("/list-race");
  });

  test("clicking on a primary button navigates to the correct page", () => {
    render(<Home />);
    const primaryButton = screen.getAllByRole("button", {
      name: /Cadastrar/i,
    })[0];
    primaryButton.click();
    expect(window.location.pathname).toBe("/create-race");
  });
});
