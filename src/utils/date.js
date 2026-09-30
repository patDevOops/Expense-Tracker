import dayjs from 'dayjs';
export function formatMY(date){
  return dayjs(date).format('YYYY-MM-D')
}