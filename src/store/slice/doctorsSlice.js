import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    login: localStorage.getItem('doctor-token'),
    info: null

}

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        setInfo: (state, { payload }) => {
            console.log(payload);
            state.info = payload
        }
    }
})

const doctorReducer = doctorSlice.reducer

export const { startLoading,setInfo } = doctorSlice.actions;

export default doctorReducer;