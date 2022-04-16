
import { createSlice } from "@reduxjs/toolkit";

const defaultPlayer = (name, color, controller = 'human', hidden = false) => {
    return {
        name: name,
        color: color,
        fieldNumber: 0,
        cash: 3000,
        extraCards: [],
        turnsToStale: 0, // jail etc,
        controledBy: controller,
        hidden: hidden,
    }
}

const playerSlice = createSlice({
    name: 'playerSlice',
    initialState: {
        blue: defaultPlayer('Player_1', 'blue'),
        red: defaultPlayer('Player_1', 'blue'),
        green: defaultPlayer('Player_1', 'green', 'human', true),
        orange: defaultPlayer('Player_1', 'orange', 'human', true),
        dublet: 0,
        diceResult: 0,
    },
    reducers: {
        setDiceResult(state, action) {
            const [outcome1, outcome2] = action.payload;
            if (outcome1 === outcome2) {
                state['dublet'] += 1;
            }
            state['diceResult'] += (outcome1 + outcome2);
        },
        move(state, action) {
            const { player, nrOfFields } = action.payload;

            state[player].fieldNumber = nrOfFields;
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
        }
    }
})
const { actions, reducer } = playerSlice;
export const { 
    addField, 
    print, 
    updatePosition,
    setDiceResult,
} = actions;
// export const { exampleSlice } = exampleSlice.actions;
export default playerSlice.reducer;