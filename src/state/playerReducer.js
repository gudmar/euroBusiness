
const playerActionTypes = {
    SET_DICE_RESULT: 'SET_DICE_RESULT',
    THROW_DICE: 'THROW_DICE',
    DISACTIVATE_DICE: 'DISACTIVATE_DICE',
    MOVE: 'MOVE',
    MOVE_ONE_FIELD: 'MOVE_ONE_FIELD',
    NEXT_PLAYER: 'NEXT_PLAYER',
    PAY_CURRENT_PLAYER: 'PAY_CURRENT_PLAYER',
    PAY_PLAYER: 'PAY_PLAYER',
    PLAYER_PAYS_ANOTHER_PLAYER: 'PLAYER_PAYS_ANOTHER_PLAYER'
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
        case playerActionTypes.PAY_CURRENT_PLAYER:
            state.playerSlice[state.playerSlice.currentPlayer].cash += payload;
            return {...state}

        case playerActionTypes.PAY_PLAYER:
            state.playerSlice[state.playerSlice[payload.targetPlayerColor]].cash += payload.ammount;
            return {...state}
        case playerActionTypes.PLAYER_PAYS_ANOTHER_PLAYER:
            const {amount, sourcePlayer, targetPlayer} = payload;
            if (!amount || !sourcePlayer || !targetPlayer) {
                throw new Error (`playerReducer: ${playerActionTypes.PLAYER_PAYS_ANOTHER_PLAYER}: sourcePlayer is ${sourcePlayer}, targetPlayer is ${targetPlayer} and amount is ${amount}. All those variables should be defined.`)
            }
            state.playerSlice[sourcePlayer].cash -= amount;
            state.playerSlice[targetPlayer].cash += amount;
            return [...state];


        default: {
            console.error(`Player reducer: no action matched (to match: ${type}`)
            return state
        };
    }
}

export { playerActionTypes, playerReducer }