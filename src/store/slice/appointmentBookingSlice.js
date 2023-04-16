import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    appointmentDate: "",
    appointmentTime: "",
    department: "",
    age: "",
}

const appointmentBookingSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setData: (state, payload) => {
            state.firstName = payload.firstName
            state.lastName = payload.lastName
            state.email = payload.email
            state.mobile = payload.mobile
            state.dob = payload.dob
            state.gender = payload.gender
            state.address = payload.address
            state.appointmentDate = payload.appointmentDate
            state.appointmentTime = payload.appointmentTime
            state.department = payload.department
            state.age = payload.age
        }
    }
})

export const { setData } = appointmentBookingSlice.actions;

export default appointmentBookingSlice.reducer;