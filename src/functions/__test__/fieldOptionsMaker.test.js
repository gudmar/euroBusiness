import { stateForFieldOptionsTests, currentPlayerData, playerSlice } from '../../state/__test__/stateForTests.js';
import { controlActionTypes } from '../../state/controlReducer.js'
import {
    fieldOptionsMaker,
    buttonNames,
} from '../../functions/fieldOptionsMaker.js'
import { playerActionTypes } from '../../state/playerReducer.js';
import { getPlayerNameByColor } from '../../state/defaultPlayerState.js';
import  { gameStateConstructor }  from '../../state/gameStateConstructor.js'
import { transactionActionTypes } from '../../state/transactionsReducer.js'

const controlState = {openFieldWindow: false};
const game = gameStateConstructor();

expect.extend({
    arrayToContainTheSameValues(received, arrayWithTheSameValues) {
        const arrayToLookIn = received;
        const arrToLookInCopy = JSON.parse(JSON.stringify(received));
        const notMatchingElements = [];
        if (arrayToLookIn.length !== arrayWithTheSameValues.length) return {
            pass:false, message: () => `Different lenght of arrays: ${arrayToLookIn.length} vs. ${arrayWithTheSameValues.length}.
            Arrays are: [${arrayToLookIn}] and [${arrayWithTheSameValues}]`
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
const getButton = (arr, label) => arr.find(button => button.label === label)
const getButtonNames = (arr, index) => getButtons(arr, index).map(button => button.label);
const getButtonLabels = (arrOfOptions, index = 0) =>  {
    return arrOfOptions[index].options.map(button => {
        return button.label
    })
}
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
            const resultArr = await fieldOptionsMaker({
                fieldsDescriptorsArray: stateForFieldOptionsTests, 
                fieldData: estateDescriptor, 
                playerStateSlice: playerSlice,
                control: controlState,
                game: {globalNumberOfHouses: 8}
            });
            const result = getInfo(resultArr, 0);
            expect(Array.isArray(resultArr)).toBe(true);
            expect(resultArr.length).toBe(1);
            const expected = `You stop on the 'start' field, that means You get $400. Notihing to do here.`
            expect(result).toBe(expected);
        }
    );
    it('Should return a single OK button having actions PAY_CURRENT_PLAYER and SHUT_WINDOW', async () => {
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Start');
        const globalNumberOfHouses = {globalNumberOfHouses: 8};
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateForFieldOptionsTests, 
            fieldData: estateDescriptor, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
        });
    const resultButtonNames = getButtonNames(resultArr, 0);
        const resultButtonActionTypes = getButtonActionTypes(resultArr, 0, 0)
        const expectedButtonNames = [buttonNames.ok];
        const expectedActionTypes = [playerActionTypes.PAY_CURRENT_PLAYER, playerActionTypes.SHUT_FIELD_WINDOW]
        expect(resultButtonNames).arrayToContainTheSameValues(expectedButtonNames);
    })
})

const getCurrentPlayerColor = playerSlice => playerSlice?.currentPlayer;
const getCurrentPlayerDescriptor = playerSlice => playerSlice[getCurrentPlayerColor(playerSlice)]

