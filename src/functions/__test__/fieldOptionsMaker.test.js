import { stateForFieldOptionsTests, currentPlayerData, playerSlice } from '../../state/__test__/stateForTests.js';
import {
    fieldOptionsMaker
} from '../../functions/fieldOptionsMaker.js'
import { playerActionTypes } from '../../state/playerReducer.js';
import { getPlayerNameByColor } from '../../state/defaultPlayerState.js'

expect.extend({
    arrayToContainTheSameValues(received, arrayWithTheSameValues) {
        const arrayToLookIn = received;
        const arrToLookInCopy = JSON.parse(JSON.stringify(received));
        const notMatchingElements = [];
        if (arrayToLookIn.length !== arrayWithTheSameValues.length) return {
            pass:false, message: () => `Different lenght of arrays: ${arrayToLookIn.length} vs. ${arrayWithTheSameValues.length}`
        }
        const doAllElementsMatch = arrayWithTheSameValues.reduce((acc, button) => {
            const buttonIndex = arrayToLookIn.findIndex(item => item === button);
            if (buttonIndex > -1) {
                arrayToLookIn.splice(buttonIndex, 1);
                notMatchingElements.push(button)
                return acc && true;
            } else {
                acc = false;
                return false;
            }
        }, true)
        return {
            pass: doAllElementsMatch,
            message: () => {
                if (doAllElementsMatch) return 'Passed';
                return `
                    Array [${arrToLookInCopy.join(', ')}] and array 
                    [${arrayWithTheSameValues.join(', ')}] do not match. Difference in 
                    elements [${notMatchingElements.join(', ')}]
                `;
            }
        }
    }
})

const getInfo = (arr, index) => arr[index].info
const getButtons = (arr, index) => arr[index].options
const getButtonNames = (arr, index) => getButtons(arr, index).map(button => button.label);
const getButtonLabels = value =>  value.buttons.map(button => button[label])
const cp = obj => JSON.parse(JSON.stringify(obj));
const getEstate = (stateArray, estateId) => stateArray.find(item => item.id === estateId);
const getButtonActionTypes = (arrOfResults, indexSection, indexButton) => {
    const button = arrOfResults[indexSection].options[indexButton];
    return button.actions.map(action => action.type)
}

describe('Testing arrayToContainTheSameValues matcher', () => {
    it('Should pass when arrays have same elements in different order', () => {
        const received = [1, 2, 3, 4, 5];
        const toCompare = [ 5, 3, 4, 1, 2];
        expect(received).arrayToContainTheSameValues(toCompare)
    });
    it('Should fail when arrays have different elements', () => {
        const received = [1, 2, 3, 4, 5];
        const toCompare = [ 1, 3, 3, 4, 5];
        expect(received).not.arrayToContainTheSameValues(toCompare);
    })
    it('Should fail when arrays have different elements (repeted values)', () => {
        const received = [1, 2, 3, 4, 4, 5];
        const toCompare = [ 1, 2, 3, 3, 4, 5];
        expect(received).not.arrayToContainTheSameValues(toCompare);
    })
})


describe('Testing Start field', () => {
    it(`
        Should return a message: You stop on the 'start' field, that means 
        You get $400. Notihing to do here.`, async () => {
            const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Start');
            const resultArr = await fieldOptionsMaker(stateForFieldOptionsTests, estateDescriptor, playerSlice);
            const result = getInfo(resultArr, 0);
            expect(Array.isArray(resultArr)).toBe(true);
            expect(resultArr.length).toBe(1);
            const expected = `You stop on the 'start' field, that means You get $400. Notihing to do here.`
            expect(result).toBe(expected);
        }
    );
    it('Should return a single OK button having actions PAY_PLAYER and SHUT_WINDOW', async () => {
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Start');
        const resultArr = await fieldOptionsMaker(stateForFieldOptionsTests, estateDescriptor, playerSlice);
        const resultButtonNames = getButtonNames(resultArr, 0);
        const resultButtonActionTypes = getButtonActionTypes(resultArr, 0, 0)
        const expectedButtonNames = ['OK'];
        const expectedActionTypes = [playerActionTypes.PAY_PLAYER, playerActionTypes.SHUT_FIELD_WINDOW]
        expect(resultButtonNames).arrayToContainTheSameValues(expectedButtonNames);
    })
})

describe('Testing a city field', () => {
    it(`If player has enough cash and bank owns the city, it should return text:
    You stop in 'Ateny' city. Its onwed by the bank. You don't have to pay for 
    staying here. You may purchase this city. If You don't it will be auctioned`, async () => {
        const playerData = currentPlayerData;
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Ateny');
        const resultArr = await fieldOptionsMaker(stateForFieldOptionsTests, estateDescriptor, playerSlice);
        const resultInfo = getInfo(resultArr, 0);
        expect(Array.isArray(resultArr)).toBe(true);
        expect(resultArr.length).toBe(1);
        const expected = `You stop in Ateny city. Its owned by the bank. You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned`;
        expect(resultInfo).toBe(expected);
    });
    it(`If another player owns this city, and only this city in greece, and player has enough cash to pay for stay should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. 'Player2' owns 1 estate out of 2 in Greece, 
     so  you have to pay  $10.`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         atenyEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         expect(Array.isArray(resultArr)).toBe(true);
         expect(resultArr.length).toBe(1); 
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 owns 1 out of 2 estates in Greece, so you have to pay $10.`
         expect(resultInfo).toBe(expectedText);
     });
     it(`If another player owns this city, that another player owns also Saloniki, and player that stood has enough cash to pay for stay should return text:
     You stop in Ateny city. Its ownde by Player2. Player2 owns 2 estateS in Greece, 
     so  you have to pay  $20.`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 owns 2 out of 2 estates in Greece, so you have to pay $20.`
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has one house here, and player that stepped has enough cash to pay for the visit should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. Player2' has 1 house in 'Ateny'.
     You should pay: $40`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 1;
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 1 house in Ateny, so you have to pay $40.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 2 houses here, and player that stepped has enough cash to pay for the visit should return text:
      You stop in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
      You should pay: $120`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 2;
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 2 houses in Ateny, so you have to pay $120.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 3 houses here, and player that stepped has enough cash to pay for the visit should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. Player2' has 3 houseS in 'Ateny'.
     You should pay: $360`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 3;
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 3 houses in Ateny, so you have to pay $360.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 4 houses here, and player that stepped has enough cash to pay for the visit should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. Player2' has 4 houseS in 'Ateny'.
     You should pay: 640`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 4;
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 4 houses in Ateny, so you have to pay $640.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 5 houses here, and player that stepped has enough cash to pay for the visit should return text:
     You stop in Ateny city. Its owned by Player_2. Player_2 has 1 hotel in Ateny. You should pay $900.`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 5;
         salonikiEstate.owner = 'black';
         const resultArr = await fieldOptionsMaker(stateBoardSlice, atenyEstate, playerSlice)
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 1 hotel in Ateny, so you have to pay $900.`;
         expect(resultInfo).toBe(expectedText);
     })




})