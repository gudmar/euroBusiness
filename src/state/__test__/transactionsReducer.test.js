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
    const blueBoughtAtenyModifier = state => {
        const atenyIndex = getFieldIndex('Ateny');
        const ateny = state.boardSlice.fieldDescriptors[atenyIndex];
        ateny.owner = 'blue';
        state.playerSlice.blue.cash -= 60;
        state.playerSlice.red.cash += 60;
        return state;
    }
    it('Saloniki should be bought by blue player from the bank', () => {
        const expectedState = getInitialState(blueBoughtSalonikiModifier);
        const preState = getInitialState();
        const result = transactionsReducer(preState, action('PURCHASE', {seller: 'bank', buyer: 'blue', price: 120, estate: 'Saloniki'}));
        expect(result).toEqual(expectedState);
    });
    it('Ateny should be bought by blue player from red player', () => {
        const expectedState = getInitialState(blueBoughtAtenyModifier);
        const preState = getInitialState();
        const result = transactionsReducer(preState, action('PURCHASE', {seller: 'red', buyer: 'blue', price: 60, estate: 'Ateny'}));
        expect(result).toEqual(expectedState);
    })
});
describe('transactionsReducer: MORTAGE should work as expected', () => {
    const neapolIndex = getFieldIndex('Neapol');
    const giveNeapolToGreenModifier = (state) => {
        const neapol = state.boardSlice.fieldDescriptors[neapolIndex];
        neapol.owner = 'green';
        return state;
    }
    const giveNeapolToGreenAndBuidAHouseModifier = (state) => {
        const neapol = state.boardSlice.fieldDescriptors[neapolIndex];
        neapol.owner = 'green';
        neapol.nrOfHouses = 1;
        return state;
    }
    const mortageNeapolModifier = state => {
        const neapol = state.boardSlice.fieldDescriptors[neapolIndex];
        neapol.isPlegded = true;
        state.playerSlice.green.cash += 100;
        return state;
    }
    it('Neapol should be mortaged succesfully from the green player', () => {
        const startState = getInitialState(giveNeapolToGreenModifier);
        const expectedState = getInitialState(mortageNeapolModifier);
        const result = transactionsReducer(startState, action('MORTAGE', {estate: 'Neapol'}));
        expect(result).toEqual(expectedState);
    })
    it('Should return initial state if nr of houses > 0 ', () => {
        const startState = getInitialState(giveNeapolToGreenAndBuidAHouseModifier);
        const expectedState = getInitialState(giveNeapolToGreenAndBuidAHouseModifier);
        const result = transactionsReducer(startState, action('MORTAGE', {estate: 'Neapol'}));
        expect(result).toEqual(expectedState);
    })
})
describe('transactionsReducer: PAY_MORTAGE tests', () => {
    const sewillaIndex = getFieldIndex('Sewilla');
    const setSewillaToPlagdedModifier = (state) => {
        state = cp(state);
        const sewilla = state.boardSlice.fieldDescriptors[sewillaIndex];
        sewilla.owner = 'blue';
        sewilla.isPlegded = true;
        return state;
    }
    const setSewillasUnplagdedModifier = state => {
        const sewilla = state.boardSlice.fieldDescriptors[sewillaIndex];
        sewilla.owner = 'blue';
        sewilla.isPlegded = false;
        state.playerSlice.blue.cash -= Math.floor(140 * 1.1);
        return state;
    }
    it('Should set plagded of Sewilla to false and get money from blue user account if user has enough money', ()=>{
        const startState = getInitialState(setSewillaToPlagdedModifier);
        const expectedState = getInitialState(setSewillasUnplagdedModifier)
        const result = transactionsReducer(startState, action('PAY_MORTAGE', {estate: 'Sewilla'}));
        expect(result).toEqual(expectedState);
    })
    it('Should return not changed state if user has not enough dough', () => {

    })
})