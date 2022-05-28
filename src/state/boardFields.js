// import { descriptorReducer } from "../components/ManagementPanel/managementPanelDescriptors";
import {throwDices} from '../functions/throwDices.js';
import {countries, notCountryTypes} from '../functions/countryTypes.js'

const estateTypes = {
    CITY: 'city',
    RAILWAY: 'railway',
    POWER_STATION: 'powerStation',
    WATER_PLANT: 'waterPlant'
}
const chanceTypes = {
    CHANCE_BLUE: 'chanceBlue',
    CHANCE_RED:  'chanceRed',
}

const otherTypes = {
    START: 'start',
    JAIL: 'jail',
    FREE_PARK: 'freePark',
    GO_TO_JAIL: 'go_to_jail',
    TAX: 'tax'
}
const types = { ...estateTypes, ...chanceTypes, ...otherTypes }

const arrayStateToObjectState = arrayState => arrayState.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {})

const getNrOfCitiesPlayerHas = (descriptors, player, country) => {
    // From a single country | player === color

    if (player === undefined) throw new Error('boardField: getNotPlegdedNrOfCIties: Player undefined');
    if (country === undefined) throw new Error('boardField: getNotPlegdedNrOfCIties: Country undefined');
    if (Array.isArray(descriptors)) descriptors = arrayStateToObjectState(descriptors);
    const result = Object.values(descriptors).reduce((acc,item) => {
        if ((item.country === country) && (item.owner === player)) acc.owns += 1;
        if (item.country === country) acc.outOf += 1;
        return acc;
    }, {owns: 0, outOf: 0});
    return result;
}

const getNotPlegdedNrOfCitiesPlayerHas = (descriptors, player, country) => {
    if (player === undefined) throw new Error('boardField: getNotPlegdedNrOfCIties: Player undefined');
    if (country === undefined) throw new Error('boardField: getNotPlegdedNrOfCIties: Country undefined');
    if (Array.isArray(descriptors)) descriptors = arrayStateToObjectState(descriptors);
    const result = Object.values(descriptors).reduce((acc,item) => {
        if ((item.country === country) && (item.owner === player) && (!item.isPlegded)) acc.owns += 1;
        if (item.country === country) acc.outOf += 1;
        return acc;
    }, {owns: 0, outOf: 0});
    return result;    
}

const countWaterPlantVisitFee = async (descriptors, object) => {
    if (object === undefined) throw new Error('boardField: countWaterPlantVisitFee: object given as arg is undefined')
    if (descriptors === undefined) throw new Error('boardField: countWaterPlantVisitFee: state (descriptors) not passed')
    if (object.isPlegded) return 0;
    if (object.owner === 'bank') return 0;
    const { owns, outOf } = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    const diceResult = await throwDices();
    if (owns === outOf) return diceResult * 20;
    return diceResult * 10;
}
const countTaxFee = () => 200;

const assumpWaterPlantVisitFee = (descriptors, object) => {
    if (object === undefined) throw new Error('boardField: countWaterPlantVisitFee: object given as arg is undefined')
    if (descriptors === undefined) throw new Error('boardField: countWaterPlantVisitFee: state (descriptors) not passed')
    if (object.isPlegded) return 0;
    if (object.owner === 'bank') return 0;
    const { owns, outOf } = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    const factor = (owns === outOf) ? 20 : 10;
    return `${factor} x dice throw result`
}

const countParkingFee = () => 400;

const countCityVisitFee = (descriptors, object) => {
    if (object === undefined) throw new Error('boardField: countWaterPlantVisitFee: object given as arg is undefined')
    if (descriptors === undefined) throw new Error('boardField: countWaterPlantVisitFee: state (descriptors) not passed')
    const {owns: ownsErrorCheck, outOf: outOfErrorCheck} = getNotPlegdedNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    if ((ownsErrorCheck != outOfErrorCheck) && object.nrOfHouses > 0) throw new Error('In countCityVisitFee in boardFields: one city is plegded but there are houses');
    const {owns, outOf} = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    if (object.owner === 'bank') return 0;
    if (object.isPlegded) return 0;
    const feeToPay = object.visit[object.nrOfHouses];
    if ((owns === outOf) && (object.nrOfHouses === 0)) return feeToPay * 2;
    return feeToPay;
}
const countRailwayVisitFee = (descriptors, object) => {
    if (object === undefined) throw new Error('boardField: countWaterPlantVisitFee: object given as arg is undefined')
    if (descriptors === undefined) throw new Error('boardField: countWaterPlantVisitFee: state (descriptors) not passed')
    if (object.owner === 'bank') return 0;
    if (object.isPlegded) return 0;
    const { owns, outOf } = getNrOfCitiesPlayerHas(descriptors, object.owner, object.country);
    return object.visit[owns - 1];
}
const countExectVisitFeeChecker = async (descriptors, object) => {
    switch (object.type) {
        case estateTypes.CITY: return countCityVisitFee(descriptors, object);
        case estateTypes.RAILWAY: return countRailwayVisitFee(descriptors, object);
        case otherTypes.FREE_PARK: return 0;
        case 'guardedPark': return countParkingFee();
        case otherTypes.TAX: return countTaxFee();
        case estateTypes.WATER_PLANT: return await countWaterPlantVisitFee(descriptors, object);
        case estateTypes.POWER_STATION: return await countWaterPlantVisitFee(descriptors, object);
        default: throw new Error('boardField: countExectVisitFeeChecker: type not recognized')
    }
}

