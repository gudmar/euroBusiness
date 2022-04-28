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
};

// player will be referenced internally everywhere by color. 
// name will be displayed only in the view.

const initialState = {
    playerSlice: {
        blue: defaultPlayer('Player_1', 'blue'),
        red: defaultPlayer('Player_2', 'red'),
        // green: defaultPlayer('Player_1', 'green', 'human', true),
        // orange: defaultPlayer('Player_1', 'orange', 'human', true),
        green: defaultPlayer('Player_3', 'green'),
        orange: defaultPlayer('Player_4', 'orange'),

        dublet: 0,
        diceResult: 0,
        diceThrown: false,
        currentPlayer: 'blue',
    },
    boardSlice: [],
}

export default initialState;