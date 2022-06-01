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
    countAllPropertiesPlayerHas,
    types,
    estateTypes,

} from '../state/boardFields.js'
import {
    hasPlayerExtraCardsFunction,
    hasCurrentPlayerExtraCardsFunction
} from './playerFunctions.js'
import { recalculateNrOfHousesToBuySell } from './estateOperations.js'
import { countries, notCountryTypes } from './countryTypes.js'

const buttonNames = {
    ok: 'Ok',
    pay: 'Pay',
    propertiesManager: 'Properties manager',
    auction: 'Auction',
    cancel: 'Cancel',
    buy: 'Buy',
}

const getCountries = () => countries; // so it may be mocked
const getNotCountryTypes = () => notCountryTypes;

const canPlayerDoAnythingInPropertiesManager = (
    stateBoardSlice, 
    playerSlice, 
    playerColor
) => {
    const countries = Object.values(getCountries());
    console.log('BOARD SLIE', stateBoardSlice)
    countries.forEach(country => recalculateNrOfHousesToBuySell(stateBoardSlice, country));
    const playerOptions = {
        sellHouse: false,
        buyHouse: false,
        buyHotel: false,
        sellHotel: false,
        mortage: false,
        buyFromMortage: false,
        sellCard: false,
    }
    const isEstate = targetType => Object.values(estateTypes).includes(targetType);
    const isCity = targetType => targetType === types.CITY;
    const getPropIfPlayerIsOwner = (estateDescriptor, property) => {
        if (estateDescriptor.owner !== playerColor) return 0;
        return estateDescriptor[property];        
    }
    const housesToBuy = estateDescriptor => getPropIfPlayerIsOwner(estateDescriptor, 'nrOfHousesToPurchase');
    const housesToSell = estateDescriptor => getPropIfPlayerIsOwner(estateDescriptor, 'nrOfHousesToSell');
    // const hotelsToSell = estateDescriptor => getPropIfPlayerIsOwner(estateDescriptor, 'nrOfHouses') > 4 ? 1 : 0
    const hotelsToBuy = estateDescriptor => {throw new Error('Missing implementation')}
    const hotelsToSell = estateDescriptor => {throw new Error('Missing implementation')}
    const isMortaged = estateDescriptor => getPropIfPlayerIsOwner(estateDescriptor, 'isPlegded')
    stateBoardSlice.forEach(field => {
        if (housesToBuy(field)>0) playerOptions.buyHouse = true;
        if (housesToSell(field)>0) playerOptions.sellHouse = true;
        if (hotelsToBuy(field)>0) playerOptions.buyHotel = true;
        if (hotelsToSell(field)>0) playerOptions.sellHotel = true;
        if (!isMortaged(field)) {
            playerOptions.mortage = true
        } else {
            playerOptions.buyFromMortage = true;
        }
        if (playerSlice?.[playerColor].extraCards.length > 0) playerOptions.sellCard = true;
    })
    return playerOptions;
}


