import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import appointmentBookingReducer from "./appointmentBookingSlice";
import doctorReducer from "./doctorsSlice";
import adminReducer from "./adminSlice";


const rootReducer = combineReducers({
    user: userReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    appointment: appointmentBookingReducer,
})

export default rootReducer;