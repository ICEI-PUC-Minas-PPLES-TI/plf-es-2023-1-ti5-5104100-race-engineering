import React from "react";
import { render, screen } from "@testing-library/react";
import ListPage from "./index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ListPage component", () => {
    
  it("should validate if name are present on the screen", () => {  

    render(<ListPage />);
    // Verifica se a coluna da listagem existe

    const name = screen.getByText("Nome da cidade");
    
    

    

  });
});
