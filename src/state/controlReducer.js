const controlActionTypes = {
    SHUT_FIELD_WINDOW: 'SHUT_FIELD_WINDOW',
    OPEN_FIELD_WINDOW: 'OPEN_FIELD_WINDOW',
}

const controlReducer = (state, {payload, type}) => {
    switch(type) {
        case controlActionTypes.SHUT_FIELD_WINDOW: 
            state.control.openFieldWindow = false;
            return {...state}
        case controlActionTypes.OPEN_FIELD_WINDOW: 
            state.control.openFieldWindow = true;
            return {...state}
        default : 
            return state;
    }
}

export { controlActionTypes, controlReducer }