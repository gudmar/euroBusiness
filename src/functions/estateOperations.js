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
    const MAX_NR_HOUSES = 5; // for hotel
    const MIN_NR_HOUSES = 0;
    const nameForError = 'estateOperations.recalculateNrOfHouses';
    const eachCondition = condition => fieldDescriptors.every(item => condition(item));
    const someCondition = condition => fieldDescriptors.some(item => condition(item));
    if (fieldDescriptors === undefined || fieldDescriptors === null || !Array.isArray(fieldDescriptors)) {
        throw new Error(`${nameForError}: fieldDescriptor is null, undefined, or cannot be converted to array of values`);
    }
    if (!isACountry(country)) return fieldDescriptors;
    const allEstates = getCities(fieldDescriptors, country);
    for(let estate of allEstates) {
        if (!hasMandatoryKeys(estate)) throw new Error(`${nameForError}: at leas one of cities has not all mandatory keys`)
    }
    const citiesArray = getCities(fieldDescriptors, country);
    if (isNrOfHousesDifferenceTooBig(citiesArray)) throw new Error(`${nameForError} too big difference between the nr of houses in ${country}`);

    if (!eachCondition(item => item.owner === fieldDescriptors[0].owner)) {
        fieldDescriptors.forEach(item => {
            item.nrOfHousesToSell = 0;
            item.nrOfHousesToPurchase = 0;
        })
        return fieldDescriptors;
    }
    if (someCondition(item => item.owner === 'bank')){
        fieldDescriptors.forEach(item => {
            item.nrOfHousesToSell = 0;
            item.nrOfHousesToPurchase = 0;
        })
        return fieldDescriptors;        
    }

    if (eachCondition(item => item.owner === fieldDescriptors[0].owner)){
        // if (eachCondition(
        //     item => (
        //         item.nrOfHouses === fieldDescriptors[0].nrOfHouses && 
        //         item.nrOfHouses > MIN_NR_HOUSES && 
        //         item.nrOfHouses < MAX_NR_HOUSES 
        //     ) 
        // )) {
        //     fieldDescriptors.forEach(item => {
        //         item.nrOfHousesToSell = 1;
        //         item.nrOfHousesToPurchase = 1;
        //     })
        //     return fieldDescriptors; 
        // }

        // if (eachCondition(
        //     item => (
        //         item.nrOfHouses === fieldDescriptors[0].nrOfHouses && 
        //         item.nrOfHouses === MAX_NR_HOUSES
        //     ) 
        // )) {
        //     fieldDescriptors.forEach(item => {
        //         item.nrOfHousesToSell = 1;
        //         item.nrOfHousesToPurchase = 0;
        //     })
        //     return fieldDescriptors; 
        // }

        // if (eachCondition(
        //     item => (
        //         item.nrOfHouses === fieldDescriptors[0].nrOfHouses && 
        //         item.nrOfHouses === MIN_NR_HOUSES
        //     ) 
        // )) {
        //     fieldDescriptors.forEach(item => {
        //         item.nrOfHousesToSell = 0;
        //         item.nrOfHousesToPurchase = 1;
        //     })
        //     return fieldDescriptors; 
        // }

        const minNrHouses = Math.min(...fieldDescriptors.map(city => city.nrOfHouses));
        const maxNrHouses = Math.max(...fieldDescriptors.map(city => city.nrOfHouses));
        const getNrOfHouses = (currentNrHouses) => {
            
            if (currentNrHouses === MAX_NR_HOUSES) return {sell: 1, buy: 0}
            if (currentNrHouses === MIN_NR_HOUSES) return {sell: 0, buy: 1}
            if (currentNrHouses === maxNrHouses && maxNrHouses === minNrHouses) return {sell: 1, buy: 1}
            if (currentNrHouses === maxNrHouses) return {sell: 1, buy: 0}
            return {sell: 0, buy: 1}
        }
        fieldDescriptors.forEach(item => {
            const allowedShopping = getNrOfHouses(item.nrOfHouses);
            item.nrOfHousesToPurchase = allowedShopping.buy;
            item.nrOfHousesToSell = allowedShopping.sell;
        })
        return fieldDescriptors;


    }
    
}

export {
    hasMandatoryKeys,
    recalculateNrOfHousesToBuySell,
    getCities,
    getMinMaxNrOfHouses,
}