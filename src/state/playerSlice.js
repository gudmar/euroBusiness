
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState.js"

const playerSlice = createSlice({
    name: 'playerSlice',
    initialState: initialState.playerSlice,
    reducers: {
        setDiceResult(state, action) {
            const [outcome1, outcome2] = action.payload;
            if ((outcome1 === outcome2) && outcome1 != 0) {
                state['dublet'] += 1;
            }
            state['diceResult'] = (outcome1 + outcome2);
        },
        throwDice(state, action){
            const [outcome1, outcome2] = action.payload;
            if ((outcome1 === outcome2) && outcome1 != 0) {
                state['dublet'] += 1;
            }
            state['diceResult'] = (outcome1 + outcome2);
            state['diceThrown'] = true;
        },
        disactivateDice(state){
            state.diceThrown = false;
        },
        move(state, action) {
            const { player, nrOfFields } = action.payload;

            state[player].fieldNumber = nrOfFields;
        },
        moveOneField(state, action) {
            const player = action.payload;
            const diceResult = state.diceResult;
            if (diceResult > 0){
                console.log(state[player].fieldNumber)
                if (state[player].fieldNumber > 38) {
                    state[player].fieldNumber = 0;
                } else {
                    state[player].fieldNumber += 1;
                }
                state.diceResult -= 1;
            }
        },
        pay(state, action) {
            const { player, ammount } = action.payload;
            state[player].cash =+ ammount;
        },
        sleep(state, action) {
            const player = action.payload;
            if (state[player].stale > 0) state[player].stale =- 1;
        }, //turn passes;
        addExtraCard(state, action) {
            const { newCard, player } = action.payload;
            state[player].extraCards.push(newCard);
        },
        useExtraCard(state, action) {
            const { cardId, player } = action.payload;
            state[player].extraCards.splice(cardId, 1);
        },
        nextPlayer(state, action) {
            const players = ['blue', 'red', 'orange', 'green'];
            const currentIndex = players.findIndex(item => item === state.currentPlayer);
            const nextState = (currentIndex + 1) % players.length;
            console.log(nextState);
            state['currentPlayer'] = players[nextState];
        }
    }
})
const { actions, reducer } = playerSlice;
export const {
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
} = actions
// export const { 
//     addField, 
//     print, 
//     updatePosition,
//     setDiceResult,
//     nextPlayer,
//     move,
//     moveOneField,
//     disactivateDice,
//     throwDice,
// } = actions;
// export const { exampleSlice } = exampleSlice.actions;
export default reducer;