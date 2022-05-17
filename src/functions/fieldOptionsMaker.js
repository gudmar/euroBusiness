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

        const getOptionsCity = (data) => {
            const {
                country,
                visit,
                info,
                price,
                mortge,
                housePrice,
                hotelPrice,
                owner,
                isPlegded,
            } = data
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

const fieldOptionsMaker = (data) => {
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
    } = data;

    // default (at any time) options: build a house, sell a house, build a hotel, mortage estate, buy from mortage,
    console.log('data', data)

    switch(type) {
        case 'city': return getOptionsCity;
        case 'start': return getOptionsStart(data);
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