
const boardReducer = (state, {type, payload}) => {
    switch(type) {
        case 'ADD_FIELD': 
            state.fieldDescriptors[payload.index] = payload
            return {...state}
        case 'PRINT':
            console.log(state);
            return state;
        case 'UPDATE_POSITION':
            const id = action.payload.index;
            state.fieldDescriptors[id].left = payload.left;
            state.fieldDescriptors[id].right = payload.right;
            state.fieldDescriptors[id].top = payload.top;
            state.fieldDescriptors[id].bottom = payload.bottom;
            return {...state}
    }
}

export default boardReducer;