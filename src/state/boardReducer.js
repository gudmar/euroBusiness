const boardActionTypes = {
    ADD_FIELD: 'ADD_FIELD',
    PRINT: 'PRINT',
    UPDATE_POSITION: 'UPDATE_POSITION',
}
const boardReducer = (state, {type, payload}) => {
    const id = payload.index;
    switch(type) {
        case boardActionTypes.ADD_FIELD: 
            state.boardSlice[payload.index] = payload
            return {...state}
        case boardActionTypes.PRINT:
            console.log(state);
            return state;
        case boardActionTypes.UPDATE_POSITION:
            state.boardSlice[id].left = payload.left;
            state.boardSlice[id].right = payload.right;
            state.boardSlice[id].top = payload.top;
            state.boardSlice[id].bottom = payload.bottom;
            return {...state}
        default: return state;
    }
}

export { boardReducer, boardActionTypes };