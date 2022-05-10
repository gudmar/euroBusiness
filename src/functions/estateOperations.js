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
    console.log('IS NOT too big', max.val - min.val)
    return max.val - min.val > 1
}

const hasMandatoryKeys = obj => mandatoryKeys.every(key => Object.keys(obj).find(item => item === key));

const recalculateNrOfHousesToBuySell = (fieldDescriptors, country) => {
    const nameForError = 'estateOperations.recalculateNrOfHouses';
    const eachCondition = condition => fieldDescriptors.every(item => condition(item))
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


    


    
}

export {
    hasMandatoryKeys,
    recalculateNrOfHousesToBuySell,
    getCities,
    getMinMaxNrOfHouses,
}