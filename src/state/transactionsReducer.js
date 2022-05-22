import initialState from './initialState.js'
import { 
    areAllEstatesSamePlayer, 
    getSameSetEstates, 
    doAllBelongToSamePlayer
} from '../functions/sameSortGetter.js'

console.error('Add removing houses from globalNumberOfHouses state here.')

const getFieldIndex = (state, estateName) => state.boardSlice.findIndex(field => {return field.id === estateName;});

const transactionActionTypes = {
    PURCHASE: 'PURCHASE',
    MORTAGE: 'MORTAGE',
    PAY_MORTAGE:'PAY_MORTAGE',
    SELL_ONE_HOUSE: 'SELL_ONE_HOUSE',
    PURCHASE_HOUSE: 'PURCHASE_HOUSE',
    PURCHASE_HOTEL: 'PURCHASE_HOTEL',
}

const transactionsReducer = (state, {type, payload}) => {
    const cpState = state => JSON.parse(JSON.stringify(state));
    const sellHouse = payload => {
        const estate = payload.estate;
        const howMany = payload.howMany === undefined ? 1 : payload.howMany;
        const estateIndex = getFieldIndex(state, estate);
        const {owner, housePrice, hotelPrice, nrOfHouses} = state.boardSlice[estateIndex];
        if (nrOfHouses < howMany) return state;
        const newState = cpState(state);
        const toPay = nrOfHouses === 5 ? 
            2 * housePrice + 0.5  * hotelPrice :
            0.5 * housePrice * howMany;
        newState.boardSlice[estateIndex].nrOfHouses = nrOfHouses === 5?
            0 : nrOfHouses - howMany;
        newState.playerSlice[owner].cash += toPay;
        return newState;
    }
    const getPayload = () => payload === undefined ? {} : payload;
    const {seller} = getPayload();
    const {buyer} = getPayload();
    const {price} = getPayload();
    const {estate} = getPayload();
    const estateIndex = getFieldIndex(state, estate);
    const {owner, mortage, isPlegded, nrOfHouses} = state.boardSlice[estateIndex];
    const newState = cpState(state);

    switch(type) {
        case transactionActionTypes.PURCHASE:
            if (state.playerSlice[buyer].cash < price) return state;
            if (seller != 'bank') newState.playerSlice[seller].cash += price;
            if (buyer != 'bank') newState.playerSlice[buyer].cash -= price;
            newState.boardSlice[estateIndex].owner = buyer;
            return newState;
        case transactionActionTypes.MORTAGE:
            if (nrOfHouses > 0) return state;
            newState.boardSlice[estateIndex].isPlegded = true;
            newState.playerSlice[owner].cash += mortage;
            return newState;
        case transactionActionTypes.PAY_MORTAGE:
            if (!isPlegded) return state;
            if (newState.playerSlice[owner].cash < Math.floor(mortage * 1.1)) return state;
            newState.boardSlice[estateIndex].isPlegded = false;
            newState.playerSlice[owner].cash -= Math.floor(mortage * 1.1);
            return newState;
        case transactionActionTypes.SELL_ONE_HOUSE:
            return sellHouse(payload)
        case transactionActionTypes.PURCHASE_HOUSE:
            // const estate = payload;
            const country = state.boardSlice[estate].country;
            const sameSortDescriptors = getSameSetEstates(state.boardSlice, country);
            const doBelongToPlayer = doAllBelongToSamePlayer(state.boardSlice, estate);
            if (!doBelongToPlayer) return state;
            //Check if other fields have more or same number of houses,
            // if so then first set houses on them
            return state;
        case transactionActionTypes.PURCHASE_HOTEL:
            return state;
    }
    return state;
}

export  {transactionsReducer, transactionActionTypes};