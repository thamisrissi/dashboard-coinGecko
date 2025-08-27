import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/dashboard";
import MetricSummary from "./pages/metric-sumary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
       <Route path="/metric-summary" element={<MetricSummary />} />
      </Routes>
    </BrowserRouter>
  );
}