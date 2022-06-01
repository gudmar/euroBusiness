import  {
    areAllEstatesSamePlayer,
    getSameSetOfSameType,
    getTargetPlayerBelongings,
    doAllBelongToSamePlayer,
}  from '../sameSortGetter.js';
import testState  from '../../state/__test__/stateForTests.js';
const testSet1 = testState;


describe('sameSortGetter: areAllEstatesSamePlayer', () => {

    it('Should return true if owner is Bolek and Greece', () => {
        const descriptor = testSet1['Ateny'];
        const player = 'Bolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(true);
    });
    it('Should return false if player undefined', () => {
        const descriptor = testSet1['Antarktyda'];
        const player = undefined;
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player Lolek, as Barcelona belongs to Reksio', () => {
        const descriptor = testSet1['Madryt'];
        const player = 'Lolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player is not Reksio', () => {
        const descriptor = testSet1['Barcelona'];
        const player = 'Lolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return fasle if player is Romek', () => {
        const descriptor = testSet1['Kolonia'];
        const player = 'Romek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return true if player is mr Been', () => {
        const descriptor = testSet1['Glasgow'];
        const player = 'Mr Been';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(true);
    })
})

describe('sameSortGetter: getSameSetOfSameType should return proper values', () => {
    it('Should return London, Glasgow, Liverpool if keyToMatch is London, or Galsgow', () => {
        const result1 = getSameSetOfSameType(testSet1, 'London');
        const {London, Glasgow, Liverpool} = testSet1;
        const expected = { London, Glasgow, Liverpool }
        expect(result1).toEqual(expected);
    });
    it('Sould return all railways', () => {
        const result = getSameSetOfSameType(testSet1, 'South_Railways');
        const { South_Railways, North_Railways, West_Railways, East_Railways } = testSet1;
        const expected = { South_Railways, North_Railways, West_Railways, East_Railways };
        expect(result).toEqual(expected);
    });
    it('Should return water and power plant', () => {
        const result = getSameSetOfSameType(testSet1, 'Power_Station');
        const {Power_Station, Water_Plant} = testSet1;
        const expected = { Power_Station, Water_Plant };
        expect(result).toEqual(expected);
    });
})

describe('sameSortGetter: getTargetPlayerBelongings', () => {
    it('Should return all Boleks belongings', () => {
        const { Saloniki, Ateny } = testSet1;
        const expected = {Saloniki, Ateny};
        expect(expected).toEqual(getTargetPlayerBelongings(testSet1, 'Bolek'));
    });
    it('Should return all bank estates', () => {
        const { Power_Station, Water_Plant, East_Railways, South_Railways,North_Railways, West_Railways } = testSet1;
        const expected = { Power_Station, Water_Plant, East_Railways, South_Railways,North_Railways, West_Railways };
        const result = getTargetPlayerBelongings(testSet1, 'bank');
        expect(expected).toEqual(result)
    })
})

describe('sameSortGetter: soAllBelongToSamePlayer should work as expected', () => {
    it('Should return true for Saloniki', () => {
        const result = doAllBelongToSamePlayer(testSet1, 'Saloniki');
        expect(result).toBe(true);
    });
    it('Should return true for railways (warning: belongs to bank)', () => {
        const result = doAllBelongToSamePlayer(testSet1, 'South_Railways');
        expect(result).toBe(true)
    })
})



