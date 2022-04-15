
import { createSlice } from "@reduxjs/toolkit";

const getFieldDescriptor = (action) => {

}

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState: {
        fieldDescriptors: [],
    },
    reducers: {
        addField(state, action) {
            console.log(action)
            state.fieldDescriptors[action.payload.index] = action.payload;
            // return { ...state }
            // return state.fieldDescriptors
        },
        print(state){console.dir(state)},
        updatePosition(state, action){
            const id = action.payload.index;
            console.log(action.payload, state.fieldDescriptors)
            state.fieldDescriptors[id].left = action.payload.left;
            state.fieldDescriptors[id].right = action.payload.right;
            state.fieldDescriptors[id].top = action.payload.top;
            state.fieldDescriptors[id].bottom = action.payload.bottom;
            console.log(state.fieldDescriptors[id])
            // return state;
        }
    }
})
const { actions, reducer } = boardSlice;
export const { addField, print, updatePosition } = actions;
// export const { exampleSlice } = exampleSlice.actions;
export default boardSlice.reducer;