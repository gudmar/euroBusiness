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
import { boardActionTypes } from '../state/boardReducer.js';
import { playerActionTypes } from '../state/playerReducer.js';
import { controlActionTypes } from '../state/controlReducer.js';
import { getPlayerNameByColor } from '../state/defaultPlayerState.js'
import {
    getNrOfCitiesPlayerHas, // { owns, outOf }
    countExectVisitFeeChecker,
} from '../state/boardFields.js'


const getCityInfoText = ({
    id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, name,
}) => {
    const ownerNameWithThe = ownerName === 'bank' ? 'the bank' : ownerName;
    let output = [];
    output.push(`You stop in ${id} city. Its owned by ${ownerNameWithThe}. `);
    if (ownerName === 'bank') {
        output.push(`You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned`)
    } else {
        output.push(`${ownerNameWithThe} owns ${citiesOwnedByOwner.owns} out of ${citiesOwnedByOwner.outOf} estates in ${country}, `)
    }
    if (ownerName !== 'bank') output.push(`so you have to pay $${feeToPay}.`);
    return output.join('');
}



const getOptionsCity = async (fieldsDescriptorsArray, estateData, playerSlice) => {
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
    } = estateData;
    const {
        cash,
        color,
        extraCards,
        fieldNumber,
        name,
        turnToStale
    } = playerSlice?.[playerSlice?.['currentPlayer']];
    const ownerName = getPlayerNameByColor(playerSlice, owner);
    const citiesOwnedByOwner = getNrOfCitiesPlayerHas(fieldsDescriptorsArray, estateData.owner, country);
    const feeToPay = await countExectVisitFeeChecker(fieldsDescriptorsArray, estateData);
    const informationText = getCityInfoText({
        id, country, citiesOwnedByOwner, feeToPay, price, isPlegded, ownerName, name,
    })
    return [
        {
            type: 'information',
            title: `Stopped in ${id} in ${country}`,
            info: informationText,
            options: [

            ]
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
                        {payload: 400, type: playerActionTypes.PAY_PLAYER},
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

const fieldOptionsMaker = async (fieldsDescriptorsArray, fieldData, playerStateSlice) => {
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
        case 'city': return await getOptionsCity(fieldsDescriptorsArray, fieldData, playerStateSlice);
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