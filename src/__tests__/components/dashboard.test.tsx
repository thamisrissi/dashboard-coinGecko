import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard";

describe("Dashboard - teste simples", () => {
  it("renderiza o Dashboard sem erros", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/📊 Dashboard Hopen Data/i)).toBeInTheDocument();
  });
});
