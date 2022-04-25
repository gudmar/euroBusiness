const getRandomInteger = (min, max) => {
    min = Math.ceil(min); max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const throwDices = async () => {
    return new Promise((resolve) => { // Promise in case animation for throwing is made
        resolve(getRandomInteger(2, 12))
    })
}

const getNrOfCitiesPlayerHas = (descriptors, player, country) => {
    let nrSoFar = 0;
    let wholeNumber = 0;
    Object.values(descriptors).forEach( item => {
        if ((item.country === country) && (item.player === player)) {
            wholeNumber = item.nrInSet;
            nrSoFar += 1;
        }
    });
    return { owns: nrSoFar, outOf: wholeNumber }
}

const countWaterPlantVisitFee = async (object) => {
    if (object.isPlegded) return 0;
    if (object.owner === 'bank') return 0;
    const { owns, outOf } = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    const diceResult = await throwDices();
    if (owns === outOf) return diceResult * 20;
    return 0;
}
const countTaxFee = () => 200;

const counntParkingFee = () => 400;

const countCityVisitFee = (object) => {
    if (object.owner === 'bank') return 0;
    if (object.isPlegded) return 0;
    if (object.nrOfHouses === 0);
    const {owns, outOf} = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    const feeToPay = object.visit[object.nrOfHouses];
    if ((owns === outOf) && (object.nrOfHouses === 0)) return feeToPay * 2;
    return feeToPay;
}
const countRailwayVisitFee = (object) => {
    if (object.owner === 'bank') return 0;
    if (object.isPlegded) return 0;
    const { owns, outOf } = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    return object.visit[owns];
}
const countVisitFeeChecker = (object) => {
    switch (object.type) {
        case 'city': return countCityVisitFee(object);
        case 'railway': return countRailwayVisitFee(object);
        case 'parking': return counntParkingFee();
        case 'tax': return countTaxFee();
        case 'waterPlant': return countWaterPlantVisitFee(object);
        case 'powerStation': return countWaterPlantVisitFee(object);
    }
}

const descriptors = {
    Start: {
        type: 'start',
        boardFieldNumber: 1,
        visit: [-400],
        info: 'Does nothing, a player gets $400 after passing this field.'
    },
    Ateny: {
        type: 'city',
        country: 'Greece',
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2, // 2 cities in the country
        boardFieldNumber: 2,
        isPlegded: false, // zastawiony
    },
    Chance_blue: {
        type: 'chanceBlue',
        info: 'Draw a blue chance card'
    },
    Chance_red: {
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    Chance_blue_left: {
        type: 'chanceBlue',
        info: 'Draw a blue chance card',
    },
    Chance_red_left: {
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    Chance_blue_top: {
        type: 'chanceBlue',
        info: 'Draw a blue chance card',
    },
    Chance_red_top: {
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    Chance_blue_right: {
        type: 'chanceBlue',
        info: 'Draw a blue chance card',
    },
    Chance_red_right: {
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    Saloniki: {
        country: 'Greece',
        type: 'city',
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2,
        boardFieldNumber: 4,
        isPlegded: false,
    },
    Guarded_Parking: {
        type: 'guardedPark',
        boardFieldNumber: 5,
        visit: [400],
        info: 'You pay $400 for staying one extra trun here. This is mandatory,',
    },
    Free_Parking: {
        type: 'freePark',
        boardFieldNumber: 11,
        visit: [0],
        wait: 1,
        info: 'You spend one extra turn here. The only good news is, there is no fee for staying here',
    },
    Jail: {
        type: 'jail',
        boardFieldNumber: 11,
        wait: 2,
        info: 'You spend 2 extra turns here.',
    },
    Go_to_jail: {
        type: 'go_to_jail',
        boardFieldNumber: 31,
        info: 'You go to field 11, jail and spend 2 extra turns there.'
    },
    South_Railways: {
        country: 'Railways',
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 6,
        isPlegded: false,
    },
    Neapol: {
        country: 'Italy',
        type: 'city',
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 7,
        isPlegded: false,
    },
    Mediolan: {
        country: 'Italy',
        type: 'city',
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 9,
        isPlegded: false,
    },
    Rome: {
        country: 'Italy',
        type: 'city',
        price: 240,
        mortage: 120,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 20, 80, 200, 600, 900, 1200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 10,
        isPlegded: false,
    },
    Barcelona: {
        country: 'Spain',
        type: 'city',
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 12,
        isPlegded: false,
    },
    Power_Station: {
        country: 'Plant',
        type: 'powerStation',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 13,
        isPlegded: false,
    },
    Sewilla: {
        country: 'Spain',
        type: 'city',
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 14,
        isPlegded: false,
    },
    Madrit: {
        country: 'Spain',
        type: 'city',
        price: 320,
        mortage: 160,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 25, 120, 360, 1000, 1400, 1800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 15,
        isPlegded: false,
    },
    West_Railways: {
        country: 'Railways',
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 16,
        isPlegded: false,
    },
    Liverpool: {
        country: 'UK',
        type: 'city',
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 17,
        isPlegded: false,
    },
    Glasgow: {
        country: 'UK',
        type: 'city',
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 19,
        isPlegded: false,
    },
    London: {
        country: 'UK',
        type: 'city',
        price: 400,
        mortage: 200,
        housePrice: 200,
        hotelPrice: 200,
        visit: [ 35, 160, 440, 1200, 1600, 2000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 20,
        isPlegded: false,
    },
    Rotterdam: {
        country: 'Benelux',
        type: 'city',
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 22,
        isPlegded: false,
    },
    Bruksela: {
        country: 'Benelux',
        type: 'city',
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 24,
        isPlegded: false,
    },
    Amsterdam: {
        country: 'Benelux',
        type: 'city',
        price: 480,
        mortage: 240,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 40, 200, 600, 1500, 1850, 2200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 25,
        isPlegded: false,
    },
    North_Railways: {
        country: 'Railways',
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 26,
        isPlegded: false,
    },
    Malmo: {
        country: 'Sweeden',
        type: 'city',
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 27,
        isPlegded: false,
    },
    Goteborg: {
        country: 'Sweeden',
        type: 'city',
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 28,
        isPlegded: false,
    },
    Water_plant: {
        country: 'Plant',
        type: 'waterPlant',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 29,
        isPlegded: false,
    },
    Sztokholm: {
        country: 'Sweeden',
        type: 'city',
        price: 560,
        mortage: 280,
        housePrice: 300,
        hotelPrice: 300,
        visit: [ 50, 240, 720, 1700, 2050, 2400 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        isPlegded: false,
        boardFieldNumber: 30,
    },
    Frankfurt: {
        country: 'RFN',
        type: 'city',
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 32,
        isPlegded: false,
    },
    Kolonia: {
        country: 'RFN',
        type: 'city',
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 33,
        isPlegded: false,
    },
    Bonn: {
        country: 'RFN',
        type: 'city',
        price: 640,
        mortage: 320,
        housePrice: 400,
        hotelPrice: 400,
        visit: [ 50, 300, 900, 2000, 2400, 2800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 35,
        isPlegded: false,
    },
    East_Railways: {
        country: 'Railways',
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 36,
        isPlegded: false,
    },
    Insbruk: {
        country: 'Austria',
        type: 'city',
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 38,
        isPlegded: false,
    },
    Tax: {
        type: 'tax',
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
    },
    Wieden: {
        country: 'Austria',
        type: 'city',
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 40,
        isPlegded: false,
    },
}

const boardInOrder = [
    'Start', 'Saloniki', 'Chance_blue', 'Ateny', 'Guarded_Parking', 'South_Railways', 'Neapol', 'Chance_red', 'Mediolan', 'Rome', 
    'Jail', 'Barcelona', 'Power_Station', 'Sewilla', 'Madrit', 'West_Railways','Liverpool', 'Chance_blue_left', 'Glasgow', 'London', 
    'Free_Parking', 'Rotterdam', 'Chance_red_top', 'Bruksela', 'Amsterdam', 'North_Railways', 'Malmo', 'Goteborg', 'Water_plant', 'Sztokholm', 
    'Go_to_jail', 'Frankfurt', 'Kolonia', 'Chance_blue_right', 'Bonn', 'East_Railways', 'Chance_red_right', 'Insbruk', 'Tax', 'Wieden'
]

export { boardInOrder, descriptors }