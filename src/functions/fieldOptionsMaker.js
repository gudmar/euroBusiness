import {
    setDiceResult,
    throwDice,
    disactivateDice,
    move,
    moveOneField,
    pay,
    sleep,
    addExtraCard,
    useExtraCard,
    nextPlayer,
} from "../state/playerSlice.js"
import { calculateCashForAllEstatesFromTheBank } from '../state/boardFields.js'
import { boardActionTypes } from '../state/boardReducer.js';
import { playerActionTypes } from '../state/playerReducer.js';
import { controlActionTypes } from '../state/controlReducer.js';
import { transactionActionTypes } from '../state/transactionsReducer.js';
import { getPlayerNameByColor } from '../state/defaultPlayerState.js';
import {
    getNrOfCitiesPlayerHas, // { owns, outOf }
    countExectVisitFeeChecker,
    countAllPropertiesPlayerHas
} from '../state/boardFields.js'


const getCityInfoText = ({
    id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, name, nrOfHouses, cash, 
    fieldsDescriptorsArray, color, globalNumberOfHouses, nrOfOffersToOtherPlayersWhenSellingAProperty
}) => {
    const ownerNameWithThe = ownerName === 'bank' ? 'the bank' : ownerName;
    const nrOfEstatesPlayerHas = countAllPropertiesPlayerHas(fieldsDescriptorsArray, color);
    let output = [];
    output.push(`You stop in ${id} city. Its owned by ${ownerNameWithThe}.`);
    if (ownerName === 'bank') {
        output.push(` You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned`)
    } 
    if (ownerName !== 'bank' && nrOfHouses === 0 && !isPlegded) {
        output.push(` ${ownerNameWithThe} owns ${citiesOwnedByOwner.owns} out of ${citiesOwnedByOwner.outOf} estates in ${country},`)
    }
    if (ownerName !== 'bank' && nrOfHouses > 0 && nrOfHouses < 5) {
        output.push(` ${ownerNameWithThe} has ${nrOfHouses} ${nrOfHouses > 1 ? 'houses' : 'house'} in ${id},`);
    }
    if (nrOfHouses === 5) {
        output.push(` ${ownerNameWithThe} has 1 hotel in ${id},`)
    }
    if (ownerName !== 'bank' && !isPlegded) output.push(` so you have to pay $${feeToPay}`)
    if (
        ownerName !== 'bank' && 
        !isPlegded && 
        feeToPay > cash && 
        calculateCashForAllEstatesFromTheBank(fieldsDescriptorsArray, color, globalNumberOfHouses).money > 0 &&
        nrOfEstatesPlayerHas > 0
    ) {
        const ammountCanGetFromTheBank = calculateCashForAllEstatesFromTheBank(fieldsDescriptorsArray, color, globalNumberOfHouses).money
        output.push(`. You don't have enough cash, but you still can get $${ammountCanGetFromTheBank} from the bank, or you may try to sell properties to another player`)
    }
    if (
        ownerName !== 'bank' && 
        feeToPay > cash && 
        calculateCashForAllEstatesFromTheBank(fieldsDescriptorsArray, color, globalNumberOfHouses).money === 0 &&
        (nrOfEstatesPlayerHas > 0)
    ){
        output.push(`, but you are too poor. Even dealing with the bank will not help. The only rescue is to bargain with another players. You may give ${nrOfOffersToOtherPlayersWhenSellingAProperty} offers for your estates`)
    }
    if (
        ownerName !== 'bank' && 
        feeToPay > cash &&
        (nrOfEstatesPlayerHas === 0)
    ){
        output.push(', but you are too poor. If you had anything of a value perhaps you could do anything to stay in the game a bit longer')
    }
    if (isPlegded) {
        output.push(` ${id} is mortaged, so no fee for stopping by`)
    }

    output.push('.')


    
    return output.join('');
}


const getCityButtons = ({
    id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, owner, ownerName, 
    name, nrOfHouses, cash, fieldsDescriptorsArray, color, globalNumberOfHouses, 
    nrOfOffersToOtherPlayersWhenSellingAProperty,
}) => {
    if(ownerName === 'bank' && price <= cash) {
        return [
                    {
                        type: 'button',
                        label: 'Buy',
                        function: undefined,
                        actions: [
                            {
                                payload: {
                                    buyer: color,
                                    seller: owner,
                                    estate: id,
                                    price: price,
                                }, 
                                type: transactionActionTypes.PURCHASE
                            },
                            {   
                                type: controlActionTypes.SHUT_FIELD_WINDOW
                            }
                        ],
                        tooltip: 'Accept'
                    },
                    {
                        type: 'button',
                        label: 'Auction',
                        actions: [
                            {
                                type: controlActionTypes.SHUT_FIELD_WINDOW
                            },
                            {
                                type: controlActionTypes.OPEN_AUCTION_WINDOW,
                                // payload: {
                                //     seller: owner,
                                //     estate: id,
                                //     price: price,                            
                                // }
                            }
                        ]
                    }
                ]
            }
}