describe('Testing a city field', () => {
    it(`If player has enough cash and bank owns the city, it should return text:
    You stop in 'Ateny' city. Its onwed by the bank. You don't have to pay for 
    staying here. You may purchase this city. If You don't it will be auctioned.`, async () => {
        const estateDescriptor = getEstate(stateForFieldOptionsTests, 'Ateny');
        const localPlayerSlice = cp(playerSlice);
        const localPlayerDescriptor = getCurrentPlayerDescriptor(localPlayerSlice);
        localPlayerDescriptor.cash = 119;
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateForFieldOptionsTests, 
            fieldData: estateDescriptor, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
        });
    const resultInfo = getInfo(resultArr, 0);
        expect(Array.isArray(resultArr)).toBe(true);
        expect(resultArr.length).toBe(1);
        const expected = `You stop in Ateny city. Its owned by the bank. You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned.`;
        expect(resultInfo).toBe(expected);
    });

    it(`If another player owns this city, and only this city in greece, and player has enough cash to pay for stay should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. 'Player2' owns 1 estate out of 2 in Greece, 
     so  you have to pay  $10.`, async () => {
         const playerData = cp(currentPlayerData);
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const estateDescriptor = getEstate(stateBoardSlice, 'Ateny');
         estateDescriptor.owner = 'black';
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: estateDescriptor, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const estateDescriptor = getEstate(stateBoardSlice, 'Ateny');
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         atenyEstate.owner = 'black';
         salonikiEstate.owner = 'black';
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: estateDescriptor, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
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
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: playerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 1 hotel in Ateny, so you have to pay $900.`;
         expect(resultInfo).toBe(expectedText);
     })


     it(`If another player owns this city, and has 2 houses here, and player that stepped 
     has NOT enough cash to pay for the visit, but still can mortage OR SOME EXTRA CARDS, should return text:
     You step in Ateny city. Its owned by Player_2. Player_2' has 2 houseS in Ateny, so you have to pay: $120.
     You don't have enough cash, but you still can get 350(Insbruck/blue) from the bank,
     or You may try to sell something to another player.`, async () => {
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         const localPlayerSlice = cp(playerSlice);
         const localPlayerDescriptor = getCurrentPlayerDescriptor(localPlayerSlice);
         localPlayerDescriptor.cash = 119;
 
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 2;
         salonikiEstate.owner = 'black';
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 2 houses in Ateny, so you have to pay $120. You don't have enough cash, but you still can get $350 from the bank, or you may try to sell something to another player.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 2 houses here, and player that stepped 
     has NOT enough cash to pay for the visit, but has SOME EXTRA CARDS, should return text:
     You step in Ateny city. Its owned by Player_2. Player_2' has 2 houseS in Ateny, so you have to pay: $120.
     You don't have enough cash, but you still can try to sell an extra card to another player`, async () => {
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const insbruckEstate = getEstate(stateBoardSlice, 'Insbruck');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         insbruckEstate.owner = 'Deep Purple';
         const localPlayerSlice = cp(playerSlice);
         localPlayerSlice[localPlayerSlice.currentPlayer].extraCards = ['getOutOfJail'];

         const localPlayerDescriptor = getCurrentPlayerDescriptor(localPlayerSlice);
         localPlayerDescriptor.cash = 1;
 
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 2;
         salonikiEstate.owner = 'black';
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 2 houses in Ateny, so you have to pay $120. You don't have enough cash, but you still can try to sell an extra card to another player.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`If another player owns this city, and has 2 houses here, and player that stepped 
     has NOT enough cash to pay for the visit, cannot get enough cash from the bank, but
     has any estate should return text:
     You step in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
     You should pay $120, but you are too poor. Even dealing with the bank will not help.
     The only rescue is to bargain with another players. You may give 10 offers for your 
     estates.`, async () => {
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         const insbruckEstate = getEstate(stateBoardSlice, 'Insbruck');
         insbruckEstate.isPlegded = true;
         const localPlayerSlice = cp(playerSlice);
         const localPlayerDescriptor = getCurrentPlayerDescriptor(localPlayerSlice);
         localPlayerDescriptor.cash = 119;
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 2;
         salonikiEstate.owner = 'black';
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 2 houses in Ateny, so you have to pay $120, but you are too poor. Even dealing with the bank will not help. The only rescue is to bargain with another players. You may give 10 offers for your estates.`;
         expect(resultInfo).toBe(expectedText);
     })



     it(`If another player owns this city, and has 2 houses here, and player that stepped 
     has NOT enough cash to pay for the visit, cannot get enough cash from the bank, but
     has any estate should return text:
     You stop in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
     You should pay: $120, but you are too poor. If you had anything of a value perhaps 
     You could do anything to stay in the game a bit longer.`, async () => {
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         const salonikiEstate = getEstate(stateBoardSlice, 'Saloniki');
         const insbruckEstate = getEstate(stateBoardSlice, 'Insbruck');
         insbruckEstate.owner = 'purple';
         const localPlayerSlice = cp(playerSlice);
         const localPlayerDescriptor = getCurrentPlayerDescriptor(localPlayerSlice);
         localPlayerDescriptor.cash = 1;
         atenyEstate.owner = 'black';
         atenyEstate.nrOfHouses = 2;
         salonikiEstate.owner = 'black';
         const globalNumberOfHouses = {globalNumberOfHouses: 8};
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Player_2 has 2 houses in Ateny, so you have to pay $120, but you are too poor. If you had anything of a value perhaps you could do anything to stay in the game a bit longer.`;
         expect(resultInfo).toBe(expectedText);
     })

     it(`In case another player has a 'Ateny' but it is mortaged, should return text:
        You stop in Ateny city. Its owned by Player_2. Ateny is mortaged, so 
        no fee for stopping by.`, async () => {
         const stateBoardSlice = cp(stateForFieldOptionsTests);
         const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
         atenyEstate.owner = "black";
         atenyEstate.isPlegded = true;
         const localPlayerSlice = cp(playerSlice);
         const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice, 
            fieldData: atenyEstate, 
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
         });
         const resultInfo = getInfo(resultArr, 0);
         const expectedText = `You stop in Ateny city. Its owned by Player_2. Ateny is mortaged, so no fee for stopping by.`;
         expect(resultInfo).toBe(expectedText);
     })




     

     // Player should be able to sell a property to another player, so 
     // is player cannot get proper prices from a bank, he should get lets say 
     // 10 oppportunities to offer something to the other players, and then after 
     // 10 attempts, there should be a GAME LOST


})

// const getButtons = (arr, index) => arr[index].options
// const getButtonNames = (arr, index) => getButtons(arr, index).map(button => button.label);
// const getButtonLabels = value =>  value.buttons.map(button => button[label])

describe('Testing fieldOptionsMaker: getOptionsCity returned buttons', () => {
    it(`If the bank owns Ateny, and player stands and has enough cash should return buttons 'Buy', 'Auction'`, async () => {
        const stateBoardSlice = cp(stateForFieldOptionsTests);
        const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
        const localPlayerSlice = cp(playerSlice);
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice,
            fieldData: atenyEstate,
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
        })

        const buttonLabels = getButtonLabels(resultArr, 0);
        const expectedButtonNames = [buttonNames.auction, buttonNames.buy]
        expect(buttonLabels).arrayToContainTheSameValues(expectedButtonNames)
        const actionsBuy = getButton(resultArr[0].options, buttonNames.buy).actions;
        
        const actionsPurchase = [
            {
                payload: {
                    buyer: localPlayerSlice.currentPlayer,
                    seller: atenyEstate.owner,
                    estate: 'Ateny',
                    price: atenyEstate.price
                },
                type: transactionActionTypes.PURCHASE
            },
            {
                type: controlActionTypes.SHUT_FIELD_WINDOW
            },
        ]
        const actionsAuction = [
            {
                type: controlActionTypes.SHUT_FIELD_WINDOW
            },
            {
                type: controlActionTypes.OPEN_AUCTION_WINDOW,
                payload: {
                    seller: atenyEstate.owner,
                    estate: atenyEstate.id,
                    price: atenyEstate.price
                }
            },               
        ]
        const buttonActionsAuction =  getButton(resultArr[0].options, buttonNames.auction).actions;
        const buttonActionsPurchase = getButton(resultArr[0].options, buttonNames.buy).actions
        expect([actionsPurchase, actionsAuction]).toEqual([buttonActionsPurchase, buttonActionsAuction])
    })

    it(`If the bank owns Ateny, and player stands and has not enough cash, but can mortage
    should return 2 buttons: 'Auction', 'Estate manager'`, async () => {
        const stateBoardSlice = cp(stateForFieldOptionsTests);
        const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
        const insbruckEstate = getEstate(stateBoardSlice, 'Insbruck');
        const localPlayerSlice = cp(playerSlice);
        localPlayerSlice.blue.cash = 10;
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice,
            fieldData: atenyEstate,
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
        })
        const buttonLabels = getButtonLabels(resultArr, 0);
        const expectedButtonNames = [buttonNames.auction, buttonNames.propertiesManager]
        expect(buttonLabels).arrayToContainTheSameValues(expectedButtonNames)
        const actionsEstateManagerResult = getButton(resultArr[0].options,buttonNames.propertiesManager).actions;
        const actionsAuctionResult = getButton(resultArr[0].options, buttonNames.auction).actions;
        const actionsEstateManager = [
            {
                type: controlActionTypes.HIDE_FIELD_WINDOW
            },
            {
                payload: {
                    player: localPlayerSlice.currentPlayer,
                },
                type: controlActionTypes.OPEN_ESTATE_MANAGER
            },

        ]
        const actionsAuction = [
            {
                type: controlActionTypes.SHUT_FIELD_WINDOW
            },
            {
                type: controlActionTypes.OPEN_AUCTION_WINDOW,
                payload: {
                    seller: atenyEstate.owner,
                    estate: atenyEstate.id,
                    price: atenyEstate.price
                }
            },               
        ]
        expect([actionsEstateManagerResult, actionsAuctionResult]).toEqual([actionsEstateManager, actionsAuction])
    })
    it(`If player stands on Ateny, and another player owns it, and only it and player that
    stood on Atheny has not enough cash, but has any property, should return 1 button:
    'Estate Manager' with actions to HIDE_FIELD_WINDOW and OPEN_ESTATE_MANAGER`, async ()=>{
        const stateBoardSlice = cp(stateForFieldOptionsTests);
        const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
        atenyEstate.owner = 'pruple';
        const localPlayerSlice = cp(playerSlice);
        localPlayerSlice.blue.cash = 1;
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice,
            fieldData: atenyEstate,
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
        })
        const buttonLabels = getButtonLabels(resultArr, 0);
        const expectedButtonNames = [buttonNames.propertiesManager]
        expect(buttonLabels).arrayToContainTheSameValues(expectedButtonNames)
        const actionsEstateManagerResult = getButton(resultArr[0].options,buttonNames.propertiesManager).actions;
        const actionsEstateManager = [
            {
                type: controlActionTypes.HIDE_FIELD_WINDOW
            },
            {
                payload: {
                    player: localPlayerSlice.currentPlayer,
                },
                type: controlActionTypes.OPEN_ESTATE_MANAGER
            },

        ]
        expect([actionsEstateManagerResult]).toEqual([actionsEstateManager])        
    })

    // playerActionTypes.PLAYER_PAYS_ANOTHER_PLAYER

    it(`If a player stands on Ateny, and another player owns it but that player does not own Saloniki, and player that stoped in Ateny has
     enough cash to pay for it, should display a button 'Pay'`, async () => {
        const stateBoardSlice = cp(stateForFieldOptionsTests);
        const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
        atenyEstate.owner = 'pruple';
        const localPlayerSlice = cp(playerSlice);
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice,
            fieldData: atenyEstate,
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
        })
        const buttonLabels = getButtonLabels(resultArr, 0);
        const expectedButtonNames = [buttonNames.pay]
        expect(buttonLabels).arrayToContainTheSameValues(expectedButtonNames)
        const actionsPayResult = getButton(resultArr[0].options, buttonNames.pay).actions;
        const actionsPay = [
            {
                payload: {
                    source: localPlayerSlice.currentPlayer,
                    target: atenyEstate.owner,
                    amount: atenyEstate.visit[0],
                },
                type: playerActionTypes.PLAYER_PAYS_ANOTHER_PLAYER
            },
        ]
        expect([actionsPayResult]).toEqual([actionsPay])
    })

    it(`If player stands on 'Ateny', and another player owns it, and player that stood has not cash
    and can not mortage anymore, not owns estates or any extra cards should return one button:
    Ok with action playerActionTypes.PLAYER_LOSES_THE_GAME`, async () => {
        const stateBoardSlice = cp(stateForFieldOptionsTests);
        const atenyEstate = getEstate(stateBoardSlice, 'Ateny');
        const insbruckEstate = getEstate(stateBoardSlice, 'Insbruck');
        atenyEstate.owner = 'pruple';
        insbruckEstate.owner = 'purple'
        const localPlayerSlice = cp(playerSlice);
        localPlayerSlice.blue.cash = 1;
        const resultArr = await fieldOptionsMaker({
            fieldsDescriptorsArray: stateBoardSlice,
            fieldData: atenyEstate,
            playerStateSlice: localPlayerSlice,
            control: controlState,
            game: {globalNumberOfHouses: 8, nrOfOffersToOtherPlayersWhenSellingAProperty: 10}
        })
        const buttonLabels = getButtonLabels(resultArr, 0);
        const expectedButtonNames = [buttonNames.ok]
        expect(buttonLabels).arrayToContainTheSameValues(expectedButtonNames)
        const actionsPayResult = getButton(resultArr[0].options,buttonNames.ok).actions;
        const actionsPay = [
            {
                payload: {
                    target: localPlayerSlice.currentPlayer,
                },
                type: playerActionTypes.PLAYER_LOSES_THE_GAME
            },
        ]
        expect([actionsPayResult]).toEqual([actionsPay])
    })





})