const assumpVisitFeeChecker = (object) => {
    
    switch (object.type) {
        case estateTypes.CITY: return countCityVisitFee(descriptors, object);
        case estateTypes.RAILWAY: return countRailwayVisitFee(descriptors, object);
        case 'guardedPark': return countParkingFee();
        case otherTypes.TAX: return countTaxFee();
        case estateTypes.WATER_PLANT: return assumpWaterPlantVisitFee(descriptors, object);
        case estateTypes.POWER_STATION: return assumpWaterPlantVisitFee(descriptors, object);
        default: throw new Error('boardField: assumpExectVisitFeeChecker: type not recognized');
    }
}

const calculateCashForSingleEstateFromTheBank = (descriptor, playerColor, housesInPool) => {
    let nrOfHouses = 0;
    let nrOfHotels = 0;
    let money = 0;
    const maxNrOfHousesOnSingleEstate = 4;
    const getOutput = () => ({nrOfHotels: nrOfHotels, nrOfHouses: nrOfHouses, money: money})
    if (descriptor.owner !== playerColor) return getOutput();
    if (descriptor.isPlegded) return getOutput();
    if (descriptor.nrOfHouses === 0 || descriptor.nrOfHouses === undefined) {
        money = descriptor.price / 2;
        return getOutput();
    }
    if (descriptor.nrOfHouses < 5) {
        nrOfHouses = descriptor.nrOfHouses; 
        money = descriptor.nrOfHouses * descriptor.housePrice / 2 + descriptor.price / 2;
        return getOutput();
    }
    const cashForHouses = Math.min(housesInPool, maxNrOfHousesOnSingleEstate) * descriptor.housePrice * 0.5;
    return {
        money: (descriptor.hotelPrice / 2) + (cashForHouses) + (descriptor.price / 2),
        nrOfHotels: 1,
        nrOfHouses: 0,
    }
}

const calculateCashForAllEstatesFromTheBank = (descriptorsArray, playerColor, housesInPool) => {
    return descriptorsArray.reduce((acc, estate) => {
        const singleResult = calculateCashForSingleEstateFromTheBank(estate, playerColor, housesInPool);
        acc.nrOfHotels += singleResult.nrOfHotels;
        acc.nrOfHouses += singleResult.nrOfHouses;
        acc.money += singleResult.money;
        return acc;
    }, {nrOfHotels:0, nrOfHouses:0, money:0})
}

const countAllPropertiesPlayerHas = (descriptorsArray, playerColor) => {
    return descriptorsArray.reduce((acc, estate) => {
        if (estate.owner === playerColor) acc++;
        return acc;
    }, 0)
}