const getOptionsCity = async (fieldsDescriptorsArray, estateData, playerSlice, gameState) => {
    const {
        id,
        country,
        visit,
        info,
        price,
        mortge,
        housePrice,
        hotelPrice,
        owner,
        isPlegded,
        nrOfHouses,
    } = estateData;
    const {
        cash,
        color,  // of player that stepped in someone elses estate
        extraCards,
        fieldNumber,
        turnToStale,
    } = playerSlice?.[playerSlice?.['currentPlayer']];
    const {
        globalNumberOfHouses,
        nrOfOffersToOtherPlayersWhenSellingAProperty,
    } = gameState;
    const ownerName = getPlayerNameByColor(playerSlice, owner);
    const citiesOwnedByOwner = getNrOfCitiesPlayerHas(fieldsDescriptorsArray, estateData.owner, country);
    const feeToPay = await countExectVisitFeeChecker(fieldsDescriptorsArray, estateData);
    const informationText = getCityInfoText({
        id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, name, 
        nrOfHouses, cash, fieldsDescriptorsArray, color, globalNumberOfHouses, 
        nrOfOffersToOtherPlayersWhenSellingAProperty,
    })
    const buttons = getCityButtons({
        id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, owner, ownerName, name, 
        nrOfHouses, cash, fieldsDescriptorsArray, color, globalNumberOfHouses, 
        nrOfOffersToOtherPlayersWhenSellingAProperty,
    })
    return [
        {
            type: 'information',
            title: `Stopped in ${id} in ${country}`,
            info: informationText,
            options: buttons
        }
    ]
}
const getOptionsStart = (data) => {
    const {info} = data;
    return [
        {
            type: 'information',
            title: 'You pass start:',
            info: info,
            options: [
                {
                    type: 'button',
                    label: 'OK',
                    function: pay,
                    actions: [
                        {payload: 400, type: playerActionTypes.PAY_CURRENT_PLAYER},
                        {type: controlActionTypes.SHUT_FIELD_WINDOW}
                    ],
                    tooltip: 'Accept'
                }
            ]
        }
    ]
}
const getOptionsChanceBlue = (data) => {

}
const getOptionsChanceRed = (data) => {

}
const getOptionsGuardedPark = (data) => {

}
const getOptionsFreePark = (data) => {

}
const getOptionsJai = (data) => {

}
const getOptionsGoToJai = (data) => {

}
const getOptionsRailway = (data) => {

}
const getOptionsPowerStation = async (data) => {

}
const getOptionsWaterPlant = async (data) => {

}
const getOptionsTax = (data) => {

}

const fieldOptionsMaker = async ({
    fieldsDescriptorsArray, 
    fieldData, 
    playerStateSlice, 
    control, 
    game
}) => {
    // const {
    //     type,
    //     visit,
    //     info,
    //     country,
    //     price,
    //     mortage,
    //     housePrice,
    //     hotelPrice,
    //     owner,
    //     nrOfHouses,
    //     nrInSet,
    //     nrOfHousesToPUrchase,
    //     nrOfHousesToSell,
    //     boardFieldNumber,
    //     isPlegded,
    //     wait,  
    // } = fieldData;
    // const {
    //     cash,
    //     color,
    //     extraCards,
    //     fieldNumber,
    //     name,
    //     turnToStale
    // } = currentPlayerData;

// default (at any time) options: build a house, sell a house, build a hotel, mortage estate, buy from mortage,
    
    switch(fieldData.type) {
        case 'city': return await getOptionsCity(fieldsDescriptorsArray, fieldData, playerStateSlice, game);
        case 'start': return getOptionsStart(fieldData);
        case 'chanceBlue': return getOptionsChanceBlue;
        case 'chanceRed': return getOptionsChanceRed;
        case 'guardedPark': return getOptionsGuardedPark;
        case 'freePark': return getOptionsFreePark;
        case 'jail': return getOptionsJail
        case 'go_to_jail': return getOptionsGoToJail
        case 'railway': return getOptionsRailway(fieldsDescriptorsArray, );
        case 'powerStation': return await getOptionsPowerStation(fieldsDescriptorsArray, );
        case 'waterPlant': return await getOptionsWaterPlant(fieldsDescriptorsArray, );
        case 'tax': return getOptionsTax;
        default: throw new Error(`fieldOptionsMaker: type did not match one of field types: ${type}`)
    }
 }

 const getFieldOptions = data => {
     const fieldRelatedOptions = fieldOptionsMaker(data);
     const defaultOptions = defaultOptionsMaker();
     return [...fieldOptionsMaker, ...defaultOptions]
 }

 export {
    getOptionsCity,
    getOptionsStart,
    getOptionsChanceBlue,
    getOptionsChanceRed,
    getOptionsGuardedPark,
    getOptionsFreePark,
    getOptionsJai,
    getOptionsGoToJai,
    getOptionsRailway,
    getOptionsPowerStation,
    getOptionsWaterPlant,
    getOptionsTax,
    fieldOptionsMaker,
    getFieldOptions,
 }