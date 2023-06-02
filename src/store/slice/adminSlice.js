import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    search: "",
    login: localStorage.getItem('admin-token')

}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        search: (state, { payload }) => {
            state.search = payload
        }
    }
})

const adminReducer = adminSlice.reducer

export const { startLoading, search } = adminSlice.actions;

export default adminReducer;