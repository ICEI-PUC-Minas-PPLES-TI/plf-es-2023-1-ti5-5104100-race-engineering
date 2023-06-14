import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";


import TeamPage from "./index";


jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


describe("Team component", () => {
  it("should validate if name and category are present on the screen", () => {
   
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    useRouterMock.mockImplementation(() => ({
      push: jest.fn(),
    }));


    render(<TeamPage />);


    const nameInput = screen.getByLabelText("Nome do time");
    const categoryInput = screen.getByLabelText("Categoria");


    expect(nameInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
  });
});
