import { stateForFieldOptionsTests, currentPlayerData } from '../../state/__test__/stateForTests.js';
import {
    fieldOptionsMaker
} from '../../functions/fieldOptionsMaker.js'
import { playerActionTypes } from '../../state/playerReducer.js';


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
        You get $400. Notihing to do here.`, () => {
            const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Start');
            const resultArr = fieldOptionsMaker(estateDescriptor, currentPlayerData);
            const result = getInfo(resultArr, 0);
            expect(Array.isArray(resultArr)).toBe(true);
            expect(resultArr.length).toBe(1);
            const expected = `You stop on the 'start' field, that means You get $400. Notihing to do here.`
            expect(result).toBe(expected);
        }
    );
    it('Should return a single OK button having actions PAY_PLAYER and SHUT_WINDOW', () => {
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Start');
        const resultArr = fieldOptionsMaker(estateDescriptor, currentPlayerData);
        const resultButtonNames = getButtonNames(resultArr, 0);
        const resultButtonActionTypes = getButtonActionTypes(resultArr, 0, 0)
        const expectedButtonNames = ['OK'];
        const expectedActionTypes = [playerActionTypes.PAY_PLAYER, playerActionTypes.SHUT_FIELD_WINDOW]
        expect(resultButtonNames).arrayToContainTheSameValues(expectedButtonNames);
    })
})

describe('Testing a city field', () => {
    it(`If player has enough cash and bank owns the city, it should return text:
    You stop in 'Ateny' city. Its onwed by bank. You don't have to pay for 
    staying here. You may purchase this city. If You don't it will be auctioned`, () => {
        const playerData = currentPlayerData;
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Ateny');
        const resultArr = fieldOptionsMaker(estateDescriptor, playerData);
        console.log(resultArr)
        const resultInfo = getInfo(resultArr, 0);
        expect(Array.isArray(resultArr)).toBe(true);
        expect(resultArr.length).toBe(1);
        const expected = `You stop in 'Ateny' city. Its onwed by bank. You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned`;
        expect(resultInfo).toBe(expected);
    })
})