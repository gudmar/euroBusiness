
const playerActionTypes = {
    SET_DICE_RESULT: 'SET_DICE_RESULT',
    THROW_DICE: 'THROW_DICE',
    DISACTIVATE_DICE: 'DISACTIVATE_DICE',
    MOVE: 'MOVE',
    MOVE_ONE_FIELD: 'MOVE_ONE_FIELD',
    NEXT_PLAYER: 'NEXT_PLAYER',
}

const playerReducer = (state, {type, payload}) => {

    const diceResult = state.playerSlice.diceResult;
    switch(type) {
        case playerActionTypes.SET_DICE_RESULT: {
            const [dice1, dice2] = payload;
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            return {...state};
        }
        case playerActionTypes.THROW_DICE: {
            const [dice1, dice2] = payload;
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            state.playerSlice['diceThrown'] = true;
            return {...state};
        }
        case playerActionTypes.DISACTIVATE_DICE:
            state.playerSlice.diceThrown = false;
            return {...state}
        case playerActionTypes.MOVE:
            const {player, nrOfFields} = payload;
            state.playerSlice[player].fieldNumber = nrOfFields;
            return {...state};
        case playerActionTypes.MOVE_ONE_FIELD: {
            const player = payload;
            if (diceResult > 0){
                if (state.playerSlice[player].fieldNumber > 38) {
                    state.playerSlice[player].fieldNumber = 0;
                } else {
                    state.playerSlice[player].fieldNumber += 1;
                }
                state.playerSlice.diceResult -= 1;
            }
            return {...state}
        }
        case playerActionTypes.NEXT_PLAYER:
            const players = ['blue', 'red', 'orange', 'green'];
            const currentIndex = players.findIndex(item => item === state.playerSlice.currentPlayer);
            const nextIndex = (currentIndex + 1) % players.length;
            state.playerSlice['currentPlayer'] = players[nextIndex];
            return {...state}

        default: {
            console.error(`Player reducer: no action matched (to match: ${type}`)
            return state
        };
    }
}

export { playerActionTypes, playerReducer }