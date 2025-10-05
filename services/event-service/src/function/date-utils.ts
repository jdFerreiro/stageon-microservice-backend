import dayjs from 'dayjs';

export function toLocalISOString(date: Date | null | undefined): string | null {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
