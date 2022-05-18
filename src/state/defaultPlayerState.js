

const defaultPlayer = (color, name) => ({
    name: name,
    color: color,
    fieldNumber: 0,
    cash: 3000,
    extraCards: [],// like a chance gets out of jail
    turnToStale: 0,
});

const defaultPlayerStateConstructor = () => {
    return {
        player: 'human', // human, cpuStrat1, cpuStrat2, cpuStrat3
        currentPlayer: 'blue',
        diceResult: 0,
        diceThrown: false,
        dublet: 0,
        blue: defaultPlayer('blue', 'Player_1'),
        red: defaultPlayer('red','Player_2'),
        green: defaultPlayer('green', 'Player_3'),
        orange: defaultPlayer('orange', 'Player_4')
    }
}

const getPlayerNameByColor = (state, color) => {
    if (color === 'bank') return 'bank'
    const name = [];
    name.push(state?.[color]?.['name']);
    name.push(state.playerSlice?.[color]?.['name'])
    const nameValue = name.find(item => item !== undefined);
    return nameValue;
}


export { defaultPlayerStateConstructor, getPlayerNameByColor }