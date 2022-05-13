const action = (type, payload) => {
    return {type:type, payload:payload}
}

const addField = payload => action('ADD_FIELD', payload);
const print = () => action('PRINT');
const updatePosition = (payload) => action('UPDATE_POSITION', payload);

export {
    addField, print, updatePosition
}