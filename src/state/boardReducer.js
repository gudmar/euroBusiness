const boardActionTypes = {
    ADD_FIELD: 'ADD_FIELD',
    PRINT: 'PRINT',
    UPDATE_POSITION: 'UPDATE_POSITION',
}
const boardReducer = (state, {type, payload}) => {
    const id = payload.index;
    switch(type) {
        case boardActionTypes.ADD_FIELD: 
            state.fieldDescriptors[payload.index] = payload
            return {...state}
        case boardActionTypes.PRINT:
            console.log(state);
            return state;
        case boardActionTypes.UPDATE_POSITION:
            state.fieldDescriptors[id].left = payload.left;
            state.fieldDescriptors[id].right = payload.right;
            state.fieldDescriptors[id].top = payload.top;
            state.fieldDescriptors[id].bottom = payload.bottom;
            return {...state}
        default: return state;
    }
}

export { boardReducer, boardActionTypes };