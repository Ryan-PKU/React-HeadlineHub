import { configureStore } from "@reduxjs/toolkit";
import useReducer from './modules/user'

const store = configureStore({
    reducer: {
        user: useReducer
    }
})

export default store