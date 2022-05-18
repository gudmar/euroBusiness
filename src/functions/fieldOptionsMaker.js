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

        const getOptionsCity = (estateData, currentPlayerData) => {
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
            } = currentPlayerData;
            return [
                {
                    type: 'information',
                    title: `Stopped in ${id} in ${country}`,
                    info: `You stop in 'Ateny' city. Its onwed by bank. You don't have to pay for staying here. You may purchase this city. If You don't it will be auctioned`,
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
        const getOptionsPowerStation = (data) => {

        }
        const getOptionsWaterPlant = (data) => {

        }
        const getOptionsTax = (data) => {

        }

const fieldOptionsMaker = (fieldData, currentPlayerData) => {
    const {
        type,
        visit,
        info,
        country,
        price,
        mortage,
        housePrice,
        hotelPrice,
        owner,
        nrOfHouses,
        nrInSet,
        nrOfHousesToPUrchase,
        nrOfHousesToSell,
        boardFieldNumber,
        isPlegded,
        wait,  
    } = fieldData;
    const {
        cash,
        color,
        extraCards,
        fieldNumber,
        name,
        turnToStale
    } = currentPlayerData;

// default (at any time) options: build a house, sell a house, build a hotel, mortage estate, buy from mortage,

    switch(type) {
        case 'city': return getOptionsCity(fieldData, currentPlayerData);
        case 'start': return getOptionsStart(fieldData);
        case 'chanceBlue': return getOptionsChanceBlue;
        case 'chanceRed': return getOptionsChanceRed;
        case 'guardedPark': return getOptionsGuardedPark;
        case 'freePark': return getOptionsFreePark;
        case 'jail': return getOptionsJail
        case 'go_to_jail': return getOptionsGoToJail
        case 'railway': return getOptionsRailway;
        case 'powerStation': return getOptionsPowerStation;
        case 'waterPlant': return getOptionsWaterPlant;
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