import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    userName: null,
    email: null,
    phone: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        setUser: (state,payload) => {
            state.userName = payload.payload.username;
        }
    }
})

const userReducer = userSlice.reducer


export const userSelector = (state) => state.user;

export const {setUser,startLoading} = userSlice.actions;

export default userReducer;