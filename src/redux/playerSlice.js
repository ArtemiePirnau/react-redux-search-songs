import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    artists: [],
    token: ""
}

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSongs: (state, action) => {
            state.artists = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearSongs: (state) => {
            state.artists = []
        }
    }
})

export const { setSongs, setToken, clearSongs } = playerSlice.actions;
export default playerSlice.reducer;