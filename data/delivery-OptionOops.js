

const delivery = {
    deliveryOptions :  [
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
], 

 getDeliveryOption(deliveryOptionId){
let deliveryOption;

this.deliveryOptions.forEach((option) =>{
if(option.id === deliveryOptionId){
deliveryOption = option;
}
});

return deliveryOption ||this. deliveryOptions[0];
}, 

 calcualteDeliveryDate(deliveryOption){
const newDeliveryDays = this.skipWeekendDays(deliveryOption.deliveryDays);
const deliveryDate = todaysDate.add(newDeliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D')

return dateString;
}, 

 skipWeekendDays(deliveryDays){
    for(let i = 0; i <= deliveryDays; i++){
        const weekday = todaysDate.add(i,'d').format('dddd');
        if(weekday === 'Saturday' || weekday === 'Sunday'){
            deliveryDays++;
        }
    }
    return deliveryDays;
}

}