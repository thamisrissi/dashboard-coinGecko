import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MetricCard } from "../../components/metric-card";

describe("MetricCard", () => {
  it("renderiza título e valor corretamente", () => {
    render(<MetricCard title="Teste" value={123} />);
    expect(screen.getByText("Teste")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("dispara onClick quando clicado", () => {
    const handleClick = jest.fn();
    render(<MetricCard title="Clique" value={10} onClick={handleClick} />);

    fireEvent.click(screen.getByText("Clique"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
