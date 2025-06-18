import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
    {
    id: '1',
    deliveryDays:7,
    priceCents: 0
    },
    {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
    },
    {
     id: '3',
     deliveryDays: 1,
     priceCents: 999
    }
]


export function getDeliveryOption(deliveryOptionId){
let deliveryOption;

deliveryOptions.forEach((option) =>{
if(option.id === deliveryOptionId){
deliveryOption = option;
}
});

return deliveryOption || deliveryOptions[0];
}

const todaysDate = dayjs();

export function calcualteDeliveryDate(deliveryOption){
const newDeliveryDays = skipWeekendDays(deliveryOption.deliveryDays);
const deliveryDate = todaysDate.add(newDeliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D')

return dateString;
}


function skipWeekendDays(deliveryDays){
    for(let i = 0; i <= deliveryDays; i++){
        const weekday = todaysDate.add(i,'d').format('dddd');
        if(weekday === 'Saturday' || weekday === 'Sunday'){
            deliveryDays++;
        }
    }
    return deliveryDays;
}