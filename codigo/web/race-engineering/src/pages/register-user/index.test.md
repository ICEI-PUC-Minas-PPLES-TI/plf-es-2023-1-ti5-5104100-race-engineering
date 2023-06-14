import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "./index";

describe("RegistrationForm component", () => {

    
  it("Submitting the form with valid input should redirect to login", () => {
    // Render the RegistrationForm component

    render(<RegisterPage />);
    // Verifica se a coluna da listagem existe
    const id = screen.getByLabelText("Nome completo");
    

    
  });

  
  
});
