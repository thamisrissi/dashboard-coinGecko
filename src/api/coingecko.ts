import api from "./axiosClient";

export async function getMarketChartRange(
  coinId: string,
  vsCurrency: string,
  from: number,
  to: number
) {
  const { data } = await api.get(`/coins/${coinId}/market_chart/range`, {
    params: { vs_currency: vsCurrency, from, to },
  });
  return data;
}
