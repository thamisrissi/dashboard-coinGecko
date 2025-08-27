import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { DateRangePickerFieldProps } from "../types";

export function DateRangePickerField({
  label,
  value,
  onChange,
  minDate,
}: DateRangePickerFieldProps) {
  return (
      <div className="flex flex-col md:flex-col items-start md:items-start w-full md:w-auto">
      <p className="text-sm font-medium mb-1">{label}</p>
      <DatePicker
        value={value}
        onChange={onChange}
        slotProps={{ textField: { size: "small" } }}
        minDate={minDate || undefined}
        className="w-full md:w-auto"
      />
    </div>
  );
}
