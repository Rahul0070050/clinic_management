import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import appointmentBookingReducer from "./appointmentBookingSlice";


const rootReducer = combineReducers({
    user: userReducer,
    appointment: appointmentBookingReducer
})

export default rootReducer;