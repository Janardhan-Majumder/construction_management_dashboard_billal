export const diffDays = (start_date: string, end_date: string): number => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
};
