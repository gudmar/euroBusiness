

const defaultPlayer = (color, name) => ({
    name: name,
    color: color,
    fieldNumber: 0,
    cash: 3000,
    extraCards: [],// like a chance gets out of jail
    turnToStale: 0,
});

const defaultPlayerStateConstructor = () => {
    console.log('In defaultPlayerStateConsturtor')
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

export { defaultPlayerStateConstructor }