import { useLocation } from "react-router-dom";
import { sumValues, deltaValues } from "../utils/metrics";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { MetricSummaryState } from "../types";
import { BackToDashboard } from "../components/back-to-dashboard";
import noDataImg from "../../public/nenhumDadoEncontrado.svg";


export default function MetricSummary() {
  const location = useLocation();
  const state = location.state as MetricSummaryState | null;

  if (!state) {
    return (
      <div className="p-6">
        <p>Nenhuma métrica selecionada.</p>
        <BackToDashboard title={"Voltar"} />
      </div>
    );
  }

  const { title, data, from, to, metricType } = state;

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[100vh] space-y-6">
        <img
          src={noDataImg}
          alt="Nenhum dado disponível"
          className="w-48 h-48 object-contain"
        />

        <p className="text-gray-600 text-lg text-center">
          Nenhum dado disponível para o período selecionado.
        </p>

        <BackToDashboard title={"Voltar ao Dashboard"} />
      </div>
    );
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  const dailyData = data.map(([timestamp, value]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    value,
  }));

  const formatter = metricType === "sum" ? sumValues : deltaValues;

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">{title}</h1>
      <p className="text-gray-600 text-center sm:text-left">
        Período: {fromDate.toLocaleDateString()} até {toDate.toLocaleDateString()}
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[3000px] bg-white shadow-lg rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-2xl font-bold text-green-600 text-center sm:text-left">
          Valor calculado: {formatter(data.map(([, v]) => v)).toLocaleString("pt-BR", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
      })}
      </div>

      <BackToDashboard title={"Voltar"} />
    </div>
  );
}
