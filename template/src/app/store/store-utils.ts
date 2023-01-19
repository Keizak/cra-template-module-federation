import thunkMiddleware from "redux-thunk";
import {combineReducers} from "@reduxjs/toolkit";
import AppReducer from "./appSlice";

export const asyncReducerName = "LabsAndLessonsReducers"

export const getMiddleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
        .prepend(thunkMiddleware)


// ----------------------------------------------------------------
const localReducers = {
    app: AppReducer,
}

const combinedLocalReducers = combineReducers(localReducers)

// ----------------------------------------------------------------
// Отправляем на хост
export const integratedRootReducer = {
    [asyncReducerName]: combinedLocalReducers,
}

// ----------------------------------------------------------------
// Используем локально в приложении
export const RootReducer = combineReducers({
    ...localReducers,
})




