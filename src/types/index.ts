export type MetricSummaryState = {
  title: string;
  data: [number, number][];
  from: string;
  to: string;
  metricType: "sum" | "delta";
};

export interface DateRangePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date | null;
}

export type MetricType = "sum" | "delta";

export interface MarketChartData {
  prices: [number, number][];
  total_volumes: [number, number][];
  market_caps: [number, number][];
}