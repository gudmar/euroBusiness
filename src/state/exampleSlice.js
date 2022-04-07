import { createSlice } from "@reduxjs/toolkit";


const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        list: [],
    },
    reducers: {
        add: (state, action) => state.push(action.payload),
    }
})
export const { add } = exampleSlice;
// export const { exampleSlice } = exampleSlice.actions;
export default exampleSlice.reducer;