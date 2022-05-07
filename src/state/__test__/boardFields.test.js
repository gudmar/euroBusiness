// https://medium.com/welldone-software/jest-how-to-mock-a-function-call-inside-a-module-21c05c57a39f
// Mocking an internal function. Important to use not default imports

import testState from './stateForTests.js'
import { 
    getNrOfCitiesPlayerHas,
    countWaterPlantVisitFee,
    asumpWaterPlantVisitFee,
    countCityVisitFee,
    countRailwayVisitFee,
    countExectVisitFeeChecker,
    assumpVisitChecker,
} from '../boardFields.js'

const throwDice = require('../../functions/throwDices.js');
const bf = require('../boardFields.js');


const cp = state => JSON.parse(JSON.stringify(state));

const getWaterPlant = descriptors => descriptors.Water_Plant;
const getPowerStation = descriptors => descriptors.Power_Station;



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
            const state = cp(testState);
            const waterPlant = getWaterPlant(state);
            waterPlant.owner = 'Bolek';
            const result = await bf.countWaterPlantVisitFee(state, waterPlant);
            const expected = 50;
            expect(result).toBe(expected);        
    })
    it('Should return 100 in case 5 is thrown and owner has both: power station and water plant', async () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        powerStation.owner = 'Bolek';
        waterPlant.owner = 'Bolek';
        const throwDices = jest.spyOn(throwDice, 'throwDices').mockImplementation(async () => 5);
        const result = await bf.countWaterPlantVisitFee(state, powerStation);
        const expected = 100;
        expect(result).toBe(expected);
    })
    it('Should return 100 in case 5 is thrown and owner has both: power station and water plant but the other estate is plegded', async () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        powerStation.owner = 'Bolek';
        waterPlant.owner = 'Bolek';
        waterPlant.isPlegded = true;
        const throwDices = jest.spyOn(throwDice, 'throwDices').mockImplementation(async () => 5);
        const result = await bf.countWaterPlantVisitFee(state, powerStation);
        const expected = 100;
        expect(result).toBe(expected);
    })
})

describe('boardField: asumpWaterPlantVisitFee ', () => {
    it('Should return 0 in case both power station and water plant are owned by the bank', () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        const result = asumpWaterPlantVisitFee(state, waterPlant);
        const expected = 0;
        expect(result).toBe(expected);
    });
    it('Should return 0 in case target field is plegded', () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        powerStation.owner = 'Bolek';
        powerStation.isPlegded = true;
        const result = asumpWaterPlantVisitFee(state, powerStation);
        const expected = 0;
        expect(result).toBe(expected);
    });
    it('Should return "10 dice throw result" in case power station and water plant are owned by different users', () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        waterPlant.owner = 'Lolek'
        powerStation.owner = 'Bolek';
        const result = asumpWaterPlantVisitFee(state, powerStation);
        const expected = '10 x dice throw result';
        expect(result).toBe(expected);
    });
    it('Should return "20 dice throw result" in case power station and water plant are owned by the same user, but other field is plegded', () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        waterPlant.owner = 'Lolek'
        powerStation.owner = 'Lolek';
        waterPlant.isPlegded = true;
        const result = asumpWaterPlantVisitFee(state, powerStation);
        const expected = '20 x dice throw result';
        expect(result).toBe(expected);
    });
    it('Should return "20 dice throw result" in case power station and water plant are owned by the same user', () => {
        const state = cp(testState)
        const powerStation = getPowerStation(state);
        const waterPlant = getWaterPlant(state);
        waterPlant.owner = 'Lolek'
        powerStation.owner = 'Lolek';
        const result = asumpWaterPlantVisitFee(state, powerStation);
        const expected = '20 x dice throw result';
        expect(result).toBe(expected);        
    })
})

describe('boardFields: countCityVisitFee', () => {
    const getLiverpool = state => state.Liverpool;
    const getLondon = state => state.London;
    const getGlasgow = state => state.Glasgow;
    let Liverpool, Glasgow, London = undefined;
    let state = undefined;
    const setVariables = () => {
        state = cp(testState);
        Liverpool = getLiverpool(state);
        Glasgow = getGlasgow(state);
        London = getLondon(state);
    }
    it('Should throw and error in case any city of certain country is plegded or not owned by player, and there are houses', () => {
        // const state = cp(testState);
        // const Liverpool = getLiverpool(state);
        // const Glasgow = getGlasgow(state);
        // const London = getLondon(state);
        setVariables();
        Liverpool.owner = 'Lolek';
        Liverpool.nrOfHouses = 2;
        London.owner = 'Lolek';
        Glasgow.owner = 'Lolek';
        Glasgow.isPlegded = true;
        const result = () => countCityVisitFee(state, Liverpool);
        expect(result).toThrow();
    });
    it('Should return 30 in case of Liverpool owned by player A and rest of UK owned by other player, and Loverpool not plegded', () => {
        // const state = cp(testState);
        // const Liverpool = getLiverpool(state);
        // const Glasgow = getGlasgow(state);
        // const London = getLondon(state);
        setVariables();
        Liverpool.owner = 'Lolek';
        London.owner = 'bank';
        Glasgow.owner = 'bank';
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(30);
    })
    it('Should return 0 in case target city is plegded', () => {
        setVariables();
        Liverpool.owner = 'Lolek';
        Liverpool.isPlegded = true;
        London.owner = 'Lolek';
        Glasgow.owner = 'Lolek';
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(0);
    })
    it('Should return 30 in case Liverpool and all UK except for London are owned by player A, and London belongs to some other player', () => {
        setVariables();
        Liverpool.owner = 'Lolek';
        Liverpool.isPlegded = true;
        London.owner = 'Homes';
        Glasgow.owner = 'Lolek';
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(0);
    });
    it('Should return 60 in case a player stepped on Liverpool all cities of UK are owned by player A, but London is plegded', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        London.isPlegded = true;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(60);
    })
    it('Should return 60 in case a player stepped on Liverpool all citeis of UK are ownde by A and there are no houses on Liverpool', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        London.nrOfHouses = Glasgow.nrOfHouses = 1;
        Liverpool.nrOfHouses = 0;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(60)
    })
    it('Should return 140 in case a player stepped on Liverpool with one house', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        Liverpool.nrOfHouses = London.nrOfHouses = Glasgow.nrOfHouses = 1;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(140)
    })
    it('Should return 400 in case a player stepped on Liverpool with 2 houses', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        Liverpool.nrOfHouses = London.nrOfHouses = Glasgow.nrOfHouses = 2;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(400)
    })
    it('Should return 1100 in case a player stepped on Liverpool with 2 houses', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        Liverpool.nrOfHouses = London.nrOfHouses = Glasgow.nrOfHouses = 3;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(1100)
    })
    it('Should return 1500 in case a player stepped on Liverpool with 2 houses', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        Liverpool.nrOfHouses = London.nrOfHouses = Glasgow.nrOfHouses = 4;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(1500)
    })
    it('Should return 1900 in case a player stepped on Liverpool with one hotel', () => {
        setVariables();
        Liverpool.owner = London.owner = Glasgow.owner = 'Bolek';
        Liverpool.nrOfHouses = London.nrOfHouses = Glasgow.nrOfHouses = 5;
        const result = countCityVisitFee(state, Liverpool);
        expect(result).toBe(1900)
    })
})