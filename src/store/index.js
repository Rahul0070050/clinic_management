import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import rootReducer from "./slice";

const store = configureStore({reducer:rootReducer});

export default store;