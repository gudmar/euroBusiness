const action = (type, payload) => ({type:type, payload:payload})

const setDiceResult = payload => action('SET_DICE_RESULT', payload);
const throwDice = payload => action('THROW_DICE', payload);
const disactivateDice = () => action('DISACTIVATE_DICE');
const move = payload => action('MOVE', payload);
const moveOneField = payload => action('MOVE_ONE_FIELD');

export {setDiceResult, throwDice, disactivateDice, move, moveOneField}