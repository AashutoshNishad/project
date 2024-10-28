import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    mode: "normal",
    modeData: {},
}


const ModeSlice = createSlice({
    name: "ModeSlector",
    initialStat: initialState,
    reducers: {
        changeMode: (state, action) => {
            state.value = action.payload;
        }
    }
})


export const modeReducer = ModeSlice.reducer

export const { changeMode } = ModeSlice.actions;