import initialState from '../initialState.js';
import {
    descriptors,
    boardInOrder,
} from '../boardFields.js'

import transactionsReducer from '../transactionsReducer.js'    ;
    //blue red green orange

const cp = jsObject => JSON.parse(JSON.stringify(jsObject));


const getFields = () => boardInOrder.map(field => {
    const result = descriptors[field];
    result.id = field;
    return result;
});

const stateModifier = (state) => {
    state.Saloniki
}

const getInitialState = (stateModifier = state => state) => {
    const stateBase = {
        boardSlice:{
            fieldDescriptors: getFields(),
        },
        playerSlice: cp(initialState.playerSlice),
    }
    return stateModifier(stateBase);
}

const getFieldIndex = name => getInitialState().boardSlice.fieldDescriptors.findIndex(field => {return field.id === name;});

const action = (type, payload) => ({type: type, payload: payload});


describe('transactionsReducer: PURCHASE should work as expected', () => {
    const blueBoughtSalonikiModifier = (state) => {
        const salonikiIndex = getFieldIndex('Saloniki');
        const saloniki = state.boardSlice.fieldDescriptors[salonikiIndex];
        saloniki.owner = 'blue';
        state.playerSlice.blue.cash -= 120;
        return state;
    }
    it('Saloniki should be bought by blue player from the bank', () => {
        const expectedState = getInitialState(blueBoughtSalonikiModifier);
        const preState = getInitialState();
        const result = transactionsReducer(preState, action('PURCHASE', {seller: 'bank', buyer: 'blue', price: 120, estate: 'Saloniki'}));
        expect(result).toEqual(expectedState);
    })
})