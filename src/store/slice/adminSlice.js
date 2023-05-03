import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    login: localStorage.getItem('admin-token')

}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        }
    }
})

const adminReducer = adminSlice.reducer

export const { startLoading } = adminSlice.actions;

export default adminReducer;