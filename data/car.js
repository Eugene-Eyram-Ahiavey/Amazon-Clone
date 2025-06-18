
class Car{
    #brand;
    #model;

    #speed = 0;
    isTrunkOpen = false;

    constructor(brand, model){
       this.#brand = brand;
       this.#model = model;
    }
    
    displayInfo(){
        console.log(
            `
            ${this.#brand} ${this.#model},
             Speed: ${this.#speed} km/h 
             `);
    }
    
    go(){
        if(this.isTrunkOpen){
            this.#speed = 0
            console.log('Car cannot move trunk is open')
        }else{
         this.#speed += 5;
        }
    }

    brake(){
        this.#speed -= 5;
    }

    openTrunk(){
        if(this.#speed > 0){
            this.isTrunkOpen = false
            console.log('Trunk is closed, Car is moving');
        }else{
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
        console.log(this.isTrunkOpen, 'Trunk is closed');
    }

    
    
}

const toyota = new Car('Toyota', 'Corrolla');
console.log(toyota)
toyota.displayInfo();
toyota.go();
toyota.go();

// toyota.isTrunkOpen;
// toyota.openTrunk();
// toyota.closeTrunk()
toyota.openTrunk();
toyota.displayInfo();

const tesla = new Car('Tesla', 'Model 3');
console.log(tesla);
tesla.displayInfo();
tesla.go();
tesla.go();
// tesla.isTrunkOpen;
// tesla.openTrunk();
// tesla.closeTrunk()

tesla.openTrunk()
tesla.displayInfo();




class RaceCar extends Car{
    acceleration;

    constructor(acceleration, brand, model,){
    super(brand, model)
    super.displayInfo();

    this.acceleration = acceleration;
    this.speed = 300;
    }

    go(){
    this.speed += this.acceleration;
    }

    openTrunk(){
        return 'Race cars dont have a trunk'
    }

    closeTrunk(){
        return 'race cars dont need a trunk';
    }
}

const raceCar = new RaceCar(50, 'McLaren', 'F1');
raceCar.displayInfo();

raceCar.model = 'Ferrari';
console.log(raceCar.model);
raceCar.displayInfo();
