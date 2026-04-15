import { format } from 'date-fns';

export function formatShortDate(date: string | Date) {
  return format(new Date(date), 'dd/MM');
}

export function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function trend(current: number, previous: number) {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}
