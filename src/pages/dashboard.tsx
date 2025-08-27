import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { MetricCard } from "../components/metric-card";
import { DateRangePickerField } from "../components/date-range-picker-field";
import { deltaValues, sumValues } from "../utils/metrics";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const {
  from,
  to,
  setFrom,
  setTo,
  data,
  loading,
  handleNavigate,
  error,
} = useDashboardData();
 
  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">📊 Dashboard Hopen Data</h1>

      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center border border-gray-300">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DateRangePickerField label="De:" value={from} onChange={setFrom} />
          <DateRangePickerField label="Até:" value={to} onChange={setTo} minDate={from} />
        </LocalizationProvider>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-70 z-50">
          <p className="text-gray-600 text-lg font-medium">Carregando dados...</p>
        </div>
      )}

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="Soma Preços"
          value={data ? sumValues(data.prices.map(([, v]) => v)) : 0}
          onClick={() => handleNavigate("➕ Soma Preços", data?.prices ?? [], "sum")}
        />
        <MetricCard
          title="Volume Total"
          value={data ? sumValues(data.total_volumes.map(([, v]) => v)) : 0}
          onClick={() => handleNavigate("💲 Volume Total", data?.total_volumes ?? [], "sum")}
        />
        <MetricCard
          title="Variação Market Cap"
          value={data ? deltaValues(data.market_caps.map(([, v]) => v)) : 0}
          onClick={() => handleNavigate("📶 Variação Market Cap", data?.market_caps ?? [], "delta")}
        />
      </div>

      {!loading && !error && data === null && (
        <p className="text-gray-500 text-center mt-4">Nenhum dado disponível para o período selecionado.</p>
      )}
    </div>
  );
}
