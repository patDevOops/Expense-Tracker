import dayjs from 'dayjs';
export function formatMY(date){
  return dayjs(date).format('YYYY-MM-D')
}
export function formatTime(time){
  return dayjs(time).format('h:mm A')
}