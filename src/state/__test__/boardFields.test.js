import testState from './stateForTests.js'
import { 
    getNrOfCitiesPlayerHas,
    // throwDices,
    countWaterPlantVisitFee,
} from '../boardFields.js'

const throwDice = require('../../functions/throwDices.js');


const cp = state => JSON.parse(JSON.stringify(state));


describe('boardFields: getNrOfCitiesPlayerHas', () => {
    //descriptors, player, country

    it('Should return 2/2 in case of Greece and Bolek', () => {
        const state = cp(testState);
        const result = getNrOfCitiesPlayerHas(testState, 'Bolek', 'Greece');
        const expected = {owns: 2, outOf: 2};
        expect(result).toEqual(expected);
    });
    it('Should return 2/3 in case of Lolek and Spain', () => {
        const state = cp(testState);
        const result = getNrOfCitiesPlayerHas(testState, 'Lolek', 'Spain');
        const expected = {owns: 2, outOf: 3};
        expect(result).toEqual(expected);        
    });
    it('Should return 4/4 in case of bank and railway', () => {
        const state = cp(testState);
        const result = getNrOfCitiesPlayerHas(testState, 'bank', 'Railways');
        const expected = {owns: 4, outOf: 4};
        expect(result).toEqual(expected);
    })
})

describe('boardFields: countWaterPlantVisitFee', () => {
    const getWaterPlant = descriptors => descriptors.Water_Plant;
    it('Should return 0 if bank is the owner of waterPlant', async () => {
        const state = cp(testState);
        const waterPlant = getWaterPlant(state);
        const result = await countWaterPlantVisitFee(state, waterPlant);
        const expected = 0;
        expect(result).toBe(expected);
    })
    it('Should return 0 in case object is plegded', async () => {
        const state = cp(testState);
        const waterPlant = getWaterPlant(state);
        waterPlant.isPlegded = true;
        waterPlant.owner = 'Bolek';
        const result = await countWaterPlantVisitFee(state, waterPlant);
        const expected = 0;
        expect(result).toBe(expected);        
    })
    it('Should return 50 in case 5 is thrown and owner has only one object', async () => {
            const throwDices = jest.spyOn(throwDice, 'throwDices').mockImplementation(async () => 5)
            throwDice.throwDices = jest.spyOn(throwDice, 'throwDices').mockImplementation(async () => 5)
            console.log('TH DICES', await throwDices())
            console.log('TH DICES', await throwDices())
            console.log('TH DICES', await throwDices())
            console.log('TH DICES', await throwDices())
            const state = cp(testState);
            const waterPlant = getWaterPlant(state);
            waterPlant.owner = 'Bolek';
            const result = await countWaterPlantVisitFee(state, waterPlant);
            const expected = 50;
            expect(result).toBe(expected);        
    })
    it('Should return 100 in case 5 is thrown and owner has both: power station and water plant', () => {

    })
})