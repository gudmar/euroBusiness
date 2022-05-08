import {countries} from './countryTypes.js'

const isACountry = (country) => Object.values(countries).find(val => val === country);

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

const hasMandatoryKeys = obj => mandatoryKeys.every(key => Object.keys(obj).find(item => item === key));

const recalculateNrOfHousesToBuySell = (fieldDescriptors, country) => {
    const nameForError = 'estateOperations.recalculateNrOfHouses'
    if (fieldDescriptors === undefined || fieldDescriptors === null || !Array.isArray(Object.values(fieldDescriptors))) {
        throw new Error(`${nameForError}: fieldDescriptor is null, undefined, or cannot be converted to array of values`);
    }
    if (!isACountry(country)) return fieldDescriptors;
    const allEstates = getCities(fieldDescriptors, country);
    for(let estate of allEstates) {
        if (!hasMandatoryKeys(estate)) throw new Error(`${nameForError}: at leas one of cities has not all mandatory keys`)
    }


    
}

export {
    hasMandatoryKeys,
    recalculateNrOfHousesToBuySell
}