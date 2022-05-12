const action = (type, payload) => ({type, payload})

const addField = payload => action('ADD_FIELD', payload);
const print = () => action('PRINT');
const updatePosition = (payload) => action('UPDATE_POSITION', payload);