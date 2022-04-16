
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
            state.fieldDescriptors[action.payload.index] = action.payload;
        },
        print(state){console.dir(state)},
        updatePosition(state, action){
            const id = action.payload.index;
            state.fieldDescriptors[id].left = action.payload.left;
            state.fieldDescriptors[id].right = action.payload.right;
            state.fieldDescriptors[id].top = action.payload.top;
            state.fieldDescriptors[id].bottom = action.payload.bottom;
        }
    }
})
const { actions, reducer } = boardSlice;
export const { addField, print, updatePosition } = actions;
// export const { exampleSlice } = exampleSlice.actions;
export default boardSlice.reducer;