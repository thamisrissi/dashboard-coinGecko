import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MetricSummary from "../../pages/metric-sumary";

const testState = {
  title: "Test Metric",
  data: [
    [1680000000000, 100],
    [1680086400000, 200],
  ],
  from: new Date(1680000000000).toISOString(),
  to: new Date(1680086400000).toISOString(),
  metricType: "sum" as const,
};

describe("MetricSummary", () => {
  it("renderiza gráfico e valor calculado", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/metric-summary", state: testState }]}>
        <Routes>
          <Route path="/metric-summary" element={<MetricSummary />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Metric")).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.replace(/\s/g, "").startsWith("Valorcalculado:300")
      )
    ).toBeInTheDocument();
  });

  it("mostra mensagem quando não há state", () => {
    render(
      <MemoryRouter initialEntries={["/metric-summary"]}>
        <Routes>
          <Route path="/metric-summary" element={<MetricSummary />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Nenhuma métrica selecionada.")).toBeInTheDocument();
  });
});
