import {recalculateNrOfHousesToBuySell, hasMandatoryKeys, getCities, getMinMaxNrOfHouses} from '../estateOperations.js'
import testState from '../../state/__test__/stateForTests';
const _countries = require('../countryTypes.js');

const cp = obj => JSON.parse(JSON.stringify(obj))
const getStateArray = (state) => {
    return Object.keys(state).map(
    (key) => {
        const output = {};
        output.id = key;
        return Object.assign(output, state[key])
    }
)}

const isACountry_local = (country) => {
    const countries = {
        greece:'Greece', spain: 'Spain', germany: 'Germany', uk: 'UK',
    }    
    return Object.values(countries).find(val => val === country);
}
const isACountry = jest.spyOn(_countries, 'isACountry').mockImplementation(isACountry_local)

expect.extend({
    arrayContainsObjectsContaining(received, objectWithKeys) {
        let indexOfDifference = -1;
        let keyOfDifference = '';
        let valueOfDifference = '';
        const singleMatch = (toCompare, template) => {
            const templateKeys = Object.keys(template);
            const toCompareKeys = Object.keys(toCompare);
            return templateKeys.reduce((acc, key) => {
                if (!acc) return false;
                if (toCompareKeys.find(item => key === item) === undefined) {
                    keyOfDifference = key;
                    acc = false; return false;
                }
                if (toCompare[key] !== template[key]) {
                    keyOfDifference = key;
                    valueOfDifference = template[key]
                    acc = false; return false;
                }
                return true;
            }, true) 
        }
        const result = objectWithKeys.reduce((acc, item) => {
            const isFound = received.find((receivedItem, index) => {
                indexOfDifference = index;
                return singleMatch(receivedItem, item)
            });
            if (!isFound) {
                acc = false; return false;
            };
            return acc;
        }, true)
        return {
            pass: result,
            message: () => {
                if (result) return 'Passed';
                return `Difference at ${indexOfDifference}, ${keyOfDifference} ${valueOfDifference ? ' ' + valueOfDifference : ''}`;
            }
        }
    }
})
describe('testing arrayContainsObjectsContaining matcher', () => {
    const testCases = [
        {
            template: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
            ],
            objectToTest: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
            ],
            msg: 'Should return true if identical objects passed',
            expected: true
        },
        {
            template:[
                {a: 1, b: 2, c: 3},
                {a: 1, b: 2}
            ],
            objectToTest: [
                {a: 1, b: 2},
                {a: 1, b: 2, c: 3},
            ],
            msg: 'Should return true in case identical arrays with order changed',
            expected: true
        },
        {
            template:[
                {a: 1, b: 2, c: 3},
                {a: 1, b: 3}
            ],
            objectToTest: [
                {a: 1, b: 2},
                {a: 1, b: 2, c: 3},
            ],
            msg: 'Should return false if arrays with order switched and one value changed',
            expected: false 
        },
        {
            template: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
            ],
            objectToTest: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, g: 6}
            ],
            msg: 'Should return false if a key is missing in the result',
            expected: false 
        },
        {
            template: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6},
                {e: 1, f: 2, g: 3, h: 4, i: 5},
                {t: 1, y: 2, u: 3, i: 4, o: 5},
            ],
            objectToTest: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6},
                {t: 1, y: 2, u: 3, i: 4, o: 5},
            ],
            msg: 'Should return false index is missing in the result',
            expected: false 
        },
        {
            template: [
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6},
                {e: 1, f: 2, g: 3, h: 4, i: 5},
                {t: 1, y: 2, u: 3, i: 4, o: 5},
            ],
            objectToTest: [
                {a: 1, b: 2, c: 3, d: 4, f: 6, e: 5},
                {e: 1, g: 3, h: 4, f: 2, i: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5},
                {t: 1, y: 2, u: 3, i: 4, o: 5},
            ],
            msg: 'Should return true if keys and rows have switched order',
            expected: true
        },
        {
            template: [
                {a: 9, b: 8, c: 7, d: 4, e: 5},
                {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6},
                {e: 1, f: 2, g: 3, h: 4, i: 5},
                
            ],
            objectToTest: [
                {a: 1, b: 2, c: 3, d: 4, f: 6, e: 5},
                {e: 1, g: 3, h: 4, f: 2, i: 5},
                {a: 9, b: 8, c: 7, d: 4, e: 5},
                {t: 1, y: 2, u: 3, i: 4, o: 5},
            ],
            msg: 'Should return true in case of template matching result but keys having different values ',
            expected: true
        },
        {
            template: [
                    {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0},
                    {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1},
                    {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1},            
            ],
            objectToTest: [

                    {
                        id: 'Berlin',
                        country: 'Germany',
                        owner: 'Tytus',
                        type: 'city',
                        mortage: false,
                        housePrice: 100,
                        hotelPrice: 100,
                        nrOfHouses: 3,
                        nrOfHousesToPurchase: 0,
                        nrOfHousesToSell: 1,
                        isPlegded: false
                    },
                    {
                        id: 'Frankfurt',
                        country: 'Germany',
                        owner: 'Tytus',
                        type: 'city',
                        mortage: false,
                        housePrice: 100,
                        hotelPrice: 100,
                        nrOfHouses: 2,
                        nrOfHousesToPurchase: 1,
                        nrOfHousesToSell: 0,
                        isPlegded: false
                    },
                    {
                        id: 'Munich',
                        country: 'Germany',
                        owner: 'Tytus',
                        type: 'city',
                        mortage: false,
                        housePrice: 100,
                        hotelPrice: 100,
                        nrOfHouses: 2,
                        nrOfHousesToPurchase: 1,
                        nrOfHousesToSell: 0,
                        isPlegded: false
                    }
                ],
                msg: 'Should return true: real life example',
                expected: true
    
        }
 
    ]
    testCases.forEach( testCase => {
        it(testCase.msg, () => {
            testCase.expected ?
            expect(testCase.objectToTest).arrayContainsObjectsContaining(testCase.template) :
            expect(testCase.objectToTest).not.arrayContainsObjectsContaining(testCase.template)
        })
    })
})

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
    let stateTemplate = undefined;
    let germanCities = undefined;
    const setGermanCities = () => {
        stateTemplate = cp(testState);
        germanCities = [
            {id: 'Berlin', ...stateTemplate.Berlin},
            {id: 'Frankfurt', ...stateTemplate.Frankfurt}, 
            {id: 'Munich', ...stateTemplate.Munich},
            {id: 'Ateny', ...stateTemplate.Ateny},
            {id: 'Saloniki', ...stateTemplate.Saloniki},
            {id: 'London', ...stateTemplate.London},
            {id: 'Glasgow', ...stateTemplate.Glasgow},
            {id: 'Liverpool', ...stateTemplate.Liverpool},
        ]    
    }
    const setGermanCitiesWithOwners = (nrOfHousesEach, owner) => {
        stateTemplate = cp(testState);
        Object.values(stateTemplate).forEach(city => {
            if (city.country === 'Germany'){
                city.owner = owner;
                city.nrOfHouses = nrOfHousesEach;    
            }
        });
        germanCities = [
            {id: 'Berlin', ...stateTemplate.Berlin},
            {id: 'Frankfurt', ...stateTemplate.Frankfurt}, 
            {id: 'Munich', ...stateTemplate.Munich},
            {id: 'Ateny', ...stateTemplate.Ateny},
            {id: 'Saloniki', ...stateTemplate.Saloniki},
            {id: 'London', ...stateTemplate.London},
            {id: 'Glasgow', ...stateTemplate.Glasgow},
            {id: 'Liverpool', ...stateTemplate.Liverpool},

        ]            
    };
    const setGermanCitiesDifferentHouseNrs = ({berlinNrHouses, munichNrHouses, frankfurtNrHouses}) => {
        stateTemplate = cp(testState);

        // const nrOfBuildings = nrOfHouses => nrOfHouses === 5 ? {
        //     nrOfHousesToSell: 0,
        //     nrOfHousesToPurchase: 0,
        //     nrOfHotelsToSell: 1,
        //     nrOfHotelsToBuy: 0,
        //     nrOfHouses: 5
        // } : {

        // }
        
        Object.keys(stateTemplate).forEach(key => {
            stateTemplate[key].owner = 'Tytus';
            if (key === 'Berlin') stateTemplate[key].nrOfHouses = berlinNrHouses;
            if (key === 'Frankfurt') stateTemplate[key].nrOfHouses = frankfurtNrHouses;
            if (key === 'Munich') stateTemplate[key].nrOfHouses = munichNrHouses;
        });
        germanCities = [
            {id: 'Berlin', ...stateTemplate.Berlin},
            {id: 'Frankfurt', ...stateTemplate.Frankfurt}, 
            {id: 'Munich', ...stateTemplate.Munich},
            {id: 'Ateny', ...stateTemplate.Ateny},
            {id: 'Saloniki', ...stateTemplate.Saloniki},
            {id: 'London', ...stateTemplate.London},
            {id: 'Glasgow', ...stateTemplate.Glasgow},
            {id: 'Liverpool', ...stateTemplate.Liverpool},
        ]
        return germanCities;
    }

    const getNrOfEstateOperations = citiesArr => citiesArr.map(
        city => (
            {
                id: city.id, 
                nrOfHousesToPurchase: city.nrOfHousesToPurchase, 
                nrOfHousesToSell: city.nrOfHousessToSell,
                nrOfHotelsToBuy: city.nrOfHotelsToBuy,
                nrOfHotelsToSell: city.nrOfHotelsToSell,
            }
        )
    )

    it('Should Throw an error in case fieldDescriptors is undefined, null or not convertable to array', () => {
        const resultUndef = () => recalculateNrOfHousesToBuySell(undefined, 'Germany');
        const resultNull = () => recalculateNrOfHousesToBuySell(null, 'Germany');
        const resultPrimitive = () => recalculateNrOfHousesToBuySell(undefined, 'Germany');
        const resultObject = () => recalculateNrOfHousesToBuySell({}, 'Germany');
        const expectedErrorMsg = 'estateOperations.recalculateNrOfHouses: fieldDescriptor is null, undefined, or cannot be converted to array of values';
        expect(resultUndef).toThrow(expectedErrorMsg);
        expect(resultNull).toThrow(expectedErrorMsg);
        expect(resultPrimitive).toThrow(expectedErrorMsg);
        expect(resultObject).toThrow(expectedErrorMsg);
    });
    it('Should return the same object in case not a country is passed as a second arg', () => {
        const result = recalculateNrOfHousesToBuySell(cp(getStateArray(testState)), 'Railway');
        expect(result).toEqual(getStateArray(testState));
    })
    it('Should throw an error in case there is a difference in max nr of houses and min nr of houses in the same country of more then 1', () => {
        stateTemplate = cp(testState);
        stateTemplate.Berlin.nrOfHouses = 5;
        stateTemplate.Frankfurt.nrOfHouses = 3;
        stateTemplate.Munich.nrOfHouses = 3;
        germanCities = [
            {id: 'Berlin', ...stateTemplate.Berlin},
            {id: 'Frankfurt', ...stateTemplate.Frankfurt}, 
            {id: 'Munich', ...stateTemplate.Munich}
        ] 
        const result = () => recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        expect(result).toThrow();
    })

    it('Should set nrOfHousesToPurchase and nrOfHousesToSell, nrOfHotelsToBuy, nrOfHotelsToSell to 0 in case of different owners', () => {
        setGermanCities();
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const filteredResult = getNrOfEstateOperations(result);
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    });

    it('Should return 0 to sell and 0 to purchase if owner of each city is bank', () => {
        setGermanCitiesWithOwners(0, 'bank');
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0}, 
            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it(`In case of same owner, equal nr of houses === 2 should set nrOfHousesToSell to 1, nrOfHousesToPurchase to 1 nrOfHotelsToSell: 0, nrOfHotelsToBuy: 0`, () => {
        setGermanCitiesWithOwners(2, 'Bolek');
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},

            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    });
    it(`In case of same owner, equal nr of houses === 4 should set nrOfHousesToSell to 1, nrOfHousesToPurchase to 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0`, () => {
        setGermanCitiesWithOwners(4, 'Bolek');
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},

            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it(`In case of same owner, equal nr of houses === 0 should set nrOfHousesToSell to 0, nrOfHousesToPurchase to 1, nrOfHotelsToBuy and to nrOfHotelsToSell to 0`, () => {
        setGermanCitiesWithOwners(0, 'Lolek');
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},

            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('Should return housesToSell 1 and housesToPurchase 0 in case of city having more houses than the others in the country. Hotels to buy and purchase set to 0, as middle case', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 3, munichNrHouses: 2,frankfurtNrHouses: 2,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('Should return housesToSell 1 and housesToPurchase 0 in case of city having more houses than the others in the country, other instance, hotels to sell and purchase are 0 as middle case', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 2, munichNrHouses: 3,frankfurtNrHouses: 2,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('Should return housesToSell 1 and housesToPurchase 0 in case of city having more houses than the others in the country, boundry case', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 3, munichNrHouses: 3,frankfurtNrHouses: 4,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},  
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('Should return housesToSell 0 and housesToPurchase 1, hotels to buy and hotels to purchase 0 (not an edge case) in case of city having less houses than the others in the country,', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 1, munichNrHouses: 2,frankfurtNrHouses: 2,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('Should return housesToSell 0 and housesToPurchase 1, hotels to sell 0 and hotels to buy in case of Berlin having 0 houses, Munich having 1 house, Frankfurt having 1 house - boundry case', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 0, munichNrHouses: 1,frankfurtNrHouses: 1,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0}, 
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('550) Should return 1 hotel to sell, 0 hotels and houses to buy for city having a hotel, and 1 hotels to buy 0 houses to sell for citeis having 4 houses. Should return UK cities not touched.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 5, munichNrHouses: 4,frankfurtNrHouses: 4,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0}, 
            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},

        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    
    it('560) Should return 1 hotel to buy, 0 hotels to sell, 1 house to sell in each city, having nrOfHouses set to 4 in each city. Should return UK cities not touched.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 4, munichNrHouses: 4,frankfurtNrHouses: 4,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},

            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('570) Should return 1 hotel to sell, 0 hotels to buy, 0 houses to buy or sell, having 1 hotel in each city (1 hotel === 5 houses). Should return UK cities not touched.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 5, munichNrHouses: 5,frankfurtNrHouses: 5,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},

            {id: 'London', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Liverpool', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Glasgow', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
        ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('580) In case Munich has 4 houses, Berlin and Frankfurt have hotels should return that Munich shouold purchase 1 hotel, Berlin and Frankfrut may sell 1 hotel.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 5, munichNrHouses: 4,frankfurtNrHouses: 5,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 1},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 1, nrOfHotelsToSell: 0},
    ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('590) In case there are no houses in Germany, should suggest to purchase a house in each estate, and not sell any house, not buy or sell any hotel.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 0, munichNrHouses: 0,frankfurtNrHouses: 0,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
    ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('600) In case the only house in Germany is in Frankfurt, should suggest to sell the house in Frankfurt or buy houses in Munich or Berlin', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 0, munichNrHouses: 0,frankfurtNrHouses: 1,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
    ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('610) In case of single houses in Frankfurt and Berlin, and no houses in Munich should suggest to sell houses in Frankfurt and Berlin or buy a house in Munich.', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 1, munichNrHouses: 0,frankfurtNrHouses: 1,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
    ]
        expect(result).arrayContainsObjectsContaining(expected);
    })
    it('620) In case of single houses in each German estate should suggest to sell a house or buy a house in each german estate', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 1, munichNrHouses: 1,frankfurtNrHouses: 1,
        })
        const result = recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        const expected = [
            {id: 'Berlin', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Frankfurt', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
            {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
    ]
        expect(result).arrayContainsObjectsContaining(expected);
    })

    it('630) In case of 3 houses in berlin and 1 hotel in Frankfurt shoul throw an error', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 3, munichNrHouses: 3,frankfurtNrHouses: 5,
        })
        const result = () => recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        expect(result).toThrow();
    })
    it('640) In case of 3 houses in berlin and 1 hotel in Frankfurt shoul throw an error', () => {
        setGermanCitiesDifferentHouseNrs({
            berlinNrHouses: 3, munichNrHouses: 4,frankfurtNrHouses: 5,
        })
        const result = () => recalculateNrOfHousesToBuySell(germanCities, 'Germany');
        expect(result).toThrow();
    })

})

// Missing testCases:

// 4) In case of berlin: 3, frankfurt: 3, munich: 4 should return object allowing selling a house in munich and buying a house in berlin and frankfurt. No hotels are allowed to be bought or sold
// input: setGernamCItiesDifferentHousesNrs({
//     berlinNrHouses: 3, munichNrHouses: 3, frankfurtNrHouses: 4
// })
// output: expected = [
//     {id: 'Berlin', nrOfHousesToSell: 0, nrOfHousesToPurchase: 1, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
//     {id: 'Frankfurt', nrOfHousesToSell: 0, nrOfHousesToPurchase:10, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},
//     {id: 'Munich', nrOfHousesToSell: 1, nrOfHousesToPurchase: 0, nrOfHotelsToBuy: 0, nrOfHotelsToSell: 0},


// 4) In case of 3 houses in berlin and 1 hotel in Frankfurt shoul throw an error
// input: setGernamCItiesDifferentHousesNrs({
//     berlinNrHouses: 3, munichNrHouses: 4, frankfurtNrHouses: 5
// })
// output: expected = Error: 
//    too big difference between the nr of houses in Germany