const descriptors = {
    Start: {
        type: otherTypes.START,
        boardFieldNumber: 1,
        visit: [-400],
        info: `You stop on the otherTypes.START field, that means You get  $400. Notihing to do here.`,
    },
    Ateny: {
        type: estateTypes.CITY,
        country: countries.greece,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2, // 2 cities in the country
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        boardFieldNumber: 2,
        isPlegded: false, // zastawiony
    },
    Chance_blue: {
        type: chanceTypes.CHANCE_BLUE,
        info: 'Draw a blue chance card'
    },
    Chance_red: {
        type: chanceTypes.CHANCE_RED,
        info: 'Draw a red chance card',
    },
    Chance_blue_left: {
        type: chanceTypes.CHANCE_BLUE,
        info: 'Draw a blue chance card',
    },
    Chance_red_left: {
        type: chanceTypes.CHANCE_RED,
        info: 'Draw a red chance card',
    },
    Chance_blue_top: {
        type: chanceTypes.CHANCE_BLUE,
        info: 'Draw a blue chance card',
    },
    Chance_red_top: {
        type: chanceTypes.CHANCE_RED,
        info: 'Draw a red chance card',
    },
    Chance_blue_right: {
        type: chanceTypes.CHANCE_BLUE,
        info: 'Draw a blue chance card',
    },
    Chance_red_right: {
        type: chanceTypes.CHANCE_RED,
        info: 'Draw a red chance card',
    },
    Saloniki: {
        country: countries.greece,
        type: estateTypes.CITY,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
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
        type: otherTypes.FREE_PARK,
        boardFieldNumber: 11,
        visit: [0],
        wait: 1,
        info: 'You spend one extra turn here. The only good news is, there is no fee for staying here',
    },
    Jail: {
        type: otherTypes.JAIL,
        boardFieldNumber: 11,
        wait: 2,
        info: 'You spend 2 extra turns here.',
    },
    Go_to_jail: {
        type: otherTypes.GO_TO_JAIL,
        boardFieldNumber: 31,
        info: 'You go to field 11, jail and spend 2 extra turns there.'
    },
    South_Railways: {
        country: notCountryTypes.railways,
        type: estateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 6,
        isPlegded: false,
    },
    Neapol: {
        country: countries.italy,
        type: estateTypes.CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 7,
        isPlegded: false,
    },
    Mediolan: {
        country: countries.italy,
        type: estateTypes.CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,        
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 9,
        isPlegded: false,
    },
    Rome: {
        country: countries.italy,
        type: estateTypes.CITY,
        price: 240,
        mortage: 120,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 20, 80, 200, 600, 900, 1200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 10,
        isPlegded: false,
    },
    Barcelona: {
        country: countries.spain,
        type: estateTypes.CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 12,
        isPlegded: false,
    },
    Power_Station: {
        country: notCountryTypes.plant,
        type: estateTypes.POWER_STATION,
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 13,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },
    Sewilla: {
        country: countries.spain,
        type: estateTypes.CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 14,
        isPlegded: false,
    },
    Madrit: {
        country: countries.spain,
        type: estateTypes.CITY,
        price: 320,
        mortage: 160,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 25, 120, 360, 1000, 1400, 1800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 15,
        isPlegded: false,
    },
    West_Railways: {
        country: notCountryTypes.railways,
        type: estateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 16,
        isPlegded: false,
    },
    Liverpool: {
        country: countries.uk,
        type: estateTypes.CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 17,
        isPlegded: false,
    },
    Glasgow: {
        country: countries.uk,
        type: estateTypes.CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 19,
        isPlegded: false,
    },
    London: {
        country: countries.uk,
        type: estateTypes.CITY,
        price: 400,
        mortage: 200,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 35, 160, 440, 1200, 1600, 2000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 20,
        isPlegded: false,
    },
    Rotterdam: {
        country: countries.benelux,
        type: estateTypes.CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 22,
        isPlegded: false,
    },
    Bruksela: {
        country: countries.benelux,
        type: estateTypes.CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 24,
        isPlegded: false,
    },
    Amsterdam: {
        country: countries.benelux,
        type: estateTypes.CITY,
        price: 480,
        mortage: 240,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 40, 200, 600, 1500, 1850, 2200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 25,
        isPlegded: false,
    },
    North_Railways: {
        country: notCountryTypes.railways,
        type: estateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 26,
        isPlegded: false,
    },
    Malmo: {
        country: countries.sweeden,
        type: estateTypes.CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 27,
        isPlegded: false,
    },
    Goteborg: {
        country: countries.sweeden,
        type: estateTypes.CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 28,
        isPlegded: false,
    },
    Water_Plant: {
        country: notCountryTypes.plant,
        type: estateTypes.WATER_PLANT,
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 29,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },
    Sztokholm: {
        country: countries.sweeden,
        type: estateTypes.CITY,
        price: 560,
        mortage: 280,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 50, 240, 720, 1700, 2050, 2400 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        isPlegded: false,
        boardFieldNumber: 30,
    },
    Frankfurt: {
        country: countries.rfn,
        type: estateTypes.CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 32,
        isPlegded: false,
    },
    Kolonia: {
        country: countries.rfn,
        type: estateTypes.CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 33,
        isPlegded: false,
    },
    Bonn: {
        country: countries.rfn,
        type: estateTypes.CITY,
        price: 640,
        mortage: 320,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 50, 300, 900, 2000, 2400, 2800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 35,
        isPlegded: false,
    },
    East_Railways: {
        country: notCountryTypes.railways,
        type: estateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 36,
        isPlegded: false,
    },
    Insbruk: {
        country: countries.austria,
        type: estateTypes.CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 38,
        isPlegded: false,
    },
    Tax: {
        type: otherTypes.TAX,
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
    },
    Wieden: {
        country: countries.austria,
        type: estateTypes.CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
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
    'Free_Parking', 'Rotterdam', 'Chance_red_top', 'Bruksela', 'Amsterdam', 'North_Railways', 'Malmo', 'Goteborg', 'Water_Plant', 'Sztokholm', 
    'Jail', 'Frankfurt', 'Kolonia', 'Chance_blue_right', 'Bonn', 'East_Railways', 'Chance_red_right', 'Insbruk', 'Tax', 'Wieden'
]

export { 
    boardInOrder, 
    descriptors,
    getNrOfCitiesPlayerHas, 
    assumpVisitFeeChecker,
    assumpWaterPlantVisitFee,
    countExectVisitFeeChecker,
    countWaterPlantVisitFee,
    countCityVisitFee,
    countRailwayVisitFee,
    throwDices,
    calculateCashForAllEstatesFromTheBank,
    countAllPropertiesPlayerHas,
    types,
    otherTypes,
    estateTypes,
    chanceTypes,
}
