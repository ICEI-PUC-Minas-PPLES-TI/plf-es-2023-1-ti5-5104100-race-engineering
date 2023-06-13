import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import TeamPage from "./index";

describe("Team component", () => {
  it("should validate if name and category are present on the screen", () => {
    render(<TeamPage />);

    const nameInput = screen.getByLabelText("Nome do time");
    const categoryInput = screen.getByLabelText("Categoria");

    expect(nameInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
  });
});
