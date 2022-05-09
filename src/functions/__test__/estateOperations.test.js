import {recalculateNrOfHousesToBuySell, hasMandatoryKeys, getCities, getMinMaxNrOfHouses} from '../estateOperations.js'
import testState from '../../state/__test__/stateForTests';
const cp = obj => JSON.parse(JSON.stringify(obj))
const getStateArray = (state) => {
    return Object.keys(state).map(
    (key) => {
        const output = {};
        output.id = key;
        return Object.assign(output, state[key])
    }
)}
describe('setateOperations: hasMandatoryKeys', () => {
    const testObject = {
        type: 'city', country: 'UK', mortage: false,
        housePrice: '200', hotelPrice: 200,
        owner: 'Bolek', nrOfHouses: 0, nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0, isPlegded: false,
    }
    it('Should return false if type is missing', () => {
        const obj = cp(testObject);
        delete obj.type;
        const result = hasMandatoryKeys(obj);
        expect(result).toBe(false);
    });
    it('Should return false if owner is missing', () => {
        const obj = cp(testObject);
        delete obj.owner;
        const result = hasMandatoryKeys(obj);
        expect(result).toBe(false);        
    })
    it('Should return true in case none of keys is missing', () => {
        const obj = cp(testObject);
        const result = hasMandatoryKeys(obj);
        expect(result).toBe(true);
    })
    it('Should return true if there are more that only mandatory keys', () => {
        const obj = cp(testObject);
        obj.price = 120;
        obj.visit = [10,20,30,40,50];
        obj.boardFieldNumber = '5';
        const result = hasMandatoryKeys(obj);
        expect(result).toBe(true)
    })
})

describe('estateOperations: getMinMaxNrOfHouses', () => {
    it('Should return min 3 Frankfurt max 5 Berlin', () => {
        const stateTemplate = cp(testState);
        stateTemplate.Berlin.nrOfHouses = 5;
        stateTemplate.Frankfurt.nrOfHouses = 3;
        stateTemplate.Munich.nrOfHouses = 3;
        const germanCities = [
            {id: 'Berlin', ...stateTemplate.Berlin},
            {id: 'Frankfurt', ...stateTemplate.Frankfurt}, 
            {id: 'Munich', ...stateTemplate.Munich}
        ]
        const result = getMinMaxNrOfHouses(germanCities);
        expect(result.min).toEqual({val: 3, city: 'Frankfurt'});
        expect(result.max).toEqual({val: 5, city: 'Berlin'});
    }),
    it('Should return min 3 Kalisz, max 3 Kalisz in case only one city passed', () => {
        const oneCity = [
            {id: 'Kalisz', nrOfHouses: 3}
        ]
        const result = getMinMaxNrOfHouses(oneCity);
        expect(result.max).toEqual({val: 3, city: 'Kalisz'});
        expect(result.min).toEqual({val: 3, city: 'Kalisz'});
    })
    it('Should throw an error in case an empty array is passed', () => {
        const result = () => getMinMaxNrOfHouses([]);
        expect(result).toThrow('estateOperations, getMinMaxNrOfHouses: arg is empty');
    })
    it('Should throw an error in case not an array is passed', () => {
        const result = () => getMinMaxNrOfHouses();
        expect(result).toThrow('estateOperations, getMinMaxNrOfHouses: arg is not an array');
    })
    it('Should throw an error in case passed array has no nrOfHouses or id props', () => {
        const result = () => getMinMaxNrOfHouses(['','']);
        expect(result).toThrow('estateOperations, getMinMaxNrOfHouses: array element does not have id or nrOfHouses');
    })
})

describe('estateOperations: getCities', () => {
    it('Should return only cities from desired country', () => {
        const state = getStateArray(testState);
        const result = getCities(state, 'Germany');
        const nrOfCountryCities = (descriptor, country) => descriptor.reduce((acc, city) => {
            if(city.country === country) acc = acc + 1;
            return acc;4
        }, 0)
        const nrOfGermanCities = nrOfCountryCities(state, 'Germany');
        const nrOfGermanCitiesResult = nrOfCountryCities(result, 'Germany');
        expect(nrOfGermanCitiesResult).toBe(nrOfGermanCities)
    })
})

describe('estateOperations: recalculateNrOfHouses', () => {
    it('Should Throw and error in case fieldDescriptors is undefined, null or not convertable to array', () => {
        const resultUndef = () => recalculateNrOfHousesToBuySell(undefined, 'Germany');
        const resultNull = () => recalculateNrOfHousesToBuySell(null, 'Germany');
        const resultPrimitive = () => recalculateNrOfHousesToBuySell(undefined, 'Germany');
        expect(resultUndef).toThrow();
        expect(resultNull).toThrow();
        expect(resultPrimitive).toThrow();
    });
    it('Should return the same object in case not a country is passed as a second arg', () => {
        const result = recalculateNrOfHousesToBuySell(cp(getStateArray(testState)), 'Railway');
        expect(result).toEqual(getStateArray(testState));
    })
    // it('Should throw an error in case there is a difference in max nr of houses and min nr of houses in the same country of more then 1', () => {
    //     const stateTemplate = cp(testState);
    //     stateTemplate.Berlin.nrOfHouses = 5;
    //     stateTemplate.Frankfurt.nrOfHouses = 3;
    //     const state = getStateArray(stateTemplate);
    //     const result = () => recalculateNrOfHousesToBuySell(state);
    //     console.log('RESULT', stateTemplate)
    //     expect(result).toThrow();
    // })
    
})
