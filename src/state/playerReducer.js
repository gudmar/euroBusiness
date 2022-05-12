

const playerReducer = (state, {type, payload}) => {
    switch(payload) {
        case 'SET_DICE_RESULT': 
            const [dice1, dice2] = payload;
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            return {...state};
        case 'THROW_DICE':
            const [dice1, dice2] = payload;
            if ((dice1 === dice2) && dice1 != 0) {
                state.playerSlice['dublet'] += 1;
            }
            state.playerSlice['diceResult'] = (dice1 + dice2);
            state.playerSlice['diceThrown'] = true;
            return {...state};
        case 'DISACTIVATE_DICE': 
            state.playerSlice.diceThrown = false;
            return {...state}
        case 'MOVE':
            const {player, nrOfFields} = payload;
            state.playerSlice[player].fieldNumber = nrOfFields;
            return {...state};
        case 'MOVE_ONE_FIELD':
            const player = action.payload;
            const diceResult = state.playerSlice.diceResult;
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
}