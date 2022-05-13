const playerActionTypes = {
    SET_DICE_RESULT: 'SET_DICE_RESULT',
    THROW_DICE: 'THROW_DICE',
    DISACTIVATE_DICE: 'DISACTIVATE_DICE',
    MOVE: 'MOVE',
    MOVE_ONE_FIELD: 'MOVE_ONE_FIELD',
}

const playerReducer = (state, {type, payload}) => {
    const [dice1, dice2] = payload;
    const {player, nrOfFields} = payload;
    const diceResult = state.playerSlice.diceResult;
    switch(payload) {
        case playerActionTypes.SET_DICE_RESULT: 
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            return {...state};
        case playerActionTypes.THROW_DICE:
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            state.playerSlice['diceThrown'] = true;
            return {...state};
        case playerActionTypes.DISACTIVATE_DICE:
            state.playerSlice.diceThrown = false;
            return {...state}
        case playerActionTypes.MOVE:
            state.playerSlice[player].fieldNumber = nrOfFields;
            return {...state};
        case playerActionTypes.MOVE_ONE_FIELD:
            if (diceResult > 0){
                if (state.playerSlice[player].fieldNumber > 38) {
                    state.playerSlice[player].fieldNumber = 0;
                } else {
                    state.playerSlice[player].fieldNumber += 1;
                }
                state.playerSlice.diceResult -= 1;
            }
            return {...state}
        default: return state;
    }
}

export { playerActionTypes, playerReducer }