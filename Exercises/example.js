import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function isWeekend(date){
date = dayjs();
const dayOfWeek = date.format('dddd');
console.log(dayOfWeek);
console.log(date);
return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export default isWeekend;