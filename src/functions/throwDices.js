const getRandomInteger = (min, max) => {
    min = Math.ceil(min); max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}


const throwDices = async () => {
    return new Promise((resolve) => { // Promise in case animation for throwing is made
        resolve(getRandomInteger(2, 12))
    })
}
export { throwDices };
export default throwDices;