const getCityInfoText = ({
    id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, name, nrOfHouses, cash, 
    fieldsDescriptorsArray, color, globalNumberOfHouses, nrOfOffersToOtherPlayersWhenSellingAProperty,
    hasCurrentPlayerExtraCards
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
        (nrOfEstatesPlayerHas > 0 || hasCurrentPlayerExtraCards)
    ) {
        const ammountCanGetFromTheBank = calculateCashForAllEstatesFromTheBank(fieldsDescriptorsArray, color, globalNumberOfHouses).money
        output.push(`. You don't have enough cash, but you still can get $${ammountCanGetFromTheBank} from the bank, or you may try to sell something to another player`)
    }

    if (
        ownerName !== 'bank' && 
        !isPlegded && 
        feeToPay > cash && 
        hasCurrentPlayerExtraCards
    ) {
        const ammountCanGetFromTheBank = calculateCashForAllEstatesFromTheBank(fieldsDescriptorsArray, color, globalNumberOfHouses).money
        output.push(`. You don't have enough cash, but you still can try to sell an extra card to another player`)
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
        (nrOfEstatesPlayerHas === 0 && !hasCurrentPlayerExtraCards)
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
    nrOfOffersToOtherPlayersWhenSellingAProperty, hasCurrentPlayerExtraCards
}) => {
    const nrOfEstatesPlayerHas = countAllPropertiesPlayerHas(fieldsDescriptorsArray, color);
    if(ownerName === 'bank' && price <= cash) {
        return [
                    {
                        type: 'button',
                        label: buttonNames.buy,
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
                        label: buttonNames.auction,
                        actions: [
                            {
                                type: controlActionTypes.SHUT_FIELD_WINDOW
                            },
                            {
                                type: controlActionTypes.OPEN_AUCTION_WINDOW,
                                payload: {
                                    seller: owner,
                                    estate: id,
                                    price: price,                            
                                }
                            }
                        ]
                    }
                ]
            }
    if(ownerName === 'bank' && price > cash && nrOfEstatesPlayerHas > 0) {
        return [
            {
                type: 'button',
                label: buttonNames.propertiesManager,
                function: undefined,
                actions: [
                    {   
                        type: controlActionTypes.HIDE_FIELD_WINDOW
                    },
                    {
                        payload: {
                            player: color,
                        }, 
                        type: controlActionTypes.OPEN_ESTATE_MANAGER
                    }
                ],
                tooltip: 'Accept'
            },
            {
                type: 'button',
                label: buttonNames.auction,
                actions: [
                    {
                        type: controlActionTypes.SHUT_FIELD_WINDOW
                    },
                    {
                        type: controlActionTypes.OPEN_AUCTION_WINDOW,
                        payload: {
                            seller: owner,
                            estate: id,
                            price: price,                            
                        }
                    }
                ]
            }
        ]
    }
    if (ownerName !== 'bank' && owner != color && cash < feeToPay && (nrOfEstatesPlayerHas > 0 || hasCurrentPlayerExtraCards > 0)) {
        return [
            {
                type: 'button',
                label: buttonNames.propertiesManager,
                function: undefined,
                actions: [
                    {   
                        type: controlActionTypes.HIDE_FIELD_WINDOW
                    },
                    {
                        payload: {
                            player: color,
                        }, 
                        type: controlActionTypes.OPEN_ESTATE_MANAGER
                    }
                ],
                tooltip: 'Accept'
            },
        ]    
    }
    if (ownerName !== 'bank' && owner != color && cash > feeToPay){
        return [
            {
                type: 'button',
                label: buttonNames.pay,
                actions: [
                    {
                        type: playerActionTypes.PLAYER_PAYS_ANOTHER_PLAYER,
                        payload: {
                            source: color,
                            target: owner,
                            amount: feeToPay,
                        }
                    }
                ]
            }
        ]
    }
    if (ownerName !== 'bank' && owner != color && cash < feeToPay && nrOfEstatesPlayerHas === 0 && !hasCurrentPlayerExtraCards){
        return [
            {
                type: 'button',
                label: buttonNames.ok,
                actions: [
                    {
                        type: playerActionTypes.PLAYER_LOSES_THE_GAME,
                        payload: {
                            target: color,
                        }
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
    const hasCurrentPlayerExtraCards = hasCurrentPlayerExtraCardsFunction({playerSlice})
    const citiesOwnedByOwner = getNrOfCitiesPlayerHas(fieldsDescriptorsArray, estateData.owner, country);
    const feeToPay = await countExectVisitFeeChecker(fieldsDescriptorsArray, estateData);
    const informationText = getCityInfoText({
        id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, owner, 
        nrOfHouses, cash, fieldsDescriptorsArray, color, globalNumberOfHouses, 
        nrOfOffersToOtherPlayersWhenSellingAProperty, hasCurrentPlayerExtraCards
    })
    const buttons = getCityButtons({
        id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, owner, ownerName, owner, 
        nrOfHouses, cash, fieldsDescriptorsArray, color, globalNumberOfHouses, 
        nrOfOffersToOtherPlayersWhenSellingAProperty, hasCurrentPlayerExtraCards
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
                    label: buttonNames.ok,
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
    buttonNames,
    canPlayerDoAnythingInPropertiesManager,
    getCountries,
    getNotCountryTypes,
 }