import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import rootReducer from "./slice";

const store = configureStore({
    reducer: {
        root:rootReducer
    }
});

export default store;