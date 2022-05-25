const controlActionTypes = {
    SHUT_FIELD_WINDOW: 'SHUT_FIELD_WINDOW',
    OPEN_FIELD_WINDOW: 'OPEN_FIELD_WINDOW',
    HIDE_FIELD_WINDOW: 'HIDE_FIELD_WINDOW', // When player stops on an estate that connot aford, wants to but and auctions other estate. In this case estate manager should be open, and when estate manager is closed 
    // field window should be in some way reopened with new state

    SHUT_AUCTION_WINDOW: 'SHUT_FIELD_WINDOW',
    OPEN_AUCTION_WINDOW: 'OPEN_FIELD_WINDOW',

    OPEN_ESTATE_MANAGER: 'OPEN ESTATE MANAGER',
    CLOSE_ESTATE_MANAGER: 'CLOSE ESTATE MANAGER',

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