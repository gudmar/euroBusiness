import {recalculateNrOfHousesToBuySell, hasMandatoryKeys,} from '../estateOperations.js'
import testState from '../../state/__test__/stateForTests';
const cp = obj => JSON.parse(JSON.stringify(obj))
const getStateArray = () => {
    return Object.keys(testState).map(
    (key) => {
        const output = {};
        output.id = key;
        return Object.assign(output, testState[key])
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
        console.log('TEST Stte', getStateArray())
        const result = recalculateNrOfHousesToBuySell(cp(getStateArray()), 'Railway');
        expect(result).toEqual(getStateArray());
    })
    
})
