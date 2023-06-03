import LoginPage from "@/pages/login";
import { render, screen } from "@testing-library/react";

test("renders login page", () => {
  render(<LoginPage />);

  // Realize asserções para verificar se os elementos desejados estão presentes na página de login
  const emailInput = screen.getByPlaceholderText("Digite seu email");
  const passwordInput = screen.getByLabelText("Password"); // Certifique-se de fornecer o rótulo correto para o campo de senha

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});
