import { useState, useEffect, useCallback } from "react";
import { subMonths, getUnixTime } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getMarketChartRange } from "../api/coingecko";
import type { MarketChartData, MetricType } from "../types";

export function useDashboardData() {
  const [from, setFrom] = useState<Date | null>(subMonths(new Date(), 1));
   const [to, setTo] = useState<Date | null>(new Date());
   const [data, setData] = useState<MarketChartData | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   const navigate = useNavigate();
 
   const fetchData = useCallback(async () => {
     if (!from || !to) return;
     setLoading(true);
     setError(null);
     try {
       const res = await getMarketChartRange(
         "bitcoin",
         "usd",
         getUnixTime(from),
         getUnixTime(to)
       );
       setData(res);
     } catch (err: unknown) {
       console.error(err);
       setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
     } finally {
       setLoading(false);
     }
   }, [from, to]);
 
   useEffect(() => {
     fetchData();
   }, [fetchData]);
 
   const handleNavigate = (title: string, dataArray: [number, number][], metricType: MetricType) => {
     if (!from || !to) return;
 
     const diffInDays = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
     if (diffInDays < 1) {
       alert("Selecione um período maior que 1 dia para ver o gráfico detalhado.");
       return;
     }
 
     navigate("/metric-summary", {
       state: { title, data: dataArray, from: from.toISOString(), to: to.toISOString(), metricType },
     });
   };
 
  return {
    from,
    to,
    setFrom,
    setTo,
    data,
    loading,
    handleNavigate,
    error,
  };
}
