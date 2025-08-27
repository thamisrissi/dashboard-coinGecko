export const sumValues = (values: number[]) => values.reduce((acc, v) => acc + v, 0);
export const deltaValues = (values: number[]) => {
  if (values.length < 2) return 0;
  return values[values.length - 1] - values[0];
};
