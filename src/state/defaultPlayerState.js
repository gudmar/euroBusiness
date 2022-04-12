

const defaultPlayerStateConstructor = (color) => {
    return {
        name: color,
        color: color,
        cash: 3000,
        currentField: 0,
        chances: [], // like a chance gets out of jail
        player: 'human', // human, cpuStrat1, cpuStrat2, cpuStrat3
    }
}