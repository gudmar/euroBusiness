import initialState from './initialState.js'
import { areAllEstatesSamePlayer, getSameSetEstates, doAllBelongToSamePleyer } from '../functions/sameSortGetter.js'

const transactionsReducer = (state, {type, payload}) => {
    if (state === undefined || state === null) return initialState;
    const cpState = state => JSON.parse(JSON.stringify(state));
    const sellHouse = payload => {
        const estate = payload.estate;
        const howMany = payload.howMany === undefined ? 1 : payload.howMany;
        const {owner, housePrice, hotelPrice, nrOfHouses};
        if (nrOfHouses < howMany) return state;
        const newState = cpState(state);
        const toPay = nrOfHouses === 5 ? 
            2 * housePrice + 0.5  * hotelPrice :
            0.5 * housePrice * howMany;
        newState.boardSlice[estate].nrOfHouses = nrOfHouses === 5?
            0 : nrOfHouses - howMany;
        newState.playerSlice[owner].cash += toPay;
        return newState;
    }
    switch(type) {
        case 'PURCHASE':
            const {seller, buyer, price, estate} = payload;
            if (state.playerSlice[buyer].cash < price) return state;
            const newState = cpState(state);
            newState.playerSlice[seller].cash += price;
            newState.playerSlice[buyer].cash -= price;
            newState.boardSlice[estate].owner = buyer;
            return newState;
        case 'MORTAGE':
            const estate = payload;
            const {owner, mortage, isPlegded, nrOfHouses} = state.boardSlice[estate];
            if (nrOfHouses > 0) return state;
            const newState = cpState(state);
            newState.boardSlice[estate].isPlegded = true;
            newState.playerSlice[estate].cash += mortage;
            return newState;
        case 'PAY_MORTAGE':
            const estate = payload;
            const {owner, mortage, isPlegded, nrOfHouses} = state.boardSlice[estate];
            if (!isPlegded) return state;
            const newState = cpState(state);
            newState.boardSlice[estate].isPlegded = false;
            newState.playerSlice[estate].cash += Math.floor(mortage * 1.1);
            return newState;
        case 'SELL_ONE_HOUSE':
            return sellHouse(payload)
        case 'SELL_ALL_HOUSES':
            return sellHouse(payload);
        case 'PURCHASE_HOUSE':
            const estate = payload;
            const country = state.boardSlice[estate].country;
            const sameSortDescriptors = getSameSetEstates(state.boardSlice, country);
            const doBelongToPlayer = doAllBelongToSamePleyer(state.boardSlice, estate);
            if (!doBelongToPlayer) return state;
            //Check if other fields have more or same number of houses,
            // if so then first set houses on them
            return state;
        case 'PURCHASE_HOTEL':
            return state;
        default: return state;
    }
}