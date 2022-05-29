import {
    countries,
    isACountry
} from './countryTypes.js'


const getCities = (descriptors, country) => descriptors.filter(item => item.country === country);

const mandatoryKeys = [
    'type', 
    'country', 
    'mortage', 
    'housePrice', 
    'hotelPrice', 
    'owner', 
    'nrOfHouses',
    'nrOfHousesToPurchase', 
    'nrOfHousesToSell', 
    'isPlegded'
]

const getMinMaxNrOfHouses = citiesArray => {
    if (!Array.isArray(citiesArray)) throw new Error('estateOperations, getMinMaxNrOfHouses: arg is not an array');
    if (citiesArray.length === 0) throw new Error('estateOperations, getMinMaxNrOfHouses: arg is empty');
    const min = {val: 99, city: citiesArray[0].id};
    const max = {val: 0, city: citiesArray[0].id};
    citiesArray.forEach(city => {
        if (city.nrOfHouses === undefined || city.id === undefined) throw new Error('estateOperations, getMinMaxNrOfHouses: array element does not have id or nrOfHouses')
        if (city.nrOfHouses > max.val) {
            max.city = city.id;
            max.val = city.nrOfHouses;
        }
        if (city.nrOfHouses < min.val) {
            min.city = city.id;
            min.val = city.nrOfHouses;
        }
    })
    return { min:min, max:max }
}
const isNrOfHousesDifferenceTooBig = citiesArray => {
    const { min, max } = getMinMaxNrOfHouses(citiesArray);
    return max.val - min.val > 1
}

const hasMandatoryKeys = obj => mandatoryKeys.every(key => Object.keys(obj).find(item => item === key));

const recalculateNrOfHousesToBuySell = (fieldDescriptors, country) => {
    const MAX_NR_HOUSES = 4; // for hotel
    const MIN_NR_HOUSES = 0;
    const nameForError = 'estateOperations.recalculateNrOfHouses';
    if (fieldDescriptors === undefined || fieldDescriptors === null || !Array.isArray(fieldDescriptors)) {
        throw new Error(`${nameForError}: fieldDescriptor is null, undefined, or cannot be converted to array of values`);
    }
    const allEstatesFromCountry = getCities(fieldDescriptors, country);
    const eachCondition = condition => allEstatesFromCountry.every(item => condition(item));
    const someCondition = condition => allEstatesFromCountry.some(item => condition(item));
    if (!isACountry(country)) return fieldDescriptors;
    for(let estate of allEstatesFromCountry) {
        if (!hasMandatoryKeys(estate)) throw new Error(`${nameForError}: at leas one of cities has not all mandatory keys`)
    }
    if (isNrOfHousesDifferenceTooBig(allEstatesFromCountry)) throw new Error(`${nameForError} too big difference between the nr of houses in ${country}`);
    // const citiesArray = getCities(fieldDescriptors, country);
    // if (isNrOfHousesDifferenceTooBig(citiesArray)) throw new Error(`${nameForError} too big difference between the nr of houses in ${country}`);

    if (!eachCondition(item => item.owner === allEstatesFromCountry[0].owner)) {
        allEstatesFromCountry.forEach(item => {
            item.nrOfHousesToSell = 0;
            item.nrOfHousesToPurchase = 0;
            item.nrOfHotelsToBuy = 0;
            item.nrOfHotelsToSell = 0;
        })
        return fieldDescriptors;
    }
    if (someCondition(item => item.owner === 'bank')){
        allEstatesFromCountry.forEach(item => {
            item.nrOfHousesToSell = 0;
            item.nrOfHousesToPurchase = 0;
            item.nrOfHotelsToBuy = 0;
            item.nrOfHotelsToSell = 0;
        })
        return fieldDescriptors;        
    }

        const minNrHouses = Math.min(...allEstatesFromCountry.map(city => city.nrOfHouses));
        const maxNrHouses = Math.max(...allEstatesFromCountry.map(city => city.nrOfHouses));
        const getNrOfHouses = (currentNrHouses) => {
            
            if (currentNrHouses > MAX_NR_HOUSES) return {housesSell: 0, housesBuy: 0, hotelsBuy: 0, hotelsSell: 1}
            if (currentNrHouses === MAX_NR_HOUSES && minNrHouses < MAX_NR_HOUSES) return {housesSell: 1, housesBuy: 0, hotelsBuy: 1, hotelsSell: 0}
            if (currentNrHouses === MAX_NR_HOUSES) return {housesSell: 1, housesBuy: 0, hotelsBuy: 1, hotelsSell: 0}
            if (currentNrHouses === MIN_NR_HOUSES) return {housesSell: 0, housesBuy: 1, hotelsSell: 0, hotelsBuy: 0}
            if (currentNrHouses === maxNrHouses && maxNrHouses === minNrHouses) return {housesSell: 1, housesBuy: 1,  hotelsSell: 0, hotelsBuy: 0}
            if (currentNrHouses === maxNrHouses) return {housesSell: 1, housesBuy: 0, hotelsSell: 0, hotelsBuy: 0}
            return {housesSell: 0, housesBuy: 1, hotelsBuy: 0, hotelsSell: 0}
        }
        allEstatesFromCountry.forEach(item => {
            const allowedShopping = getNrOfHouses(item.nrOfHouses);
            item.nrOfHousesToPurchase = allowedShopping.housesBuy;
            item.nrOfHousesToSell = allowedShopping.housesSell;
            item.nrOfHotelsToBuy = allowedShopping.hotelsBuy;
            item.nrOfHotelsToSell = allowedShopping.hotelsSell;
        })
        console.log('FieldDescirptor', fieldDescriptors)
        return fieldDescriptors;


    }

export {
    hasMandatoryKeys,
    recalculateNrOfHousesToBuySell,
    getCities,
    getMinMaxNrOfHouses,
}